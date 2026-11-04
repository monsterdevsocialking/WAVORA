import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type DragEvent,
  type JSX,
} from "react";

import { version as coreVersion } from "@cymatic/core";
import { allPresets } from "@cymatic/presets";
import { Visualizer, type VisualizerRef } from "@cymatic/react";
import type { DirectorState, ParamSet, Preset, PresetDefinition } from "@cymatic/core";

import { ControlPanel } from "./ControlPanel.js";

const DOCS_URL = "https://github.com/monsterdevsocialking/WAVORA#readme";
const GITHUB_URL = "https://github.com/monsterdevsocialking/WAVORA";

/** The current audio input the gallery is feeding the visualizer. */
type InputMode =
  | { kind: "none" }
  | { kind: "mic" }
  | { kind: "file"; name: string; buffer: AudioBuffer };

/** Decode a dropped/picked file into an AudioBuffer using the Web Audio API. */
async function decodeFile(file: File): Promise<AudioBuffer> {
  const arrayBuffer = await file.arrayBuffer();
  const AudioCtx =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioCtx) {
    throw new Error("A Web Audio API não está disponível neste navegador.");
  }
  const ctx = new AudioCtx();
  try {
    return await ctx.decodeAudioData(arrayBuffer);
  } finally {
    void ctx.close();
  }
}

/** Build a lightweight peak waveform from the decoded audio without copying the track. */
function buildWaveform(buffer: AudioBuffer, bars = 88): number[] {
  const channel = buffer.getChannelData(0);
  const samplesPerBar = Math.max(1, Math.floor(channel.length / bars));
  return Array.from({ length: bars }, (_, index) => {
    const start = index * samplesPerBar;
    const end = Math.min(channel.length, start + samplesPerBar);
    let peak = 0;
    for (let sample = start; sample < end; sample++) {
      peak = Math.max(peak, Math.abs(channel[sample] ?? 0));
    }
    return Math.max(0.06, peak);
  });
}

