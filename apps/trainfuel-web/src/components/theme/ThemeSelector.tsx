import { Button, Card } from "@heroui/react"
import type { AppTheme } from "../../features/theme/theme"

type ThemeSelectorProps = {
  theme: AppTheme
  onThemeChange: (theme: AppTheme) => void
}

const themes: Array<{
  id: AppTheme
  label: string
}> = [
  {
    id: "light",
    label: "Light"
  },
  {
    id: "dark",
    label: "Dark"
  },
  {
    id: "dracula",
    label: "Dracula"
  }
]

export const ThemeSelector = ({ theme, onThemeChange }: ThemeSelectorProps) => {
  return (
    <Card.Content className="flex flex-row flex-wrap gap-2 p-0">
      {themes.map((themeOption) => (
        <Button
          key={themeOption.id}
          className={
            theme === themeOption.id
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-default-100 text-default-900 hover:bg-default-200"
          }
          onPress={() => {
            onThemeChange(themeOption.id)
          }}
        >
          {themeOption.label}
        </Button>
      ))}
    </Card.Content>
  )
}
