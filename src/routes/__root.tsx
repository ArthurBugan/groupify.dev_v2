// src/routes/__root.tsx
/// <reference types="vite/client" />

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	retainSearchParams,
	Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AppearanceProvider } from "@/components/appearance-provider";
import { LanguageProvider } from "@/components/language-provider";
import { NotFound } from "@/components/not-found";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { queryClient } from "@/hooks/utils/queryClient";
import appCss from "@/styles/app.css?url";
import posthog from "posthog-js";
import HyperDX from '@hyperdx/browser';
import { AnalyticsListener } from "@/hooks/analytics-listener";

const PUBLIC_POST_HOG_ID = import.meta.env.VITE_POST_HOG_ID;
const PUBLIC_HYPER_DX_ID = import.meta.env.VITE_HYPER_DX_ID;
const PUBLIC_HYPER_DX_URL = import.meta.env.VITE_HYPER_DX_URL;
const NODE_ENV = import.meta.env.MODE;

if (
	NODE_ENV === "production" &&
	PUBLIC_POST_HOG_ID
) {
	posthog.init(PUBLIC_POST_HOG_ID, {
		api_host: "https://app.posthog.com",
	});
}

// if (
// 	NODE_ENV === "production" &&
// 	PUBLIC_HYPER_DX_ID
// ) {
// 	HyperDX.init({
// 		url: PUBLIC_HYPER_DX_URL,
// 		apiKey: PUBLIC_HYPER_DX_ID,
// 		service: 'groupify-web',
// 		tracePropagationTargets: [/coolify.groupify.dev/i], // Set to link traces from frontend to backend requests
// 		consoleCapture: true, // Capture console logs (default false)
// 		advancedNetworkCapture: true, // Capture full HTTP request/response headers and bodies (default false)
// 	});
// }

export const Route = createRootRoute({
	notFoundComponent: () => <NotFound />,
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Groupify - Group youtube subscriptions",
			},
		],
		links: [{ rel: "stylesheet", href: appCss }],
	}),
	search: {
		middlewares: [retainSearchParams(["rootValue"])],
	},
	component: RootComponent,
});

function RootComponent() {
	return (
		<LanguageProvider>
			<QueryClientProvider client={queryClient}>
				<RootDocument>
					<Outlet />
					<AnalyticsListener />
					<ReactQueryDevtools initialIsOpen={true} />
					<Toaster richColors />
				</RootDocument>
			</QueryClientProvider>
		</LanguageProvider>
	);
}
function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<head>
				<HeadContent />
				<script
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4077364511521347"
					crossOrigin="anonymous"
				></script>
			</head>
			<body>
				<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TZ924QCW" title="Google Tag Manager"
				height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<AppearanceProvider>
						{children}
					</AppearanceProvider>
				</ThemeProvider>
				{/** biome-ignore lint/correctness/useUniqueElementIds: <implement gtm> */}
				<script id="gtm">
					{`
					(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
					new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
					j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
					'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
					})(window,document,'script','dataLayer','GTM-TZ924QCW');
				`}
				</script>
				<script async src="https://www.googletagmanager.com/gtag/js?id=G-D7BS3V6VJF"></script>
				<script>
					{`
					window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-D7BS3V6VJF');
					`}
				</script>
				<Scripts />
			</body>
		</html>
	);
}
