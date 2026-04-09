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
import { AnalyticsListener } from "@/hooks/analytics-listener";
import rybbit from "@rybbit/js";

if (typeof window !== "undefined") {
	await rybbit.init({
	  analyticsHost: "https://rybbit.groupify.dev/api",
	  siteId: "5bd1e2c51d8f",
	  replayPrivacyConfig: {
		maskAllInputs: true, // Mask all input values (default: true)
		maskTextSelectors: [
		  ".sensitive-data",  // Mask text in elements with this class
		  "#credit-card"      // Mask specific element IDs
		]
	  }
	});
}

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
