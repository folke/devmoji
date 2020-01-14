import path = require("path")
import fs = require("fs")
import { defaults } from "./config-options-defaults"
import fooTI from "./config-options-ti"
import { createCheckers } from "ts-interface-checker"
import { EmojiPack, gitmoji, TEmoji } from "./emoji-pack"

export class Config {
  options: ConfigOptions = { types: [], devmoji: [] }
  pack = new EmojiPack()

  constructor(options?: ConfigOptions) {
    this._load(defaults)
    if (options) {
      this.validate(options)
      this._load(options)
    }
  }

  _load(options: ConfigOptions) {
    if (options.types) {
      const types: string[] = [...(this.options.types || []), ...options.types]
      this.options.types = [...new Set<string>(types)]
    }
    if (options.devmoji)
      for (const def of options.devmoji) {
        if (def.gitmoji) {
          if (!def.emoji) def.emoji = def.gitmoji
          if (!def.description)
            def.description = gitmoji.get(def.gitmoji)?.description
        }
        if (def.emoji) {
          this.pack.add({ ...this.pack.get(def.code), ...(def as TEmoji) })
          this.options.devmoji?.push(def)
        } else
          throw `Missing 'emoji' or 'gitmoji' for ${def.code} in config file`
      }
  }

  validate(options: ConfigOptions) {
    const checker = createCheckers(fooTI)
    checker.ConfigOptions.check(options)
  }

  static async load(configFile?: string, cwd = process.cwd()) {
    if (configFile && !fs.existsSync(configFile))
      throw `Config file not found ${configFile}`

    if (!configFile) {
      const defaultFile = path.resolve(cwd, "./devmoji.config.js")
      if (fs.existsSync(defaultFile)) configFile = defaultFile
    }

    if (configFile) {
      configFile = path.resolve(cwd, configFile)
      return new Config(await import(configFile))
    }

    return new Config()
  }
}
