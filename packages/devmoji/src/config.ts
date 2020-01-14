import { codes, TDevmoji } from "./codes"
import path = require("path")
import fs = require("fs")

export class Config {
  codes = new Map<string, TDevmoji>()
  emojis = new Map<string, TDevmoji>()

  constructor(config?: { codes: TDevmoji[] }) {
    codes.forEach(c => this.codes.set(c.code, c))

    if (config?.codes) {
      for (let code of config.codes) {
        if (!code.code)
          throw `Missing property 'code' for ${JSON.stringify(code)}`
        if (!code.emoji)
          throw `Missing property 'emoji' for ${JSON.stringify(code)}`
        code = {
          ...{
            description: "",
          },
          ...this.codes.get(code.code),
          ...code,
        }
        this.codes.set(code.code, code)
      }
    }
    for (const code of this.codes.values()) {
      this.emojis.set(code.emoji, code)
    }
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
