export type TDevmoji = {
  code: string
  emoji?: string
  gitmoji?: string
  description?: string
}

export interface ConfigOptions {
  default?: ConfigOptions
  types: string[]
  devmoji: TDevmoji[]
}
