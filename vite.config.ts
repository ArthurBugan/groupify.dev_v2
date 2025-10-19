// vite.config.ts
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";
import tsconfigPaths from "vite-tsconfig-paths";
import { nitroV2Plugin } from '@tanstack/nitro-v2-vite-plugin'

export default defineConfig({
	server: {
		host: '0.0.0.0',
		cors: true,
		proxy: {
			"/api": {
				target: "https://localhost",
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
		allowedHosts: true,
		port: 3000,
	},
	build: {
		cssCodeSplit: false,
		outDir: "./output",
		assetsDir: "assets",
	},
	plugins: [
		// Enables Vite to resolve imports using path aliases.
		nitroV2Plugin({ preset: 'bun' }),
		tsconfigPaths(),
		viteTsConfigPaths({
			projects: ["./tsconfig.json"],
		}),
		tanstackStart({
			target: "bun",
			customViteReactPlugin: true,
			tsr: {
				routeToken: "layout",
				target: "react",
				// Specifies the directory TanStack Router uses for your routes.
				routesDirectory: "src/routes", // Defaults to "src/routes"
			},
		}),
		tailwindcss(),
		react(),
	],
});
