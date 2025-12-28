// vite.config.ts
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nitroV2Plugin } from "@tanstack/nitro-v2-vite-plugin";
import contentCollections from "@content-collections/vite";
import sitemapPlugin from "vite-plugin-tanstack-router-sitemap";

export default defineConfig({
	server: {
		host: "0.0.0.0",
		cors: true,
		proxy: {
			"/api": {
				target: "http://localhost:3001",
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
		nitroV2Plugin({ preset: "bun" }) as any,
		tsconfigPaths({
			projects: ["./tsconfig.json"],
		}),
		contentCollections(),
		tanstackStart({
			target: "bun",
			customViteReactPlugin: true,
			autoCodeSplitting: true,
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
