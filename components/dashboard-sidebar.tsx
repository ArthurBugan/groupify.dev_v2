"use client"

import { Link } from "@tanstack/react-router"
import { useLocation } from '@tanstack/react-router'
import { LayoutDashboard, FolderKanban, Youtube, Settings, Menu, Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function DashboardSidebar() {
  const pathname = useLocation({
    select: (location) => location.pathname,
  })
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const routes = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Groups",
      href: "/dashboard/groups",
      icon: FolderKanban,
    },
    {
      name: "Channels",
      href: "/dashboard/channels",
      icon: Youtube,
    },
    {
      name: "Settings",
      href: "/dashboard/settings/account",
      icon: Settings,
    },
  ]

  const NavItems = () => {
    return (
      <>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Groupify</h2>
          <div className="space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                to={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === route.href ? "bg-accent text-accent-foreground" : "transparent",
                )}
              >
                <route.icon className="h-5 w-5" />
                {route.name}
              </Link>
            ))}
          </div>

          {mounted && (
            <div className="mt-4 px-4">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              >
                {resolvedTheme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                {resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
              </Button>
            </div>
          )}
        </div>
      </>
    )
  }

  return (
    <>
      {/* Mobile Navigation */}
      <div className="fixed top-0 left-0 right-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <NavItems />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Groupify</h1>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden w-64 flex-col border-r bg-background md:flex">
        <div className="flex flex-col gap-2">
          <NavItems />
        </div>
      </div>
    </>
  )
}
