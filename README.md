# :sparkles: Devmoji

Using [Conventional Commits :star:](https://www.conventionalcommits.org/) as a
standard for your commit messages, makes
[Semantic Versioning :bookmark:](https://semver.org/) as easy as can be, with
tools like
[Conventional Changelog :page_facing_up:](https://github.com/conventional-changelog/conventional-changelog),
[Standard Version :bookmark:](https://github.com/conventional-changelog/standard-version)
and
[Semantic Release :package::rocket:](https://github.com/semantic-release/semantic-release)

**Devmoji** is a command line tool that adds color :rainbow: to conventional
commits, using emojis inspired by
[Gitmoji :stuck_out_tongue_winking_eye:](https://gitmoji.carloscuesta.me/)

Some of the things **Devmoji** can do:

- **emojify:** convert input between diferent emoji formats `unicode`,
  `shortcode` (like `:smile:`), `devmoji`
- use aliases that are easy to remember like: `:test:`, `:refactor:`, `:docs:`,
  `:security` instead of non-related names of gitmoji
- us as a `prepare-commit-msg` commit hook to :sparkles: **automagically**
  emojify your commit message
- emojify and colorify the output of `git log` even for projects not using
  emojis

## :package: Installation

Install with `npm` or `yarn`

> globally

```sh
npm install -g devmoji
yarn global install devmoji
```

> locally inside your project. use with `npx devmoji`

```sh
npm install --dev devmoji
yarn add --dev devmoji
```

## :boom: Usage

> TODO: add usage

## :gear: Configuration

`devmoji` uses the config file as specified with the `--config` option, or looks
for `devmoji.config.js` in the current directory.

> To see all **Devmoiji** available in your setup:

```sh
devmoji --list
```

### Default Devmoji

| Emoji                  | Devmoji Code      | Description                                                                                                       |
| ---------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| :sparkles:             | `:feat:`          | **feat:** a new feature                                                                                           |
| :bug:                  | `:fix:`           | **fix:** a bug fix                                                                                                |
| :books:                | `:docs:`          | **docs:** documentation only changes                                                                              |
| :art:                  | `:style:`         | **style:** changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) |
| :recycle:              | `:refactor:`      | **refactor:** a code change that neither fixes a bug nor adds a feature                                           |
| :zap:                  | `:perf:`          | **perf:** a code change that improves performance                                                                 |
| :rotating_light:       | `:test:`          | **test:** adding missing or correcting existing tests                                                             |
| :wrench:               | `:chore:`         | **chore:** changes to the build process or auxiliary tools and libraries such as documentation generation         |
| :rocket:               | `:chore-release:` | **chore(release):** code deployment or publishing to external repositories                                        |
| :link:                 | `:chore-deps:`    | **chore(deps):** add or delete dependencies                                                                       |
| :package:              | `:build:`         | **build:** changes related to build processes                                                                     |
| :construction_worker:  | `:ci:`            | **ci:** updates to the continuous integration system                                                              |
| :rocket:               | `:release:`       | code deployment or publishing to external repositories                                                            |
| :lock:                 | `:security:`      | Fixing security issues.                                                                                           |
| :globe_with_meridians: | `:i18n:`          | Internationalization and localization.                                                                            |
| :boom:                 | `:breaking:`      | Introducing breaking changes.                                                                                     |
| :gear:                 | `:config:`        | Changing configuration files.                                                                                     |
| :heavy_plus_sign:      | `:add:`           | add something                                                                                                     |
| :heavy_minus_sign:     | `:remove:`        | remove something                                                                                                  |

## Todo

- [ ] write documentation
- [ ] create commitlint-plugin
- [ ] create commitlint-config
- [ ] integrate with commitzen
