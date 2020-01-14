type TDevmoji = {
  code: string
  emoji?: string
  gitmoji?: string
  description?: string
}

interface ConfigOptions {
  types: string[]
  devmoji: TDevmoji[]
}
