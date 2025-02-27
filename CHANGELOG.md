# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 6.0.0 (2025-02-27)


### ⚠ BREAKING CHANGES

* requires swc_core 5.x
* **swc:** Update to swc_core 0.90.x (compatible with @swc/core@1.4.x) (#34)

### Features

* add createVar, createGlobalTheme and assignVars ([7cde9d0](https://github.com/jantimon/css-variable/commit/7cde9d032bf3045484d8a9370cc5f414412bdf24))
* add displayName babel plugin option ([5843862](https://github.com/jantimon/css-variable/commit/58438622e3e58bfd0b199d9dc665db0211eae198))
* add full path to the dev variable name when using the swc plugin ([2af5985](https://github.com/jantimon/css-variable/commit/2af598512ce0596bb9a7890e32befacee9fb7708))
* add support for Next.js 15.0.4 ([#43](https://github.com/jantimon/css-variable/issues/43)) ([0f9a5a6](https://github.com/jantimon/css-variable/commit/0f9a5a6e8b6ab586dad0460ae0ab4c09948e5aa0))
* add swc plugin ([#2](https://github.com/jantimon/css-variable/issues/2)) ([e7e09c7](https://github.com/jantimon/css-variable/commit/e7e09c717b505578089550e5a903c411fa1ae89e))
* reduze bundle size ([b726748](https://github.com/jantimon/css-variable/commit/b72674819369afc3f3cf6f95f5d19230c6e1ec79))
* replace random fallback id ([00c569d](https://github.com/jantimon/css-variable/commit/00c569df081f41463a64f3eadddc720b36d113d6))
* **swc:** Update to swc_core 0.90.x (compatible with @swc/core@1.4.x) ([#34](https://github.com/jantimon/css-variable/issues/34)) ([5daebad](https://github.com/jantimon/css-variable/commit/5daebadc893b77428da797b300f9037ab7482da6))
* update @swc/core ([9318847](https://github.com/jantimon/css-variable/commit/93188474cb7c6026a1f3458161f57c97d6b8b550))
* upgrade dependencies ([49820dd](https://github.com/jantimon/css-variable/commit/49820dd0d53b8b05ea63987a110b1cf5de5c09e2))


### Bug Fixes

* **swc:** convert window paths to posix ([1f2fec0](https://github.com/jantimon/css-variable/commit/1f2fec0707f68ee6713dccb652bf733768e9b2a9)), closes [#6](https://github.com/jantimon/css-variable/issues/6)
* **swc:** include package.json properly ([#28](https://github.com/jantimon/css-variable/issues/28)) ([2077ec6](https://github.com/jantimon/css-variable/commit/2077ec6e01c9f9f58091326ddbe1dfdc2799e29f))
* update dev dependencies ([d3dabe2](https://github.com/jantimon/css-variable/commit/d3dabe2c7ca948f080a67e9439074c40c71d13bc))

## 5.0.0 (2024-12-10)


### ⚠ BREAKING CHANGES

* **swc** Update to swc_core 5.x (compatible with @swc/core@1.9.2) [#43](https://github.com/jantimon/css-variable/issues/43)

### Features

* add support for Next.js 15.0.4 ([#43](https://github.com/jantimon/css-variable/issues/43)) ([0f9a5a6](https://github.com/jantimon/css-variable/commit/0f9a5a6e8b6ab586dad0460ae0ab4c09948e5aa0))


## [4.0.0](https://github.com/jantimon/css-variable/compare/v3.10.2...v4.0.0) (2024-05-21)


### ⚠ BREAKING CHANGES

* **swc:** Update to swc_core 0.90.x (compatible with @swc/core@1.4.x) (#34)

### Features

* **swc:** Update to swc_core 0.90.x (compatible with @swc/core@1.4.x) ([#34](https://github.com/jantimon/css-variable/issues/34)) ([5daebad](https://github.com/jantimon/css-variable/commit/5daebadc893b77428da797b300f9037ab7482da6))

### [3.10.2](https://github.com/jantimon/css-variable/compare/v3.10.1...v3.10.2) (2023-07-20)

### [3.10.1](https://github.com/jantimon/css-variable/compare/v3.10.0...v3.10.1) (2023-01-26)


### Bug Fixes

* **swc:** include package.json properly ([#28](https://github.com/jantimon/css-variable/issues/28)) ([2077ec6](https://github.com/jantimon/css-variable/commit/2077ec6e01c9f9f58091326ddbe1dfdc2799e29f))

## [3.10.0](https://github.com/jantimon/css-variable/compare/v3.9.0...v3.10.0) (2023-01-26)

### Features

* faster hash generation with more readable hashes ([1a0006f](https://github.com/jantimon/css-variable/commit/1a0006f9f150231b319be74ccaf757eb257da764))

### Bug Fixes

* update dev dependencies ([d3dabe2](https://github.com/jantimon/css-variable/commit/d3dabe2c7ca948f080a67e9439074c40c71d13bc))

### [3.9.1](https://github.com/jantimon/css-variable/compare/v3.9.0...v3.9.1) (2022-11-23)

### Features

* add type declarations to exports field ([13e6696](https://github.com/jantimon/css-variable/commit/13e669626747d248d4f695ccf9d4f919f757bcf3)) in package.json. closes [#18]

### Bug Fixes

* update dev dependencies ([9d6132e](https://github.com/jantimon/css-variable/commit/9d6132e06342d7e4aa17e746d920b5fc5f7d7f1b))

## [3.9.0](https://github.com/jantimon/css-variable/compare/v3.8.0...v3.9.0) (2022-11-03)

### Features

* improve css variable names ([2bd733f](https://github.com/jantimon/css-variable/commit/2bd733f793453bf1c954e87933a98b44998bd95f))

## [3.8.0](https://github.com/jantimon/css-variable/compare/v3.7.0...v3.8.0) (2022-08-02)


### Features

* update @swc/core ([9318847](https://github.com/jantimon/css-variable/commit/93188474cb7c6026a1f3458161f57c97d6b8b550))

# 3.7.0 (2022-07-15)


### Bug Fixes

* **swc:** convert window paths to posix ([1f2fec0](https://github.com/jantimon/css-variable/commit/1f2fec0707f68ee6713dccb652bf733768e9b2a9)), closes [#6](https://github.com/jantimon/css-variable/issues/6)


### Features

* add createVar, createGlobalTheme and assignVars ([7cde9d0](https://github.com/jantimon/css-variable/commit/7cde9d032bf3045484d8a9370cc5f414412bdf24))
* add displayName babel plugin option ([5843862](https://github.com/jantimon/css-variable/commit/58438622e3e58bfd0b199d9dc665db0211eae198))
* add full path to the dev variable name when using the swc plugin ([2af5985](https://github.com/jantimon/css-variable/commit/2af598512ce0596bb9a7890e32befacee9fb7708))
* add swc plugin ([#2](https://github.com/jantimon/css-variable/issues/2)) ([e7e09c7](https://github.com/jantimon/css-variable/commit/e7e09c717b505578089550e5a903c411fa1ae89e))
* reduze bundle size ([b726748](https://github.com/jantimon/css-variable/commit/b72674819369afc3f3cf6f95f5d19230c6e1ec79))
* replace random fallback id ([00c569d](https://github.com/jantimon/css-variable/commit/00c569df081f41463a64f3eadddc720b36d113d6))
