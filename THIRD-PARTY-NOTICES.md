# Third-party notices

## Upstream Cymatic

WAVORA incorporates and adapts the open-source Cymatic project:

- Project: https://github.com/coreyepstein/cymatic
- Copyright: Copyright (c) 2026 Corey Epstein
- License: MIT
- Full upstream license text: [LICENSE](./LICENSE)
- Original upstream documentation: [UPSTREAM-README.md](./UPSTREAM-README.md)

The upstream copyright and permission notice are preserved. WAVORA's modifications do not remove or replace the original notices.

## Dependency license audit

A complete resolved-workspace inventory was generated in GitHub Actions using:

```sh
pnpm licenses list --recursive --json --long
```

- Package manager: pnpm 9.15.4
- Audit commit: `a6b614045643d91d36bce7782b52c08ba43844bb`
- Total resolved package/version entries: **321**
- Scope: all workspace dependencies, including development and test tooling
- Lockfile: [pnpm-lock.yaml](./pnpm-lock.yaml)

The command reported one package with non-SPDX metadata (`spawndamnit@3.0.1`). Its package metadata points to `LICENSE`; the upstream repository's LICENSE file was inspected and is MIT. It is therefore listed under MIT below.

### License summary

| SPDX identifier | Package/version entries |
|---|---:|
| `MIT` | 269 |
| `MIT-0` | 2 |
| `Apache-2.0` | 18 |
| `Python-2.0` | 1 |
| `CC-BY-4.0` | 1 |
| `ISC` | 15 |
| `BSD-2-Clause` | 9 |
| `BSD-3-Clause` | 4 |
| `BlueOak-1.0.0` | 1 |
| `CC0-1.0` | 1 |

No GPL, AGPL, SSPL, or proprietary license identifier appeared in the resolved inventory. The identified licenses are permissive or attribution-based; this is not a substitute for retaining the respective copyright and license texts when redistributing dependency code.

### Attribution and redistribution notes

- **Apache-2.0:** retain the license, applicable copyright notices, and any required NOTICE material.
- **CC-BY-4.0:** attribution is required for the `caniuse-lite` data package.
- **BSD-2-Clause / BSD-3-Clause / ISC / MIT / MIT-0 / Python-2.0 / BlueOak-1.0.0:** retain applicable copyright and license notices.
- **CC0-1.0:** public-domain dedication; retain provenance where practical.

Dependency package manifests and license files remain the authoritative source for the exact notice text. This repository does not vendor `node_modules`; a production bundle or redistributed dependency source must include the notices for the dependencies actually shipped with that distribution.

## Resolved dependency inventory

The following list records every package/version entry returned by the audit, grouped by the declared SPDX license. Version constraints and exact resolution are pinned in `pnpm-lock.yaml`.

### MIT

