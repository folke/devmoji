import fetch from "node-fetch"
import * as fs from "fs"

import chalk from "chalk"

export async function update() {
  const variations = new Set<number>()

  await fetch(
    "https://unicode.org/Public/emoji/12.1/emoji-variation-sequences.txt",
    {
      method: "GET",
    }
  )
    .then(res => res.text())
    .then(res => {
      const regex = /^([0-9A-F]+).*emoji/gm
      let match
      do {
        match = regex.exec(res)
        if (match) {
          variations.add(parseInt(match[1], 16))
        }
      } while (match)
    })
    .catch(err => {
      console.error(chalk.red("error"), err)
      process.exit(1)
    })

  fetch("https://api.github.com/emojis", { method: "GET" })
    .then(res => res.json())
    .then(json => {
      const regex = /unicode\/(.*)\.png.*/
      let added = 0
      let skipped = 0
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const emoji: any = []
      for (const code in json) {
        const match = regex.exec(json[code])
        if (match) {
          added++
          emoji.push([
            code,
            match[1]
              .split("-")
              .map(x => {
                const xx = parseInt(x, 16)
                let ret = String.fromCodePoint(xx)
                if (variations.has(xx)) ret += String.fromCodePoint(0xfe0f)
                return ret
              })
              .join(String.fromCodePoint(0x200d)),
          ])
        } else skipped++
      }
      fs.writeFileSync(
        "src/data/github.emoji.ts",
        "export default " + JSON.stringify({ emojis: emoji }, null, "  "),
        "utf8"
      )
      console.log(
        chalk.blue("[github]"),
        "Added",
        added,
        "and skipped",
        skipped,
        "emojis"
      )
    })
    .catch(err => {
      console.error(chalk.red("error"), err)
      process.exit(1)
    })

  fetch(
    "https://raw.githubusercontent.com/carloscuesta/gitmoji/master/src/data/gitmojis.json",
    { method: "GET" }
  )
    .then(res => res.json())
    .then(json => {
      fs.writeFileSync(
        "src/data/gitmoji.emoji.ts",
        "export default " + JSON.stringify(json, null, "  "),
        "utf8"
      )
      console.log(
        chalk.blue("[gitmoji]"),
        "Added",
        json.gitmojis.length,
        "emojis"
      )
    })
    .catch(err => {
      console.error(chalk.red("error"), err)
      process.exit(1)
    })
}

if (module === require.main) {
  update()
}
