"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { useAppearance } from "@/components/appearance-provider"

export function AppearanceSettings() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { accentColor, setAccentColor, fontSize, setFontSize, compactMode, setCompactMode, animations, setAnimations } =
    useAppearance()

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Select your preferred theme for the dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={theme} onValueChange={setTheme}>
            <div className="grid gap-4">
              <div className="flex items-center space-x-3 space-y-0">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light" className="flex items-center gap-3 cursor-pointer">
                  <Sun className="h-4 w-4" />
                  <div>
                    <p className="font-medium">Light</p>
                    <p className="text-sm text-muted-foreground">Light theme with white backgrounds</p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 space-y-0">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark" className="flex items-center gap-3 cursor-pointer">
                  <Moon className="h-4 w-4" />
                  <div>
                    <p className="font-medium">Dark</p>
                    <p className="text-sm text-muted-foreground">Dark theme with black backgrounds</p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 space-y-0">
                <RadioGroupItem value="system" id="system" />
                <Label htmlFor="system" className="flex items-center gap-3 cursor-pointer">
                  <Monitor className="h-4 w-4" />
                  <div>
                    <p className="font-medium">System</p>
                    <p className="text-sm text-muted-foreground">Automatically match your system theme</p>
                  </div>
                </Label>
              </div>
            </div>
          </RadioGroup>

          <div className="mt-4 p-4 rounded-lg border bg-muted/50">
            <p className="text-sm text-muted-foreground">
              Current theme: <span className="font-medium">{resolvedTheme === "dark" ? "Dark" : "Light"}</span>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Display Preferences</CardTitle>
          <CardDescription>Customize how the dashboard looks and feels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="accent-color">Accent Color</Label>
              <p className="text-sm text-muted-foreground">Choose your preferred accent color</p>
            </div>
            <Select value={accentColor} onValueChange={setAccentColor}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blue">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-blue-500" />
                    Blue
                  </div>
                </SelectItem>
                <SelectItem value="green">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-green-500" />
                    Green
                  </div>
                </SelectItem>
                <SelectItem value="purple">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-purple-500" />
                    Purple
                  </div>
                </SelectItem>
                <SelectItem value="red">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-red-500" />
                    Red
                  </div>
                </SelectItem>
                <SelectItem value="orange">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-orange-500" />
                    Orange
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="font-size">Font Size</Label>
              <p className="text-sm text-muted-foreground">Adjust the base font size</p>
            </div>
            <Select value={fontSize} onValueChange={setFontSize}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="compact-mode">Compact Mode</Label>
              <p className="text-sm text-muted-foreground">Reduce spacing and padding in the UI</p>
            </div>
            <Switch id="compact-mode" checked={compactMode} onCheckedChange={setCompactMode} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="animations">Enable Animations</Label>
              <p className="text-sm text-muted-foreground">Show smooth transitions and animations</p>
            </div>
            <Switch id="animations" checked={animations} onCheckedChange={setAnimations} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>See how your settings look</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Primary Button
              </button>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                Secondary Button
              </button>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold mb-2">Sample Card</h3>
              <p className="text-sm text-muted-foreground">
                This is how your content will look with the current settings.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