- @asamuzakjp/css-color@5.1.11
- @asamuzakjp/dom-selector@7.1.1
- @asamuzakjp/generational-cache@1.0.1
- @asamuzakjp/nwsapi@2.3.9
- @babel/code-frame@7.29.7
- @babel/compat-data@7.29.7
- @babel/core@7.29.7
- @babel/generator@7.29.7
- @babel/helper-compilation-targets@7.29.7
- @babel/helper-globals@7.29.7
- @babel/helper-module-imports@7.29.7
- @babel/helper-module-transforms@7.29.7
- @babel/helper-plugin-utils@7.29.7
- @babel/helper-string-parser@7.29.7
- @babel/helper-validator-identifier@7.29.7
- @babel/helper-validator-option@7.29.7
- @babel/helpers@7.29.7
- @babel/parser@7.29.7
- @babel/plugin-transform-react-jsx-self@7.29.7
- @babel/plugin-transform-react-jsx-source@7.29.7
- @babel/runtime@7.29.7
- @babel/template@7.29.7
- @babel/traverse@7.29.7
- @babel/types@7.29.7
- @bramus/specificity@2.4.2
- @changesets/apply-release-plan@7.1.1
- @changesets/assemble-release-plan@6.0.10
- @changesets/changelog-git@0.2.1
- @changesets/cli@2.27.11
- @changesets/config@3.1.4
- @changesets/errors@0.2.0
- @changesets/get-dependents-graph@2.1.4
- @changesets/get-release-plan@4.0.16
- @changesets/get-version-range-type@0.4.0
- @changesets/git@3.0.4
- @changesets/logger@0.1.1
- @changesets/parse@0.4.3
- @changesets/pre@2.0.2
- @changesets/read@0.6.7
- @changesets/should-skip-package@0.1.2
- @changesets/types@4.1.0, 6.1.0
- @changesets/write@0.3.2
- @csstools/css-calc@3.2.1
- @csstools/css-color-parser@4.1.1
- @csstools/css-parser-algorithms@4.0.0
- @csstools/css-tokenizer@4.0.0
- @esbuild/linux-x64@0.21.5, 0.24.2
- @eslint-community/eslint-utils@4.9.1
- @eslint-community/regexpp@4.12.2
- @eslint/eslintrc@3.3.5
- @eslint/js@9.18.0
- @exodus/bytes@1.15.1
- @jridgewell/gen-mapping@0.3.13
- @jridgewell/remapping@2.3.5
- @jridgewell/resolve-uri@3.1.2
- @jridgewell/sourcemap-codec@1.5.5
- @jridgewell/trace-mapping@0.3.31
- @manypkg/find-root@1.1.0
- @manypkg/get-packages@1.1.3
- @nodelib/fs.scandir@2.1.5
- @nodelib/fs.stat@2.0.5
- @nodelib/fs.walk@1.2.8
- @rollup/rollup-linux-x64-gnu@4.61.0
- @rollup/rollup-linux-x64-musl@4.61.0
- @testing-library/dom@10.4.1
- @testing-library/react@16.3.2
- @types/aria-query@5.0.4
- @types/babel__core@7.20.5
- @types/babel__generator@7.27.0
- @types/babel__template@7.4.4
- @types/babel__traverse@7.28.0
- @types/estree@1.0.9
- @types/json-schema@7.0.15
- @types/node@12.20.55, 22.10.7
- @types/prop-types@15.7.15
- @types/react@18.3.18
- @types/react-dom@18.3.5, 18.3.7
- @typescript-eslint/eslint-plugin@8.21.0
- @typescript-eslint/parser@8.21.0
- @typescript-eslint/scope-manager@8.21.0
- @typescript-eslint/type-utils@8.21.0
- @typescript-eslint/types@8.21.0
- @typescript-eslint/typescript-estree@8.21.0
- @typescript-eslint/utils@8.21.0
- @typescript-eslint/visitor-keys@8.21.0
- @vitejs/plugin-react@4.3.4
- @vitest/expect@2.1.8
- @vitest/mocker@2.1.8
- @vitest/pretty-format@2.1.8, 2.1.9
- @vitest/runner@2.1.8
- @vitest/snapshot@2.1.8
- @vitest/spy@2.1.8
- @vitest/utils@2.1.8
- acorn@8.16.0
- acorn-jsx@5.3.2
- ajv@6.15.0
- ansi-colors@4.1.3
- ansi-regex@5.0.1
- ansi-styles@4.3.0, 5.2.0
- argparse@1.0.10
- array-union@2.1.0
- assertion-error@2.0.1
- balanced-match@1.0.2
- better-path-resolve@1.0.0
- bidi-js@1.0.3
- brace-expansion@1.1.15, 2.1.1
- braces@3.0.3
- browserslist@4.28.2
- cac@6.7.14
- callsites@3.1.0
- chai@5.3.3
- chalk@4.1.2
- chardet@0.7.0
- check-error@2.1.3
- ci-info@3.9.0
- color-convert@2.0.1
- color-name@1.1.4
- concat-map@0.0.1
- convert-source-map@2.0.0
- cross-spawn@7.0.6
- css-tree@3.2.1
- csstype@3.2.3
- data-urls@7.0.0
- debug@4.4.3
- decimal.js@10.6.0
- deep-eql@5.0.2
- deep-is@0.1.4
- dequal@2.0.3
- detect-indent@6.1.0
- dir-glob@3.0.1
- dom-accessibility-api@0.5.16
- enquirer@2.4.1
- es-module-lexer@1.7.0
- esbuild@0.21.5, 0.24.2
- escalade@3.2.0
- escape-string-regexp@4.0.0
- eslint@9.18.0
- estree-walker@3.0.3
- extendable-error@0.1.7
- external-editor@3.1.0
- fast-deep-equal@3.1.3
- fast-glob@3.3.3
- fast-json-stable-stringify@2.1.0
- fast-levenshtein@2.0.6
- file-entry-cache@8.0.0
- fill-range@7.1.1
- find-up@4.1.0, 5.0.0
- flat-cache@4.0.1
- fs-extra@7.0.1, 8.1.0
- gensync@1.0.0-beta.2
- globals@14.0.0
- globby@11.1.0
- graphemer@1.4.0
- has-flag@4.0.0
- html-encoding-sniffer@6.0.0
- human-id@1.0.2
- iconv-lite@0.4.24
- ignore@5.3.2
- import-fresh@3.3.1
- imurmurhash@0.1.4
- is-extglob@2.1.1
- is-glob@4.0.3
- is-number@7.0.0
- is-potential-custom-element-name@1.0.1
- is-subdir@1.2.0
- is-windows@1.0.2
- js-tokens@4.0.0
- js-yaml@3.14.2, 4.2.0
- jsdom@29.1.1
- jsesc@3.1.0
- json-buffer@3.0.1
- json-schema-traverse@0.4.1
- json-stable-stringify-without-jsonify@1.0.1
- json5@2.2.3
- jsonfile@4.0.0
- keyv@4.5.4
- levn@0.4.1
- locate-path@5.0.0, 6.0.0
- lodash.merge@4.6.2
- lodash.startcase@4.4.0
- loose-envify@1.4.0
- loupe@3.2.1
- lz-string@1.5.0
- magic-string@0.30.21
- merge2@1.4.1
- micromatch@4.0.8
- mri@1.2.0
- ms@2.1.3
- nanoid@3.3.12
- natural-compare@1.4.0
- node-releases@2.0.47
- optionator@0.9.4
- os-tmpdir@1.0.2
- outdent@0.5.0
- p-filter@2.1.0
- p-limit@2.3.0, 3.1.0
- p-locate@4.1.0, 5.0.0
- p-map@2.1.0
- p-try@2.2.0
- package-manager-detector@0.2.11
- parent-module@1.0.1
- parse5@8.0.1
- path-exists@4.0.0
- path-key@3.1.1
- path-type@4.0.0
- pathe@1.1.2
- pathval@2.0.1
- picomatch@2.3.2
- pify@4.0.1
- postcss@8.5.15
- prelude-ls@1.2.1
- prettier@2.8.8, 3.4.2
- pretty-format@27.5.1
- punycode@2.3.1
- quansync@0.2.11
- queue-microtask@1.2.3
- react@18.3.1
- react-dom@18.3.1
- react-is@17.0.2
- react-refresh@0.14.2
- read-yaml-file@1.1.0
- require-from-string@2.0.2
- resolve-from@4.0.0, 5.0.0
- reusify@1.1.0
- rollup@4.61.0
- run-parallel@1.2.0
- safer-buffer@2.1.2
- scheduler@0.23.2
- shebang-command@2.0.0
- shebang-regex@3.0.0
- slash@3.0.0
- stackback@0.0.2
- std-env@3.10.0
- strip-ansi@6.0.1
- strip-bom@3.0.0
- strip-json-comments@3.1.1
- supports-color@7.2.0
- symbol-tree@3.2.4
- term-size@2.2.1
- tinybench@2.9.0
- tinyexec@0.3.2
- tinypool@1.1.1
- tinyrainbow@1.2.0
- tinyspy@3.0.2
- tldts@7.4.2
- tldts-core@7.4.2
- tmp@0.0.33
- to-regex-range@5.0.1
- tr46@6.0.0
- ts-api-utils@2.5.0
- turbo@2.3.3
- turbo-linux-64@2.3.3
- type-check@0.4.0
- typescript-eslint@8.21.0
- undici@7.27.0
- undici-types@6.20.0
- universalify@0.1.2
- update-browserslist-db@1.2.3
- vite@5.4.21, 6.0.7
- vite-node@2.1.8
- vitest@2.1.8
- w3c-xmlserializer@5.0.0
- whatwg-mimetype@5.0.0
- whatwg-url@16.0.1
- why-is-node-running@2.3.0
- word-wrap@1.2.5
- xmlchars@2.2.0
- yocto-queue@0.1.0
- spawndamnit@3.0.1 (license metadata: SEE LICENSE IN LICENSE; upstream LICENSE verified as MIT)

