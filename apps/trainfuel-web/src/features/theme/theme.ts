export const themeOptions = ["light", "dark", "dracula"] as const

export type AppTheme = (typeof themeOptions)[number]

export const isAppTheme = (value: string): value is AppTheme => {
  return themeOptions.includes(value as AppTheme)
}
