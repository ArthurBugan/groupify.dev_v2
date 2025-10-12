// vite.config.ts
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";
import tsconfigPaths from "vite-tsconfig-paths";
import { nitroV2Plugin } from '@tanstack/nitro-v2-vite-plugin'

export default defineConfig({
	// server: {
		// host: '0.0.0.0',
		// cors: true,
		// proxy: {
		// 	"/api": {
		// 		target: "http://localhost:3001",
		// 		changeOrigin: true,
		// 		secure: false,
		// 		rewrite: (path) => path.replace(/^\/api/, ""),
		// 	},
		// },
	// 	allowedHosts: true,
	// 	port: 3000,
	// },
	plugins: [
		// Enables Vite to resolve imports using path aliases.
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
		nitroV2Plugin({ preset: 'bun' }),
		tailwindcss(),
		react(),
	],
});
