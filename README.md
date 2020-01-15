# :sparkles: Devmoji

## Usage

## :gear: Configuration

`devmoji` uses the config file as specified with the `--config` option, or looks for `devmoji.config.js` in the current directory.

> To see all **Devmoiji** available in your setup:

```sh
devmoji --list
```

### Default Devmoji

| Emoji                  | Devmoji           | Description                                                                                                       |
| ---------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| :sparkles:             | `:feat:`          | **feat:** a new feature                                                                                           |
| :bug:                  | `:fix:`           | **fix:** a bug fix                                                                                                |
| :books:                | `:docs:`          | **docs:** documentation only changes                                                                              |
| :art:                  | `:style:`         | **style:** changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) |
| :hammer:               | `:refactor:`      | **refactor:** a code change that neither fixes a bug nor adds a feature                                           |
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

## Todo

- [ ] write documentation
- [ ] create commitlint-plugin
- [ ] create commitlint-config
- [ ] integrate with commitzen
