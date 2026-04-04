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
import { OpenPanel } from '@openpanel/web';
import {Umami} from '@umami/node';

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

export const op = new OpenPanel({
	clientId: 'c203cf16-53ce-471a-94c6-d09b2f0e6bc9',
	trackScreenViews: true,
	trackOutgoingLinks: true,
	trackAttributes: true,
		sessionReplay: {
		enabled: true,
	},
	apiUrl: 'https://opapi.groupify.dev',
});

export const umamiClient = new Umami({
  websiteId: 'https://umami.groupify.dev/script.js', // Your website id
  hostUrl: 'https://umami.mywebsite.com' // URL to your Umami instance
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
