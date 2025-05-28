import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AppearanceProvider } from "@/components/appearance-provider"
import { LanguageProvider } from "@/components/language-provider"
import { cookies } from "next/headers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "YouTube Group Manager",
  description: "Manage your YouTube channel groups",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const appearanceSettings = cookieStore.get("appearance-settings")?.value

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="youtube-dashboard-theme"
        >
          <AppearanceProvider initialSettings={appearanceSettings}>
            <LanguageProvider>{children}</LanguageProvider>
          </AppearanceProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
