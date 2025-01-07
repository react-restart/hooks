## [0.6.2](https://github.com/react-restart/hooks/compare/v0.6.1...v0.6.2) (2025-01-07)


### Bug Fixes

* exports definition again ([364e4a6](https://github.com/react-restart/hooks/commit/364e4a68ccad6e30d59c1ec6fd305019a521f912))





## [0.6.1](https://github.com/react-restart/hooks/compare/v0.6.0...v0.6.1) (2025-01-07)


### Bug Fixes

* exports definition ([523780d](https://github.com/react-restart/hooks/commit/523780d5bd7ce9647753c284d84f4f59e624af70))





# [0.6.0](https://github.com/react-restart/hooks/compare/v0.5.1...v0.6.0) (2025-01-07)


* build!: Update build, export real ESM (#100) ([9e272d3](https://github.com/react-restart/hooks/commit/9e272d3c5e89c7cd6547c6c66afac6b800b6c7ff)), closes [#100](https://github.com/react-restart/hooks/issues/100)


### BREAKING CHANGES

* exports native esm modules and removes the index file in favor of sub imports





## [0.5.1](https://github.com/jquense/react-common-hooks/compare/v0.5.0...v0.5.1) (2025-01-02)


### Bug Fixes

* **useTimeout:** isPending never updates ([51e14ec](https://github.com/jquense/react-common-hooks/commit/51e14ec0d40c70b4cf09ce02b58beaa740b6b0cf))





# [0.5.0](https://github.com/jquense/react-common-hooks/compare/v0.4.16...v0.5.0) (2024-11-25)


* A number of StrictMode fixes and updates (#99) ([1511129](https://github.com/jquense/react-common-hooks/commit/1511129898f9b95659bab7f964fe33528d04b938)), closes [#99](https://github.com/jquense/react-common-hooks/issues/99)


### BREAKING CHANGES

* no longer supports `cancelPrevious` this is always true

* fix:(useDebouncedCallback): Clean up timeout logic in strict mode

* chore: deprecate useWillUnmount

This hook is not possible in StrictMode, and can cause bugs

* fix(useForceUpdate): ensure that chained calls produce an update

* Update useCustomEffect.ts

* address feedback





## [0.4.16](https://github.com/jquense/react-common-hooks/compare/v0.4.15...v0.4.16) (2024-02-10)


### Bug Fixes

* **useDebouncedCallback:** fix behavior in strict mode ([#98](https://github.com/jquense/react-common-hooks/issues/98)) ([9a01792](https://github.com/jquense/react-common-hooks/commit/9a01792e025d35bc6af92582af5f8dd928227f2d))





## [0.4.15](https://github.com/jquense/react-common-hooks/compare/v0.4.14...v0.4.15) (2023-12-07)


### Bug Fixes

* **useDebouncedState:** Add factory function overload to type, clarify setter purity ([9aa18fb](https://github.com/jquense/react-common-hooks/commit/9aa18fb48d06ab2bd4d64b1b862a80d5d4d5cdd5))





## [0.4.14](https://github.com/jquense/react-common-hooks/compare/v0.4.13...v0.4.14) (2023-12-07)


### Bug Fixes

* **useDebouncedCallback:** wrap handler in useEventCallback so it's not stale ([63f897a](https://github.com/jquense/react-common-hooks/commit/63f897aa6972f66fd5d076c5edb4da6cda5031c0))





## [0.4.13](https://github.com/jquense/react-common-hooks/compare/v0.4.12...v0.4.13) (2023-12-06)


### Features

* **useDebouncedCallback:** return value from debounced function ([d1ead47](https://github.com/jquense/react-common-hooks/commit/d1ead4728fb14949a00d937f72a0657e0552d5b9))





## [0.4.12](https://github.com/jquense/react-common-hooks/compare/v0.4.11...v0.4.12) (2023-12-06)


### Features

* add leading, and maxWait options to debounce hooks ([#97](https://github.com/jquense/react-common-hooks/issues/97)) ([c8d69b2](https://github.com/jquense/react-common-hooks/commit/c8d69b23dd22a802f1c918f791478e841a9d0b99))





## [0.4.11](https://github.com/jquense/react-common-hooks/compare/v0.4.10...v0.4.11) (2023-07-17)


### Bug Fixes

* **useIsInitialRenderRef:** clarify usage and fix ordering ([437c417](https://github.com/jquense/react-common-hooks/commit/437c417806e501c17e89b7252168e790077bb322))





## [0.4.10](https://github.com/jquense/react-common-hooks/compare/v0.4.9...v0.4.10) (2023-07-13)


### Features

* **useFocusManager:** fire focused change immediately ([#92](https://github.com/jquense/react-common-hooks/issues/92)) ([7bb6d5a](https://github.com/jquense/react-common-hooks/commit/7bb6d5ae74c40ff80b2fa5db06e21b7e970f7455))





## [0.4.9](https://github.com/jquense/react-common-hooks/compare/v0.4.8...v0.4.9) (2023-02-10)


### Features

* add exports field in package.json ([#88](https://github.com/jquense/react-common-hooks/issues/88)) ([1c325b0](https://github.com/jquense/react-common-hooks/commit/1c325b08a693ae9efa8cbfac6cc8d5884d2d238f))





## [0.4.8](https://github.com/jquense/react-common-hooks/compare/v0.4.7...v0.4.8) (2023-01-25)


### Bug Fixes

* **useDebouncedCallback:** fix return type ([#85](https://github.com/jquense/react-common-hooks/issues/85)) ([f2e26a0](https://github.com/jquense/react-common-hooks/commit/f2e26a0cbf8753f3c5964452b05b50721e5b3ca3))





## [0.4.7](https://github.com/jquense/react-common-hooks/compare/v0.4.6...v0.4.7) (2022-04-27)


### Features

* **useBreakpoint:** add xxl breakpoint ([#75](https://github.com/jquense/react-common-hooks/issues/75)) ([8021cea](https://github.com/jquense/react-common-hooks/commit/8021ceacaf34304e460193faf1ff8c5e31f43db1))





## [0.4.6](https://github.com/jquense/react-common-hooks/compare/v0.4.5...v0.4.6) (2022-04-01)


### Bug Fixes

* **useMounted:** adjust to work with strict effects ([#70](https://github.com/jquense/react-common-hooks/issues/70)) ([8deba46](https://github.com/jquense/react-common-hooks/commit/8deba46157fd8d73194cbd6ad81e5a6d575bf5d4))





## [0.4.5](https://github.com/jquense/react-common-hooks/compare/v0.4.4...v0.4.5) (2021-12-10)


### Features

* add useUpdateLayoutEffect ([1914f7e](https://github.com/jquense/react-common-hooks/commit/1914f7e55449505e88e8e93a06ad71bd58b7e9a4))





## [0.4.4](https://github.com/jquense/react-common-hooks/compare/v0.4.3...v0.4.4) (2021-12-07)


### Bug Fixes

* use targetWindow ([6c8fc0d](https://github.com/jquense/react-common-hooks/commit/6c8fc0d05ee94eda479dc11b4d1ee6ed4dbf8fc2))





## [0.4.3](https://github.com/jquense/react-common-hooks/compare/v0.4.2...v0.4.3) (2021-12-07)


### Bug Fixes

* store matchers per window ([6509df8](https://github.com/jquense/react-common-hooks/commit/6509df84abf35cc20faceea3db8a37121e3b7a61))





## [0.4.2](https://github.com/jquense/react-common-hooks/compare/v0.4.1...v0.4.2) (2021-12-07)


### Bug Fixes

* minor typo in useCommittedRef ([#59](https://github.com/jquense/react-common-hooks/issues/59)) ([0ceb834](https://github.com/jquense/react-common-hooks/commit/0ceb8347527e46dba115c62578a0485da8f46e22))


### Features

* allow specifying window with useMedia/useBreakpoint ([#61](https://github.com/jquense/react-common-hooks/issues/61)) ([bf9716d](https://github.com/jquense/react-common-hooks/commit/bf9716da21aff239baf02da11671cb5caf081ccf))





## [0.4.1](https://github.com/jquense/react-common-hooks/compare/v0.4.0...v0.4.1) (2021-09-27)


### Bug Fixes

* **useFocusManager:** memo returned handlers ([410bd5a](https://github.com/jquense/react-common-hooks/commit/410bd5a10588754319a8d0a8717399aca85b1947))


### Features

* add useDebouncedValue ([362dedf](https://github.com/jquense/react-common-hooks/commit/362dedf9ace6244b4766a0128f3afe1c1305ffb6))





# [0.4.0](https://github.com/jquense/react-common-hooks/compare/v0.3.27...v0.4.0) (2021-06-17)


### Features

* **useIntersectionObserver:** allow lazy roots ([4c8b77a](https://github.com/jquense/react-common-hooks/commit/4c8b77acdabeef2e2eef199e0f418ee4117b6d08))
* **useIntersectionObserver:** allow lazy roots ([#53](https://github.com/jquense/react-common-hooks/issues/53)) ([6b035cf](https://github.com/jquense/react-common-hooks/commit/6b035cf74868b381e23e69a144fd60ce06f72264))


### BREAKING CHANGES

* **useIntersectionObserver:** `null` in the native API means "the window", this is a departure to allow a consumer to hold off setting up the observer until the have a ref to the root. This was possible before by explicitly setting element to `null` until the root is available but still created an extra observer





## [0.3.27](https://github.com/jquense/react-common-hooks/compare/v0.3.26...v0.3.27) (2021-06-16)


### Bug Fixes

* **types:** fix ts errors ([#47](https://github.com/jquense/react-common-hooks/issues/47)) ([310e1ec](https://github.com/jquense/react-common-hooks/commit/310e1ec605835f245e0a6fa65c5ea9ce3a07d5ae))


### Features

* **useIntersectionObserver:** add more performant overload ([6c532d8](https://github.com/jquense/react-common-hooks/commit/6c532d8e1033579f23a6fec31c98be374d8ab4e1))
* **useMutationObserver:** add overload to return records and trigger updates ([1eaa621](https://github.com/jquense/react-common-hooks/commit/1eaa621a5da1545345a7c8df79ca09ec16dcf435))
* **useToggleState:** add useToggleState hook ([#48](https://github.com/jquense/react-common-hooks/issues/48)) ([5f95dd0](https://github.com/jquense/react-common-hooks/commit/5f95dd07dde261f73b8ff658f54dcae9b6034321))
* add useDebouncedCallback hook ([05fb8da](https://github.com/jquense/react-common-hooks/commit/05fb8da28ddd8c3afdcdd5e2250b16b539edc4a3))
* add useDebouncedState hook ([a87dd3b](https://github.com/jquense/react-common-hooks/commit/a87dd3b9788102106869bcada7b87dcf9eb984d2))
* remove lodash ([#35](https://github.com/jquense/react-common-hooks/issues/35)) ([fefa63c](https://github.com/jquense/react-common-hooks/commit/fefa63c4d2115d7880423fe5d26d5413efdc7d58))





## [0.3.26](https://github.com/jquense/react-common-hooks/compare/v0.3.25...v0.3.26) (2021-01-05)


### Bug Fixes

* Allow React 17 as peer dependency ([#42](https://github.com/jquense/react-common-hooks/issues/42)) ([d0fea56](https://github.com/jquense/react-common-hooks/commit/d0fea56dda0ea7139eca4899ce67123e68dd43d2))





## [0.3.25](https://github.com/jquense/react-common-hooks/compare/v0.3.24...v0.3.25) (2020-05-14)


### Bug Fixes

* set crossOrigin prior to src ([#31](https://github.com/jquense/react-common-hooks/issues/31)) ([1d585ec](https://github.com/jquense/react-common-hooks/commit/1d585eca5a062e70405f90fd1b4ffd469dd041be))





## [0.3.24](https://github.com/jquense/react-common-hooks/compare/v0.3.23...v0.3.24) (2020-05-13)


### Features

* add useThrottledEventHandler ([#30](https://github.com/jquense/react-common-hooks/issues/30)) ([f03d52b](https://github.com/jquense/react-common-hooks/commit/f03d52b096ed95f0614728acc243a2d0b6123970))





## [0.3.23](https://github.com/jquense/react-common-hooks/compare/v0.3.22...v0.3.23) (2020-05-13)


### Bug Fixes

* improve initial state type ([#29](https://github.com/jquense/react-common-hooks/issues/29)) ([35613e4](https://github.com/jquense/react-common-hooks/commit/35613e4aac832f9a09bd63f441f7c43a0df01b8c))





## [0.3.22](https://github.com/jquense/react-common-hooks/compare/v0.3.21...v0.3.22) (2020-03-18)


### Features

* **useImmediateUpdateEffect:** allow teardown from last effect like builtin effect hooks ([b85ad85](https://github.com/jquense/react-common-hooks/commit/b85ad852a0a9efed32183be8ce0b93386c46fe95))
* add useCustomEffect ([76b18d0](https://github.com/jquense/react-common-hooks/commit/76b18d048d70beba574c70f54684fdf0b41eb4fc))
* add useMutationObserver ([c9df89c](https://github.com/jquense/react-common-hooks/commit/c9df89cc5a1e1b83eb249e291b79a6bf3b32203b))





## [0.3.21](https://github.com/jquense/react-common-hooks/compare/v0.3.20...v0.3.21) (2020-02-25)


### Features

* add useMountEffect ([f4c4753](https://github.com/jquense/react-common-hooks/commit/f4c4753f15691b4ff6f44afd2b0a8e0e8e5b28e1))
* add useRefWithInitialValueFactory ([31188e2](https://github.com/jquense/react-common-hooks/commit/31188e28dc5b68fb6e030b855ce0491fbc0c1a70))
* add useUpdateEffect ([a0d17b1](https://github.com/jquense/react-common-hooks/commit/a0d17b1dcbb4f910468bd9ae60256318fe218ecc))





## [0.3.20](https://github.com/jquense/react-common-hooks/compare/v0.3.19...v0.3.20) (2020-01-23)


### Features

* **useTimeout:** handle large delays ([#21](https://github.com/jquense/react-common-hooks/issues/21)) ([32d6951](https://github.com/jquense/react-common-hooks/commit/32d69518295b6a620afad8c495ee357a35ffeb1f))





## [0.3.19](https://github.com/jquense/react-common-hooks/compare/v0.3.18...v0.3.19) (2019-11-26)


### Features

* Add option in useInterval to run immediately ([#15](https://github.com/jquense/react-common-hooks/issues/15)) ([899369f](https://github.com/jquense/react-common-hooks/commit/899369febaaff7f60ed449b07838ef199a35b5c1))





## [0.3.18](https://github.com/jquense/react-common-hooks/compare/v0.3.17...v0.3.18) (2019-11-22)


### Bug Fixes

* Fix React peer dependency ([ea56c3d](https://github.com/jquense/react-common-hooks/commit/ea56c3d9f37f45a85d18e7b6d4092faf459bfef8))





## [0.3.17](https://github.com/jquense/react-common-hooks/compare/v0.3.16...v0.3.17) (2019-11-22)


### Bug Fixes

* Clean up package.json ([#16](https://github.com/jquense/react-common-hooks/issues/16)) ([d167136](https://github.com/jquense/react-common-hooks/commit/d1671360eed0b8137d8ca32271bef7c498b5faef))





## [0.3.16](https://github.com/jquense/react-common-hooks/compare/v0.3.15...v0.3.16) (2019-11-22)


### Features

* add useImmediateUpdateEffect ([#14](https://github.com/jquense/react-common-hooks/issues/14)) ([b6f5870](https://github.com/jquense/react-common-hooks/commit/b6f5870))





## [0.3.15](https://github.com/jquense/react-common-hooks/compare/v0.3.14...v0.3.15) (2019-10-23)


### Features

* add useSafeState ([#13](https://github.com/jquense/react-common-hooks/issues/13)) ([88c53cb](https://github.com/jquense/react-common-hooks/commit/88c53cb))





## [0.3.14](https://github.com/jquense/react-common-hooks/compare/v0.3.13...v0.3.14) (2019-09-20)


### Features

* add useAsyncSetState ([#12](https://github.com/jquense/react-common-hooks/issues/12)) ([0db4bb4](https://github.com/jquense/react-common-hooks/commit/0db4bb4))





## [0.3.13](https://github.com/jquense/react-common-hooks/compare/v0.3.12...v0.3.13) (2019-09-06)


### Bug Fixes

* useStableMemo infinite loop ([ad6fc5a](https://github.com/jquense/react-common-hooks/commit/ad6fc5a))





## [0.3.12](https://github.com/jquense/react-common-hooks/compare/v0.3.11...v0.3.12) (2019-08-12)


### Bug Fixes

* **useMediaQuery:** matches immediately in a DOM environment ([#11](https://github.com/jquense/react-common-hooks/issues/11)) ([5d1053d](https://github.com/jquense/react-common-hooks/commit/5d1053d))





## [0.3.11](https://github.com/jquense/react-common-hooks/compare/v0.3.10...v0.3.11) (2019-08-09)


### Features

* add useMergedRef ([#9](https://github.com/jquense/react-common-hooks/issues/9)) ([83bd6e1](https://github.com/jquense/react-common-hooks/commit/83bd6e1))





## [0.3.10](https://github.com/jquense/react-common-hooks/compare/v0.3.9...v0.3.10) (2019-08-09)


### Features

* add useMap and useSet ([#8](https://github.com/jquense/react-common-hooks/issues/8)) ([c21429c](https://github.com/jquense/react-common-hooks/commit/c21429c))





## [0.3.9](https://github.com/jquense/react-common-hooks/compare/v0.3.8...v0.3.9) (2019-08-05)


### Features

* add useForceUpdate() ([ba91b5f](https://github.com/jquense/react-common-hooks/commit/ba91b5f))





## [0.3.8](https://github.com/jquense/react-common-hooks/compare/v0.3.7...v0.3.8) (2019-07-18)


### Bug Fixes

* **useInterval:** don't call callback in useEffect ([#7](https://github.com/jquense/react-common-hooks/issues/7)) ([264fbeb](https://github.com/jquense/react-common-hooks/commit/264fbeb))





## [0.3.7](https://github.com/jquense/react-common-hooks/compare/v0.3.6...v0.3.7) (2019-07-11)


### Bug Fixes

* **useIntersectionObserver:** fix internal set state call triggering warnings ([7bc1d0c](https://github.com/jquense/react-common-hooks/commit/7bc1d0c))





## [0.3.6](https://github.com/jquense/react-common-hooks/compare/v0.3.5...v0.3.6) (2019-07-08)


### Bug Fixes

* wrong useStableMemo export ([16bda32](https://github.com/jquense/react-common-hooks/commit/16bda32))
* **useAnimationFrame:** stable return value ([5cca2d4](https://github.com/jquense/react-common-hooks/commit/5cca2d4))





## [0.3.5](https://github.com/jquense/react-common-hooks/compare/v0.3.4...v0.3.5) (2019-07-06)


### Bug Fixes

* **useIntersectionObserver:** return an array consistently ([ad3bb35](https://github.com/jquense/react-common-hooks/commit/ad3bb35))


### Features

* add useMediaQuery and useBreakpoint ([0d165ec](https://github.com/jquense/react-common-hooks/commit/0d165ec))





## [0.3.4](https://github.com/jquense/react-common-hooks/compare/v0.3.3...v0.3.4) (2019-07-04)


### Bug Fixes

* **useIntersectionObserver:** make SSR compatible ([fc56257](https://github.com/jquense/react-common-hooks/commit/fc56257))





## [0.3.3](https://github.com/jquense/react-common-hooks/compare/v0.3.2...v0.3.3) (2019-07-03)


### Bug Fixes

* **useEventListener:** correct listener options type ([96503dc](https://github.com/jquense/react-common-hooks/commit/96503dc))


### Features

* **useAnimationFrame:** add the ability to not clear previous callbacks ([541b82c](https://github.com/jquense/react-common-hooks/commit/541b82c))
* **useIntersectionObserver:** add an IntersectionObserver hook ([5791b22](https://github.com/jquense/react-common-hooks/commit/5791b22))
* **useIsomorphicEffect:** add hook to avoid SSR warning with useLayoutEffect ([6e6b5fa](https://github.com/jquense/react-common-hooks/commit/6e6b5fa))
* **useResizeObserver:** use with isomorphic safe effect ([4a5d976](https://github.com/jquense/react-common-hooks/commit/4a5d976))
* **useStableMemo:** add useStableMemo for a stable...useMemo ([ff981fb](https://github.com/jquense/react-common-hooks/commit/ff981fb))





## [0.3.2](https://github.com/jquense/react-common-hooks/compare/v0.3.1...v0.3.2) (2019-06-26)


### Features

* add esm support ([#5](https://github.com/jquense/react-common-hooks/issues/5)) ([ec456c1](https://github.com/jquense/react-common-hooks/commit/ec456c1))
* useEventListener allows a function, useGlobalListener works in SSR ([c67b9bc](https://github.com/jquense/react-common-hooks/commit/c67b9bc))





## [0.3.1](https://github.com/jquense/react-common-hooks/compare/v0.3.0...v0.3.1) (2019-06-07)


### Bug Fixes

* **useMergeState:** calling setState twice ([#4](https://github.com/jquense/react-common-hooks/issues/4)) ([ec7d569](https://github.com/jquense/react-common-hooks/commit/ec7d569))





# [0.3.0](https://github.com/jquense/react-common-hooks/compare/v0.2.14...v0.3.0) (2019-05-28)


### Features

* better name ([dca4d54](https://github.com/jquense/react-common-hooks/commit/dca4d54))


### BREAKING CHANGES

* useRequestAnimationFrame -> useAnimationFrame





## [0.2.14](https://github.com/jquense/react-common-hooks/compare/v0.2.13...v0.2.14) (2019-05-28)


### Features

* add useRequestAnimationFrame ([5c8dff1](https://github.com/jquense/react-common-hooks/commit/5c8dff1))





## [0.2.13](https://github.com/jquense/react-common-hooks/compare/v0.2.12...v0.2.13) (2019-05-15)


### Bug Fixes

* **types:** useInterval overloads ([f592102](https://github.com/jquense/react-common-hooks/commit/f592102))





## [0.2.12](https://github.com/jquense/react-common-hooks/compare/v0.2.11...v0.2.12) (2019-05-08)


### Bug Fixes

* **types:** make useFocusManger options optional ([c1ee506](https://github.com/jquense/react-common-hooks/commit/c1ee506))
* **useMounted:** provides a stable isMounted function ([3703508](https://github.com/jquense/react-common-hooks/commit/3703508))





## [0.2.11](https://github.com/jquense/react-common-hooks/compare/v0.2.10...v0.2.11) (2019-05-02)


### Bug Fixes

* allow nullable handlers in event callback ([c423cb8](https://github.com/jquense/react-common-hooks/commit/c423cb8))





## [0.2.10](https://github.com/jquense/react-common-hooks/compare/v0.2.9...v0.2.10) (2019-05-02)


### Features

* add useFocusManager() ([1cbeb66](https://github.com/jquense/react-common-hooks/commit/1cbeb66))
* add useTimeout() ([4cb8fa1](https://github.com/jquense/react-common-hooks/commit/4cb8fa1))
* add useUpdatedRef ([79b3a49](https://github.com/jquense/react-common-hooks/commit/79b3a49))
* add useWillUnmount() ([ab3e4df](https://github.com/jquense/react-common-hooks/commit/ab3e4df))





## [0.2.9](https://github.com/jquense/react-common-hooks/compare/v0.2.8...v0.2.9) (2019-04-22)





## [0.2.8](https://github.com/jquense/react-common-hooks/compare/v0.2.7...v0.2.8) (2019-04-22)


### Features

* add useCallbackRef ([722f6f5](https://github.com/jquense/react-common-hooks/commit/722f6f5))





## [0.2.7](https://github.com/jquense/react-common-hooks/compare/v0.2.6...v0.2.7) (2019-04-16)


### Bug Fixes

* **types:** allow null or undefined for useImage ([6806fd4](https://github.com/jquense/react-common-hooks/commit/6806fd4))
* **useResizeObserver:** allow element to be null or undefined ([d441fa2](https://github.com/jquense/react-common-hooks/commit/d441fa2))





## [0.2.6](https://github.com/jquense/react-common-hooks/compare/v0.2.5...v0.2.6) (2019-04-15)





## [0.2.5](https://github.com/jquense/react-common-hooks/compare/v0.2.3...v0.2.5) (2019-04-10)


### Features

* support Images directly in useImage ([f16210b](https://github.com/jquense/react-common-hooks/commit/f16210b))





## [0.2.3](https://github.com/jquense/react-common-hooks/compare/v0.2.2...v0.2.3) (2019-03-28)


### Features

* allow return null from useMergeState updater function ([c14a4e5](https://github.com/jquense/react-common-hooks/commit/c14a4e5))





## [0.2.2](https://github.com/jquense/react-common-hooks/compare/v0.2.1...v0.2.2) (2019-03-28)


### Bug Fixes

* optional crossOrigin on useImage ([2e08a7d](https://github.com/jquense/react-common-hooks/commit/2e08a7d))





## [0.2.1](https://github.com/jquense/react-common-hooks/compare/v0.2.0...v0.2.1) (2019-03-28)


### Features

* add useImage ([5b5de01](https://github.com/jquense/react-common-hooks/commit/5b5de01))





# [0.2.0](https://github.com/jquense/react-common-hooks/compare/v0.1.6...v0.2.0) (2019-03-28)


### Bug Fixes

* Target ES5 in build ([#1](https://github.com/jquense/react-common-hooks/issues/1)) ([1f49c80](https://github.com/jquense/react-common-hooks/commit/1f49c80))


### Features

* add use*Interval overloads ([94dea26](https://github.com/jquense/react-common-hooks/commit/94dea26))
* add useEventListener ([bc3f520](https://github.com/jquense/react-common-hooks/commit/bc3f520))
* useEffect over LayoutEffect ([95c3416](https://github.com/jquense/react-common-hooks/commit/95c3416))


### BREAKING CHANGES

* changed arg order around on useInterval and useRafInterval
* useCommittedRef fires latter now on useEffect





## [0.1.6](https://github.com/jquense/react-common-hooks/compare/v0.1.5...v0.1.6) (2019-03-27)


### Features

* better globalListener types ([b0ae1ed](https://github.com/jquense/react-common-hooks/commit/b0ae1ed))





## [0.1.5](https://github.com/jquense/react-common-hooks/compare/v0.1.4...v0.1.5) (2019-03-26)


### Bug Fixes

* remove usePrevious console.log ([aeb56d8](https://github.com/jquense/react-common-hooks/commit/aeb56d8))





## [0.1.4](https://github.com/jquense/react-common-hooks/compare/v0.1.3...v0.1.4) (2019-03-26)


### Bug Fixes

* deploy new code ([be0689c](https://github.com/jquense/react-common-hooks/commit/be0689c))





## [0.1.3](https://github.com/jquense/react-common-hooks/compare/v0.1.1...v0.1.3) (2019-03-26)


### Features

* add useMounted ([36ed090](https://github.com/jquense/react-common-hooks/commit/36ed090))