### MIT-0

- @csstools/color-helpers@6.0.2
- @csstools/css-syntax-patches-for-csstree@1.1.4

### Apache-2.0

- @eslint/config-array@0.19.2
- @eslint/core@0.10.0, 0.13.0
- @eslint/object-schema@2.1.7
- @eslint/plugin-kit@0.2.8
- @humanfs/core@0.19.2
- @humanfs/node@0.16.8
- @humanfs/types@0.15.0
- @humanwhocodes/module-importer@1.0.1
- @humanwhocodes/retry@0.4.3
- @playwright/test@1.49.1
- aria-query@5.3.0
- baseline-browser-mapping@2.10.33
- eslint-visitor-keys@3.4.3, 4.2.1
- expect-type@1.3.0
- playwright@1.49.1
- playwright-core@1.49.1
- typescript@5.7.3
- xml-name-validator@5.0.0

### Python-2.0

- argparse@2.0.1

### CC-BY-4.0

- caniuse-lite@1.0.30001793

### ISC

- electron-to-chromium@1.5.365
- fastq@1.20.1
- flatted@3.4.2
- glob-parent@5.1.2, 6.0.2
- graceful-fs@4.2.11
- isexe@2.0.0
- lru-cache@5.1.1
- minimatch@3.1.5, 9.0.9
- picocolors@1.1.1
- saxes@6.0.0
- semver@6.3.1, 7.8.1
- siginfo@2.0.0
- signal-exit@4.1.0
- which@2.0.2
- yallist@3.1.1

### BSD-2-Clause

- entities@8.0.0
- eslint-scope@8.4.0
- espree@10.4.0
- esprima@4.0.1
- esrecurse@4.3.0
- estraverse@5.3.0
- esutils@2.0.3
- uri-js@4.4.1
- webidl-conversions@8.0.1

### BSD-3-Clause

- esquery@1.7.0
- source-map-js@1.2.1
- sprintf-js@1.0.3
- tough-cookie@6.0.1

### BlueOak-1.0.0

- lru-cache@11.5.1

### CC0-1.0

- mdn-data@2.27.1

## Assets

No third-party stock images, music, video clips, or proprietary brand assets were introduced by the WAVORA foundation and editor-shell changes. Any later asset, font, model, sample, or media addition must be recorded here with its source, creator, license, and required attribution.
