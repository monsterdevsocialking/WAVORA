# WAVORA

**Transforma música em movimento.**

WAVORA Studio is being built on top of the open-source Cymatic audio-visual engine by Corey Epstein.

## Project status

The repository is in its foundation and integration phase. The upstream engine is being audited before product features are marked complete.

## Technical foundation

- TypeScript monorepo and pnpm workspaces
- Web Audio API analysis
- WebGPU renderer with WebGL fallback
- React integration
- Deterministic offline frame rendering
- WebCodecs video encoding when supported

## Important export limitation

The upstream export package encodes silent video frames. A separate, tested audio/container muxing stage is required to produce a final music video with synchronized audio. PNG frame sequences are the fallback when WebCodecs is unavailable.

## License and attribution

The upstream Cymatic project is distributed under the MIT License. Its original license and copyright notices must be retained in derivative distributions. See [THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md).

Upstream: https://github.com/coreyepstein/cymatic

## Development

The upstream project uses pnpm 9.15.4 and requires Node.js >=18.18. Run the full build, typecheck, lint, and test gates before treating a change as complete.

## Product identity

The Vercel project name is **WAVORA**.
