import * as path from "path"
import * as fs from "fs"
import { defaults } from "./config-options-defaults"
import fooTI from "./config-options-ti"
import { createCheckers } from "ts-interface-checker"
import { EmojiPack, gitmoji, TEmoji } from "./emoji-pack"
import { ConfigOptions } from "./config-options"
import { homedir } from "os"

export class Config {
  options: ConfigOptions = { types: [], devmoji: [] }
  pack = new EmojiPack()

  constructor(options?: ConfigOptions) {
    this._load(defaults)
    if (options) {
      if (options.default) options = { ...options.default }
      if (!options.types) options.types = []
      if (!options.devmoji) options.devmoji = []
      this.validate(options)
      this._load(options)
    }
  }

  _load(options: ConfigOptions) {
    const types: string[] = [...this.options.types, ...options.types]
    this.options.types = [...new Set<string>(types)]

    for (const def of options.devmoji) {
      if (def.gitmoji) {
        const gm = gitmoji.get(def.gitmoji)
        if (gm) {
          if (!def.emoji) def.emoji = def.gitmoji
          if (!def.description) def.description = gm.description
        } else throw `Gitmoji '${def.gitmoji}' not found`
      }
      if (def.emoji) {
        this.pack.add({ ...this.pack.get(def.code), ...(def as TEmoji) })
        this.options.devmoji.push(def)
      } else throw `Missing 'emoji' or 'gitmoji' for ${def.code} in config file`
    }
  }

  validate(options: ConfigOptions) {
    const checker = createCheckers(fooTI)
    checker.ConfigOptions.check(options)
  }

  /**
   * Looks for a root directory, containing the given pattern
   * @param pattern
   * @param cwd
   */
  static findRoot(pattern: string, cwd = process.cwd()): string | undefined {
    const p = path.resolve(cwd, pattern)
    if (fs.existsSync(p)) return cwd
    const up = path.resolve(cwd, "../")
    if (up == cwd) return undefined
    return Config.findRoot(pattern, up)
  }

  static async load(configFile?: string, cwd = process.cwd()) {
    if (configFile && !fs.existsSync(configFile))
      throw `Config file not found ${configFile}`

    if (!configFile) {
      const searchPaths = [
        cwd,
        Config.findRoot("./package.json"),
        Config.findRoot("./.git"),
        homedir(),
      ]
      for (const p of searchPaths) {
        if (p) {
          const javascriptConfigFile = path.resolve(p, "./devmoji.config.js")
          if (fs.existsSync(javascriptConfigFile)) {
            configFile = javascriptConfigFile
            break
          }
          const typescriptConfigFile = path.resolve(p, "./devmoji.config.ts")
          if (fs.existsSync(typescriptConfigFile)) {
            configFile = typescriptConfigFile
            break
          }
        }
      }
    }

    if (configFile) {
      configFile = path.resolve(cwd, configFile)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const options = await import(configFile)
      return new Config(options)
    }

    return new Config()
  }
}