function formatTime(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, "0")}`;
}

/** Detect whether any GPU canvas backend is plausibly available. */
function hasRenderBackend(): boolean {
  if (typeof document === "undefined") return false;
  try {
    if ("gpu" in navigator) return true;
    const probe = document.createElement("canvas");
    const gl =
      probe.getContext("webgl2") ?? probe.getContext("webgl");
    return gl != null;
  } catch {
    return false;
  }
}

export function App(): JSX.Element {
  const presets = useMemo<readonly PresetDefinition[]>(() => allPresets, []);
  const [selectedId, setSelectedId] = useState<string>(
    () => presets[0]?.id ?? "",
  );
  const selectedDef = useMemo<PresetDefinition | undefined>(
    () => presets.find((p) => p.id === selectedId),
    [presets, selectedId],
  );

  // Build a fresh preset instance whenever the selection changes so switching
  // is live and stateful per preset (no reload).
  const preset = useMemo<Preset | null>(
    () => (selectedDef ? selectedDef.create() : null),
    [selectedDef],
  );

  const [input, setInput] = useState<InputMode>({ kind: "none" });
  const [inputError, setInputError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  // Director controls + HUD state (V2-14). The live DirectorState is fed back
  // from the engine via onDirectorState (throttled below); the toggle + seed are
  // forwarded to <Visualizer/> which drives the core Director without a teardown.
  const [directorEnabled, setDirectorEnabled] = useState(true);
  const [seed, setSeed] = useState(0x1a2b3c4d);
  const [director, setDirector] = useState<DirectorState | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const vizRef = useRef<VisualizerRef>(null);

  // The engine emits a DirectorState every frame; throttle HUD updates to a few
  // per second so we don't re-render the whole panel at 60fps. The latest state
  // is parked in a ref and flushed on an interval.
  const directorLatest = useRef<DirectorState | null>(null);
  const onDirectorState = useCallback((s: DirectorState) => {
    directorLatest.current = s;
  }, []);
  useEffect(() => {
    const id = window.setInterval(() => {
      if (directorLatest.current) setDirector(directorLatest.current);
    }, 150);
    return () => window.clearInterval(id);
  }, []);

  // The active preset's ParamSet is surfaced through the imperative ref (which
  // does not re-render), so the panel reads it through this stable getter.
  const getParamSet = useCallback((): ParamSet | null => {
    return vizRef.current?.paramSet ?? null;
  }, []);

  const backendAvailable = useMemo(hasRenderBackend, []);

  const waveform = useMemo(
    () => (input.kind === "file" ? buildWaveform(input.buffer) : []),
    [input],
  );

  const handleFile = useCallback(async (file: File) => {
    setInputError(null);
    try {
      const buffer = await decodeFile(file);
      setInput({ kind: "file", name: file.name, buffer });
    } catch (err) {
      setInputError(
        err instanceof Error
          ? `Não foi possível abrir "${file.name}": ${err.message}`
          : `Não foi possível abrir "${file.name}".`,
      );
    }
  }, []);

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) void handleFile(file);
    },
    [handleFile],
  );

  const useMic = useCallback(() => {
    setInputError(null);
    setInput({ kind: "mic" });
  }, []);

  // Surface a setup error from the engine without crashing. We poll the
  // imperative handle since the ref does not re-render. An engine error can come
  // from two very different places — the microphone (permission denied, no
  // device) or the renderer (WebGPU/WebGL initialization failed) — and they
  // need different messaging, so we watch for it on every input kind, not just
  // mic, and classify it below.
  const [engineError, setEngineError] = useState<Error | null>(null);
  useEffect(() => {
    setEngineError(null);
    const id = window.setInterval(() => {
      const err = vizRef.current?.error ?? null;
      if (err) setEngineError(err);
    }, 400);
    return () => window.clearInterval(id);
  }, [input]);

  // A mic failure is one of the standard getUserMedia DOMException names, or
  // only plausible when the user actually asked for the microphone. Anything
  // else surfacing from the engine is a renderer/initialization failure.
  const isMicError =
    engineError != null &&
    input.kind === "mic" &&
    (engineError.name === "NotAllowedError" ||
      engineError.name === "NotFoundError" ||
      engineError.name === "NotReadableError" ||
      engineError.name === "SecurityError" ||
      engineError.name === "OverconstrainedError" ||
      engineError.name === "AbortError" ||
      /microphone|getusermedia|permission|audio input/i.test(
        engineError.message,
      ));
  const isRendererError = engineError != null && !isMicError;

  const micActive = input.kind === "mic" && !engineError;

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <h1><span className="brand-mark">W</span> WAVORA</h1>
          <span className="tagline">Transforma música em movimento.</span>
        </div>
        <nav className="header-links">
          <a href={DOCS_URL} target="_blank" rel="noreferrer">
            Sobre
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </header>

      <aside className="sidebar">
        <section className="media-library">
          <div className="sidebar-title">Biblioteca de mídia</div>
          <button
            type="button"
            className="media-import"
            onClick={() => fileInputRef.current?.click()}
          >
            <span aria-hidden="true">＋</span> Importar áudio
          </button>
          {input.kind === "file" ? (
            <div className="media-item">
              <span className="media-item-icon" aria-hidden="true">♫</span>
              <div className="media-item-copy">
                <strong>{input.name}</strong>
                <span>{formatTime(input.buffer.duration)} · Áudio local</span>
              </div>
            </div>
          ) : (
            <p className="media-empty">Os teus ficheiros de áudio aparecem aqui.</p>
          )}
        </section>
        <div className="sidebar-title">
          Visualizadores · {presets.length}
        </div>
        <ul className="preset-list">
          {presets.map((def) => (
            <li key={def.id}>
              <button
                type="button"
                className={`preset-item${def.id === selectedId ? " active" : ""}`}
                aria-pressed={def.id === selectedId}
                onClick={() => setSelectedId(def.id)}
              >
                <span className="preset-name">{def.name}</span>
                <span className="preset-id">{def.id}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section className="stage">
        <div
          className={`canvas-wrap${dragging ? " dragging" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          {selectedDef ? (
            <div className="preset-meta">
              <h2>{selectedDef.name}</h2>
              {selectedDef.description ? <p>{selectedDef.description}</p> : null}
              {selectedDef.tags && selectedDef.tags.length > 0 ? (
                <div className="tags">
                  {selectedDef.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          {!backendAvailable ? (
            <div className="status-overlay">
              <div className="status-card error">
                <h3>Motor gráfico indisponível</h3>
                <p>
                  Este navegador não disponibiliza WebGPU nem WebGL. O preview
                  precisa de aceleração gráfica para funcionar. Ativa a aceleração
                  de hardware ou experimenta outro navegador.
                </p>
              </div>
            </div>
          ) : preset ? (
            <>
              <Visualizer
                ref={vizRef}
                key={`${selectedId}:${input.kind === "file" ? input.name : input.kind}`}
                preset={preset}
                microphone={input.kind === "mic"}
                audioBuffer={input.kind === "file" ? input.buffer : undefined}
                directorEnabled={directorEnabled}
                directorSeed={seed}
                onDirectorState={onDirectorState}
                ariaLabel={`${selectedDef?.name ?? "WAVORA"} visualizador`}
              />
              <ControlPanel
                getParamSet={getParamSet}
                director={director}
                directorEnabled={directorEnabled}
                onToggleDirector={setDirectorEnabled}
                seed={seed}
                onSeedChange={setSeed}
              />
              {isMicError ? (
                <div className="status-overlay">
                  <div className="status-card error">
                    <h3>Microfone indisponível</h3>
                    <p>
                      {engineError?.message ||
                        "O acesso ao microfone foi recusado ou não está disponível."}{" "}
                      Podes importar um ficheiro de áudio em alternativa.
                    </p>
                  </div>
                </div>
              ) : isRendererError ? (
                <div className="status-overlay">
                  <div className="status-card error">
                    <h3>Renderer indisponível</h3>
                    <p>
                      {engineError?.message ||
                        "Não foi possível iniciar o motor gráfico."}{" "}
                      The live canvas cannot render in this browser — try a
                      hardware-accelerated browser with WebGPU or WebGL enabled.
                    </p>
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <div className="status-overlay">
              <div className="status-card">
                <h3>Nenhum visualizador selecionado</h3>
                <p>Escolhe um visualizador na biblioteca para começar.</p>
              </div>
            </div>
          )}
        </div>

        <div className="controls">
          <button
            type="button"
            className={`btn${micActive ? " primary active" : " primary"}`}
            onClick={useMic}
          >
            {micActive ? "Microfone ativo" : "Ativar microfone"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            className="visually-hidden"
            aria-label="Importar ficheiro de áudio"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleFile(file);
              e.target.value = "";
            }}
          />

          <span className="input-status">
            {inputError ? (
              <>
                <span className="dot error" />
                {inputError}
              </>
            ) : engineError && input.kind === "mic" ? (
              <>
                <span className="dot error" />
                Microfone bloqueado — importa um ficheiro
              </>
            ) : input.kind === "mic" ? (
              <>
                <span className="dot live" />
                A captar áudio do microfone
              </>
            ) : input.kind === "file" ? (
              <>
                <span className="dot live" />
                A reproduzir {input.name}
              </>
            ) : (
              <>
                <span className="dot" />
                Arrasta uma música, importa um ficheiro ou ativa o microfone
              </>
            )}
          </span>
        </div>

        <section className="timeline" aria-label="Timeline de áudio">
          <div className="timeline-head">
            <div>
              <h4>Timeline</h4>
              <p>{input.kind === "file" ? input.name : input.kind === "mic" ? "Entrada de microfone em direto" : "Importa uma música para começar"}</p>
            </div>
            <span className="engine-version">Motor {coreVersion}</span>
          </div>
          <div className={`waveform${waveform.length ? " populated" : ""}`} role="img" aria-label={waveform.length ? "Forma de onda do áudio importado" : "A timeline será apresentada depois de importar áudio"}>
            {waveform.length ? waveform.map((level, index) => (
              <span key={index} style={{ height: `${Math.round(level * 100)}%` }} />
            )) : <span className="waveform-empty">A tua forma de onda aparecerá aqui</span>}
          </div>
          <div className="timeline-foot">
            <span>{input.kind === "file" ? "ÁUDIO PRINCIPAL" : input.kind === "mic" ? "MICROFONE" : "SEM FAIXA"}</span>
            <span>{input.kind === "file" ? formatTime(input.buffer.duration) : "00:00"}</span>
          </div>
        </section>
      </section>
    </div>
  );
}
