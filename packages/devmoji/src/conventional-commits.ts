import { Devmoji } from "./devmoji"

export class ConventionalCommits {
  constructor(public devmoji: Devmoji) {}

  format(text: string) {
    text = this.devmoji.devmojify(text)
    const regex = /^(?<type>[a-z]+)(?:\((?<scope>[a-z]+)\))?:\s*/g
    const match = regex.exec(text)
    if (match) {
      const [all, type, scope] = match
      const code = this.devmoji.get(type)
      if (!code.startsWith(":")) {
        text =
          text.slice(0, all.length).trimRight() +
          ` ${code} ` +
          text.slice(all.length).trimLeft()
      }
    }
    return this.devmoji.emojify(text)
  }
}
