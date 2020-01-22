## [2.0.3](https://github.com/folke/devmoji/compare/v2.0.2...v2.0.3) (2020-01-22)


### Bug Fixes

* 🐛 show correct --version ([959d216](https://github.com/folke/devmoji/commit/959d2164ba2d0f4f64323d2f4dbcc768c32cedad))

## [2.0.2](https://github.com/folke/devmoji/compare/v2.0.1...v2.0.2) (2020-01-22)


### Bug Fixes

* 🐛 colors are now properly disabled when not on a TTY ([36406c5](https://github.com/folke/devmoji/commit/36406c5382483b650cc2141d8e05b575eed5bd94))

## [2.0.1](https://github.com/folke/devmoji/compare/v2.0.0...v2.0.1) (2020-01-16)


### Bug Fixes

* **docs:** 🐛 📚️ updated docs ([667db23](https://github.com/folke/devmoji/commit/667db23c0bf1678151ed64e7d265e15c0a3584e5))

# [2.0.0](https://github.com/folke/devmoji/compare/v1.2.2...v2.0.0) (2020-01-16)


### Bug Fixes

* **config:** 🐛 ⚙️ added correct search paths for config file ([63d2488](https://github.com/folke/devmoji/commit/63d248832a53163ee54e3f41542d8a59326aa6ce))
* **emoji:** 🐛 added support for colorful emoji variations ([dff0ede](https://github.com/folke/devmoji/commit/dff0ede10c186cf8c3abcd8112c01ce0a506ae24))
* **emoji:** 🐛 fixed emoji variations ([2d60115](https://github.com/folke/devmoji/commit/2d6011536c0b6e54980296dc4315553dfa812e63))
* **emoji:** 🐛 use unicode emoji variations when available ([c0ff022](https://github.com/folke/devmoji/commit/c0ff022bb9a53f8f0187164441926a9a2ac76eba))


* feat(commit)!: 💥 ✨ added support for ! in a breaking change header ([23ec3c9](https://github.com/folke/devmoji/commit/23ec3c9dc6cc260b9147cb88e748a0c3aa7d58f4))


### BREAKING CHANGES

* added breaking change support 😄

## [1.2.2](https://github.com/folke/devmoji/compare/v1.2.1...v1.2.2) (2020-01-15)

## [1.2.1](https://github.com/folke/devmoji/compare/v1.2.0...v1.2.1) (2020-01-15)


### Bug Fixes

* **docs:** 🐛 📚 updated README.md ([6366bd3](https://github.com/folke/devmoji/commit/6366bd3b437706a9d2d079df2ea7b711ccf943c5))

# [1.2.0](https://github.com/folke/devmoji/compare/v1.1.1...v1.2.0) (2020-01-15)


### Bug Fixes

* **cli:** 🐛 all output now honors --no-color ([a44e628](https://github.com/folke/devmoji/commit/a44e6280510869e00a10552026839139dab0262b))


### Features

* **config:** ✨ ⚙ ➕ devmojis for config, add, remove ([faa3aac](https://github.com/folke/devmoji/commit/faa3aacc05cccb212da84459321453b91414dffe))

## [1.1.1](https://github.com/folke/devmoji/compare/v1.1.0...v1.1.1) (2020-01-15)


### Bug Fixes

* **security:** 🐛 🔒 upgraded lodash & underscore from security advisory ([d2d39be](https://github.com/folke/devmoji/commit/d2d39bebfb961f1f6d7178b6c8b9fe119c3c5843))

# [1.1.0](https://github.com/folke/devmoji/compare/v1.0.1...v1.1.0) (2020-01-15)


### Features

* ✨ added semantic-release ([a597cd1](https://github.com/folke/devmoji/commit/a597cd1167911a3cdc6d42f62e30106519bc27c0))

# 0.0.0 (2020-01-14)


### Features

* ✨ added support for git hooks ([799f156](https://github.com/folke/devmoji/commit/799f1569b441a2ab708ad18df46f4bd969534514))
* ✨ refactored config files and added runtime validation ([cc94e2c](https://github.com/folke/devmoji/commit/cc94e2c71e7a79422dde32faab21313c60331631))
* ✨ we now support scope based devmojis and --color for --log ([a3df981](https://github.com/folke/devmoji/commit/a3df981a205ca1def58b57e3f408274500811fa1))
* **cli:** ✨ added cli for working with devmoji 🚀 ([8f16492](https://github.com/folke/devmoji/commit/8f16492295908f26db5f5e4b93a075f516629a13))
* **config:** ✨ added devmoji configs ([4379667](https://github.com/folke/devmoji/commit/43796674bfb9061995a687ea90b7b3c81226d015))
* **emoji:** :sparkles: added script to fetch github and gitmoji ([aecf9df](https://github.com/folke/devmoji/commit/aecf9dfa41350520788e1a57657eff16b13434cd))
* ✨ devmoji package ([e7e2b61](https://github.com/folke/devmoji/commit/e7e2b61105bf86305d2ec632db731b22c0008370))


### Performance Improvements

* ⚡ configured vscode debugging support ([1e0876a](https://github.com/folke/devmoji/commit/1e0876adfe7056285057d3b924f90d8cbeede0b5))


### BREAKING CHANGES

* devmoji can now be used as a prepare-commit-msg hook to
automagically add emojis to commit messages
