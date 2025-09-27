"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, FilmIcon, LayoutDashboard, Settings, Users, HelpCircle, BookmarkIcon } from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    color: "text-blue-500",
  },
  {
    title: "Content",
    href: "/dashboard/content",
    icon: FilmIcon,
    color: "text-purple-500",
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
    color: "text-green-500",
  },
  {
    title: "Watchlists",
    href: "/dashboard/watchlists",
    icon: BookmarkIcon,
    color: "text-amber-500",
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    color: "text-orange-500",
    disabled: true,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    color: "text-gray-500",
  },
]

const secondarySidebarItems = [
  {
    title: "Help & Support",
    href: "/dashboard/help",
    icon: HelpCircle,
    color: "text-teal-500",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
  <aside data-sidebar="root" className="hidden w-64 min-w-0 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:block overflow-y-auto sticky top-0 h-screen self-start">
    <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
              <FilmIcon className="h-4 w-4 text-primary" />
            </div>
            <span className="text-lg">
              <span className="gradient-text font-bold">Anime</span>Admin
            </span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground">Main</h2>
              <div className="space-y-1">
                {sidebarItems.map((item) => {
                  if (item.disabled) {
                    return (
                      <div
                        key={item.href}
                        className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground opacity-70"
                      >
                        <item.icon className={cn("h-4 w-4", item.color)} />
                        <span>{item.title}</span>
                        <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs">Soon</span>
                      </div>
                    )
                  }

                  const isActive = pathname === item.href
                  const isDashboard = item.title === "Dashboard"
                  const isContent = item.title === "Content"
                  const isUsers = item.title === "Users"
                  const isWatchlists = item.title === "Watchlists"
                  const isSettings = item.title === "Settings"
                  const baseClasses = "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
                  const hoverClasses = isDashboard
                    ? "hover:bg-blue-600 hover:text-white"
                    : isContent
                    ? "hover:bg-purple-600 hover:text-white"
                    : isUsers
                    ? "hover:bg-green-600 hover:text-white"
                    : isWatchlists
                    ? "hover:bg-amber-600 hover:text-white"
                    : isSettings
                    ? "hover:bg-gray-600 hover:text-white"
                    : "hover:bg-accent hover:text-accent-foreground"
                  const activeClasses = isDashboard
                    ? "bg-blue-600 text-white"
                    : isContent
                    ? "bg-purple-600 text-white"
                    : isUsers
                    ? "bg-green-600 text-white"
                    : isWatchlists
                    ? "bg-amber-600 text-white"
                    : isSettings
                    ? "bg-gray-600 text-white"
                    : "bg-accent text-accent-foreground"

                  const iconColor = isActive ? "text-white" : item.color
                  const iconHover = isDashboard || isContent || isUsers || isWatchlists || isSettings ? "group-hover:text-white" : "group-hover:text-accent-foreground"

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        baseClasses,
                        hoverClasses,
                        isActive ? activeClasses : "transparent",
                      )}
                    >
                      <item.icon className={cn("h-4 w-4", iconColor, iconHover)} />
                      <span>{item.title}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground">Support</h2>
              <div className="space-y-1">
                {secondarySidebarItems.map((item) => {
                  const isActive = pathname === item.href
                  const isHelp = item.title === "Help & Support"
                  const hoverClasses = isHelp ? "hover:bg-teal-600 hover:text-white" : "hover:bg-accent hover:text-accent-foreground"
                  const activeClasses = isHelp ? "bg-teal-600 text-white" : "bg-accent text-accent-foreground"

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        hoverClasses,
                        isActive ? activeClasses : "transparent",
                      )}
                    >
                      <item.icon className={cn("h-4 w-4", item.color, isHelp ? "group-hover:text-white" : "")} />
                      <span>{item.title}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <div className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
            <h3 className="mb-2 font-medium">Need help?</h3>
            <p className="mb-3 text-xs text-blue-100">Check our documentation for quick answers to common questions.</p>
            <Link
              href="/dashboard/help"
              className="inline-flex items-center justify-center rounded-md bg-card px-3 py-1.5 text-xs font-medium text-blue-600 shadow-sm hover:bg-blue-50"
            >
              View Docs
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
}
