# WAVORA Studio

**Transforma música em movimento.**

WAVORA Studio is a browser-based music visualization editor built on top of the open-source [Cymatic](https://github.com/coreyepstein/cymatic) engine.

## Current implementation

- Local audio import using the browser's Web Audio API (files are decoded in the browser; no audio upload backend).
- Live microphone input, subject to browser permission and secure-context requirements.
- The upstream preset catalog, including cinematic geometry, color fields, particles, fluid and 3D point-cloud looks.
- Real-time audio analysis: FFT bands, bass/mid/treble, RMS, onsets, tempo and spectral features.
- Automatic director for section-aware intensity, movement and palette evolution.
- Per-preset parameter panel with auto/manual binding, randomization and reset.
- WebGPU renderer with WebGL fallback.
- Local waveform overview generated from the decoded audio buffer.
- Responsive dark WAVORA interface using the brand palette.

## Not yet implemented

The current editor shell is not yet a complete CapCut-style timeline editor. In particular, these capabilities remain in the roadmap:

- Transport controls and frame-accurate seeking.
- Background image/video compositing and cover-art layers.
- Text/logo overlays and multiple tracks.
- New classic spectrum, waveform and oscilloscope presets.
- Final video export with synchronized audio. The upstream export package currently encodes video frames; a tested muxing stage is still required to create a finished music video.
- Full browser end-to-end validation across GPU backends and low-memory devices.

See [GitHub Issues](https://github.com/monsterdevsocialking/WAVORA/issues) for the implementation roadmap.

## Development

Requirements:

- Node.js 20.19+ (Node.js 22 is used in CI and Vercel)
- pnpm 9.15.4

Install and run:

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm --filter @wavora/studio dev
```

Quality gates:

```bash
pnpm build
pnpm typecheck
pnpm lint
pnpm test
pnpm licenses list --recursive --json --long
```

## Architecture

This repository preserves the upstream monorepo and its package boundaries:

- `packages/core` — audio DSP, feature extraction, director, renderer and export primitives.
- `packages/react` — React lifecycle integration for the core visualizer.
- `packages/presets` — the upstream visualizer/preset catalog.
- `packages/export` — offline frame rendering and WebCodecs encoding.
- `apps/gallery` — the WAVORA Studio web application (workspace name: `@wavora/studio`).

## Licensing

The upstream MIT license and copyright notices are preserved. See [THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md) for the resolved dependency-license inventory and attribution notes.
