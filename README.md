# WAVORA Studio

**Cria vídeos musicais. Dá vida ao som.**

WAVORA Studio is a browser-based music-video creation workspace. It is being rebuilt around music-reactive visuals, editable typography, custom image/video backgrounds and downloadable video output.

## Music editor — current build

- Import local audio files supported by the browser and play/pause/seek the track.
- Five live visual styles: frequency bars, circular spectrum, waveform, particles and mirrored spectrum.
- Audio-reactive rendering using the Web Audio API analyser.
- Custom color palettes, sensitivity, bar count and glow controls.
- Import a local image or video as the visual background; adjust the background dimming.
- Add/edit the track title and artist name, show/hide text and change title size.
- Composition aspect ratios for 16:9, 9:16 and 1:1.
- Timeline overview with audio, visual and text lanes.
- Browser-side recording of the live canvas plus the audio track. The editor selects MP4 only when the browser advertises a compatible MP4 MediaRecorder codec; otherwise it exports WebM and clearly identifies the actual file format.

All imported audio and background media stay in the browser; this version does not upload media to a server.

## Export limitations (important)

The current export records the composition in real time, so export duration is approximately the length of the music and the page must remain open. MP4 availability depends on the browser's MediaRecorder/H.264 support. On browsers without it, the output is WebM. This is not yet a server-side, offline, frame-accurate export pipeline; 4K, selectable 60 FPS, multi-clip editing, transition/keyframe controls, lyrics/subtitles, and a project save/load format remain future work.

## Development

Requirements: Node.js 20.19+ and pnpm 9.15.4.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm --filter @wavora/studio dev
```

Quality gates: `pnpm build`, `pnpm typecheck`, `pnpm lint`, `pnpm test`.

## Architecture and attribution

The original Cymatic monorepo, package boundaries and MIT license remain preserved. The app reuses the upstream audio visualization concepts and workspace foundation while adding a music-focused composition interface. See [UPSTREAM-README.md](./UPSTREAM-README.md) and [THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md) for upstream and dependency attribution.
