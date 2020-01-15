import { Devmoji } from "../devmoji"
import { Config } from "../config"

const devmoji = new Devmoji(new Config())

function row(values: string[]) {
  return `| ${values.join(" | ")} |`
}

console.log(row(["Emoji", "Devmoji Code", "Description"]))
console.log(row(["---", "---", "---", "---"]))

for (const code of devmoji.config.pack.codes.values()) {
  let cc = ""
  if (devmoji.config.options.types.includes(code.code)) {
    cc = `${code.code}:`
  }
  if (code.code.includes("-")) {
    const [type, scope] = code.code.split("-")
    if (devmoji.config.options.types.includes(type)) {
      cc = `${type}(${scope}):`
    }
  }
  console.log(
    row([
      `:${code.emoji}:`,
      `\`:${code.code}:\``,
      (cc.length ? `**${cc}** ` : "") + (code.description || ""),
    ])
  )
}
