import fetch from "node-fetch"
import fs = require("fs")

import chalk from "chalk"

const regex = /unicode\/(.*)\.png.*/

fetch("https://api.github.com/emojis", { method: "GET" })
  .then(res => res.json())
  .then(json => {
    let added = 0
    let skipped = 0
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const emoji: any = {}
    for (const code in json) {
      const match = regex.exec(json[code])
      if (match) {
        added++
        emoji[code] = match[1]
          .split("-")
          .map(x => String.fromCodePoint(parseInt(x, 16)))
          .join(String.fromCodePoint(0x200d))
      } else skipped++
    }
    fs.writeFileSync(
      "data/github.emoji.json",
      JSON.stringify(emoji, null, "  "),
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
      "data/gitmoji.emoji.json",
      JSON.stringify(json, null, "  "),
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
