"use client";

import { useTheme } from "next-themes";
import * as React from "react";

type AccentColor = "blue" | "green" | "purple" | "red" | "orange";
type FontSize = "small" | "medium" | "large";

interface AppearanceSettings {
	accentColor: AccentColor;
	fontSize: FontSize;
	compactMode: boolean;
	animations: boolean;
}

interface AppearanceContextType extends AppearanceSettings {
	setAccentColor: (color: AccentColor) => void;
	setFontSize: (size: FontSize) => void;
	setCompactMode: (compact: boolean) => void;
	setAnimations: (enabled: boolean) => void;
}

const AppearanceContext = React.createContext<
	AppearanceContextType | undefined
>(undefined);

export function useAppearance() {
	const context = React.useContext(AppearanceContext);
	if (!context) {
		throw new Error("useAppearance must be used within an AppearanceProvider");
	}
	return context;
}

interface AppearanceProviderProps {
	children: React.ReactNode;
	initialSettings?: string;
}

const defaultSettings: AppearanceSettings = {
	accentColor: "blue",
	fontSize: "medium",
	compactMode: false,
	animations: true,
};

const accentColors = {
	blue: {
		light: "221.2 83.2% 53.3%",
		dark: "217.2 91.2% 59.8%",
	},
	green: {
		light: "142.1 76.2% 36.3%",
		dark: "142.1 70.6% 45.3%",
	},
	purple: {
		light: "262.1 83.3% 57.8%",
		dark: "263.4 70% 50.4%",
	},
	red: {
		light: "0 84.2% 60.2%",
		dark: "0 72.2% 50.6%",
	},
	orange: {
		light: "24.6 95% 53.1%",
		dark: "20.5 90.2% 48.2%",
	},
};

export function AppearanceProvider({
	children,
	initialSettings,
}: AppearanceProviderProps) {
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);
	const [settings, setSettings] = React.useState<AppearanceSettings>(() => {
		if (typeof window !== "undefined") {
			// Try to load from localStorage first
			const saved = localStorage.getItem("appearance-settings");
			if (saved) {
				try {
					return JSON.parse(saved);
				} catch {
					// Fall through to other options
				}
			}
		}

		if (initialSettings) {
			try {
				return JSON.parse(initialSettings);
			} catch {
				return defaultSettings;
			}
		}
		return defaultSettings;
	});

	// Ensure client-side only operations
	React.useEffect(() => {
		setMounted(true);
	}, []);

	// Apply settings to document
	React.useEffect(() => {
		if (!mounted) return;

		const root = document.documentElement;

		// Apply accent color based on resolved theme
		const isDark = resolvedTheme === "dark";
		const accentColorValue = isDark
			? accentColors[settings.accentColor].dark
			: accentColors[settings.accentColor].light;

		// Set both primary and primary-foreground for better compatibility
		root.style.setProperty("--primary", accentColorValue);
		root.style.setProperty(
			"--primary-foreground",
			isDark ? "210 40% 98%" : "210 40% 2%",
		);

		// Apply font size
		const fontSizeMap = {
			small: "14px",
			medium: "16px",
			large: "18px",
		};
		root.style.setProperty("--base-font-size", fontSizeMap[settings.fontSize]);
		root.classList.remove(
			"font-size-small",
			"font-size-medium",
			"font-size-large",
		);
		root.classList.add(`font-size-${settings.fontSize}`);

		// Apply compact mode
		if (settings.compactMode) {
			root.classList.add("compact-mode");
		} else {
			root.classList.remove("compact-mode");
		}

		// Apply animations
		if (!settings.animations) {
			root.classList.add("no-animations");
		} else {
			root.classList.remove("no-animations");
		}

		// Save to localStorage and cookie for persistence
		if (typeof window !== "undefined") {
			localStorage.setItem("appearance-settings", JSON.stringify(settings));
		}
		document.cookie = `appearance-settings=${JSON.stringify(settings)}; path=/; max-age=${60 * 60 * 24 * 365}`;
	}, [settings, resolvedTheme, mounted]);

	const contextValue: AppearanceContextType = {
		...settings,
		setAccentColor: (color) =>
			setSettings((prev) => ({ ...prev, accentColor: color })),
		setFontSize: (size) => setSettings((prev) => ({ ...prev, fontSize: size })),
		setCompactMode: (compact) =>
			setSettings((prev) => ({ ...prev, compactMode: compact })),
		setAnimations: (enabled) =>
			setSettings((prev) => ({ ...prev, animations: enabled })),
	};

	return (
		<AppearanceContext.Provider value={contextValue}>
			{children}
		</AppearanceContext.Provider>
	);
}
