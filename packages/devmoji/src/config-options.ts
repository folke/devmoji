export type TDevmoji = {
  code: string
  emoji?: string
  gitmoji?: string
  description?: string
}

export interface ConfigOptions {
  types: string[]
  devmoji: TDevmoji[]
}
