"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { getStoredTheme, saveTheme, THEMES, type ThemeName } from "@/lib/themes"

function ThemeSelector() {
  const [activeTheme, setActiveTheme] = useState<ThemeName>("default")

  useEffect(() => {
    setActiveTheme(getStoredTheme())
  }, [])

  function handleSelect(themeName: ThemeName) {
    setActiveTheme(themeName)
    saveTheme(themeName)
    window.dispatchEvent(new CustomEvent("theme-updated", { detail: { name: themeName } }))
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Object.entries(THEMES).map(([name, theme]) => {
        const themeKey = name as ThemeName
        const isActive = themeKey === activeTheme

        return (
          <button
            key={themeKey}
            type="button"
            onClick={() => handleSelect(themeKey)}
            className={cn(
              "group flex h-full flex-col justify-between rounded-2xl border border-border/70 bg-card/80 p-4 text-left shadow-[0_12px_28px_rgba(15,23,42,0.06)] backdrop-blur transition",
              isActive ? "border-primary/60 ring-2 ring-primary/20" : "hover:border-border",
            )}
            aria-pressed={isActive}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">{theme.label}</p>
                <span
                  className={cn(
                    "rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]",
                    isActive ? "bg-primary/10 text-primary" : "bg-muted/40 text-muted-foreground",
                  )}
                >
                  {isActive ? "Activo" : "Elegir"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{theme.description}</p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              {theme.swatches.map((color) => (
                <span
                  key={color}
                  className="h-6 w-6 rounded-full border border-border/60"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </button>
        )
      })}
    </div>
  )
}

export default ThemeSelector
