"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useEffect, useState } from "react";
import { useAppearance } from "@/components/appearance-provider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export function AppearanceSettings() {
	const { theme, setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const { accentColor, setAccentColor, fontSize, setFontSize, compactMode, setCompactMode, animations, setAnimations } = useAppearance();

	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	return (
		<div className="space-y-4">
			{/* Theme */}
			<div className="rounded-xl border bg-card/50 backdrop-blur-sm p-4 space-y-3">
				<h2 className="font-semibold text-sm mb-1">Theme</h2>
				<RadioGroup value={theme} onValueChange={setTheme}>
					<div className="grid gap-2">
						<label className="flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer hover:bg-accent/50 transition-colors">
							<RadioGroupItem value="light" id="theme-light" />
							<Sun className="h-4 w-4 text-muted-foreground" />
							<div>
								<p className="text-sm font-medium">Light</p>
								<p className="text-xs text-muted-foreground">White backgrounds</p>
							</div>
						</label>
						<label className="flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer hover:bg-accent/50 transition-colors">
							<RadioGroupItem value="dark" id="theme-dark" />
							<Moon className="h-4 w-4 text-muted-foreground" />
							<div>
								<p className="text-sm font-medium">Dark</p>
								<p className="text-xs text-muted-foreground">Black backgrounds</p>
							</div>
						</label>
						<label className="flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer hover:bg-accent/50 transition-colors">
							<RadioGroupItem value="system" id="theme-system" />
							<Monitor className="h-4 w-4 text-muted-foreground" />
							<div>
								<p className="text-sm font-medium">System</p>
								<p className="text-xs text-muted-foreground">Auto-detect</p>
							</div>
						</label>
					</div>
				</RadioGroup>

				<div className="mt-2 p-3 rounded-lg bg-muted/50 border">
					<p className="text-xs text-muted-foreground">Current: <span className="font-medium">{resolvedTheme === "dark" ? "Dark" : "Light"}</span></p>
				</div>
			</div>

			{/* Display */}
			<div className="rounded-xl border bg-card/50 backdrop-blur-sm p-4 space-y-3">
				<h2 className="font-semibold text-sm mb-1">Display Preferences</h2>

				<div className="flex items-center justify-between">
					<Label htmlFor="accent" className="text-sm">Accent Color</Label>
					<Select value={accentColor} onValueChange={setAccentColor}>
						<SelectTrigger className="w-[140px] h-9"><SelectValue /></SelectTrigger>
						<SelectContent>
							<SelectItem value="blue"><div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-blue-500" /> Blue</div></SelectItem>
							<SelectItem value="green"><div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-green-500" /> Green</div></SelectItem>
							<SelectItem value="purple"><div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-purple-500" /> Purple</div></SelectItem>
							<SelectItem value="red"><div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-red-500" /> Red</div></SelectItem>
							<SelectItem value="orange"><div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-orange-500" /> Orange</div></SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="flex items-center justify-between">
					<Label htmlFor="font-size" className="text-sm">Font Size</Label>
					<Select value={fontSize} onValueChange={setFontSize}>
						<SelectTrigger className="w-[120px] h-9"><SelectValue /></SelectTrigger>
						<SelectContent><SelectItem value="small">Small</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="large">Large</SelectItem></SelectContent>
					</Select>
				</div>

				<div className="flex items-center justify-between">
					<Label htmlFor="compact" className="text-sm">Compact Mode</Label>
					<Switch id="compact" checked={compactMode} onCheckedChange={setCompactMode} />
				</div>

				<div className="flex items-center justify-between">
					<Label htmlFor="animations" className="text-sm">Animations</Label>
					<Switch id="animations" checked={animations} onCheckedChange={setAnimations} />
				</div>
			</div>

			{/* Preview */}
			<div className="rounded-xl border bg-card/50 backdrop-blur-sm p-4 space-y-3">
				<h2 className="font-semibold text-sm mb-1">Preview</h2>
				<div className="flex gap-2">
					<Button size="sm" className="bg-gradient-to-r from-red-500 to-pink-500">Primary</Button>
					<Button size="sm" variant="outline">Secondary</Button>
				</div>
				<div className="rounded-lg border p-3 bg-muted/30">
					<h3 className="text-sm font-medium mb-1">Sample Card</h3>
					<p className="text-xs text-muted-foreground">Content preview with current settings</p>
				</div>
			</div>
		</div>
	);
}
