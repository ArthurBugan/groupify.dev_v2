// src/routes/__root.tsx
/// <reference types="vite/client" />
import type { ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import appCss from "../styles/app.css?url";
import { LanguageProvider } from "@/components/language-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/hooks/utils/queryClient";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from "@/components/theme-provider";
import { NotFound } from "@/components/not-found";
import { AppearanceProvider } from "@/components/appearance-provider";

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
  component: RootComponent,
});

function RootComponent() {
  return (
    <LanguageProvider>
      <AppearanceProvider>
        <QueryClientProvider client={queryClient}>
          <RootDocument>
            <Outlet />
            <ReactQueryDevtools initialIsOpen={true} />
          </RootDocument>
        </QueryClientProvider>
      </AppearanceProvider>
    </LanguageProvider>
  );
}
function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
