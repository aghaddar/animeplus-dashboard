"use client"

import { useEffect, useState } from "react"
import { Notifications } from "@/components/notifications"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { Sidebar } from "@/components/sidebar"

export function DashboardHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <>
      <div className="border-b">
        <div className="flex h-12 items-center px-3 md:h-16 md:px-4">
          <div className="flex items-center w-full">
            <button
              className="mr-2 inline-flex items-center rounded-md p-1.5 text-muted-foreground hover:bg-accent lg:hidden"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <svg className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
            <div className="ml-auto hidden lg:flex lg:items-center lg:space-x-3 md:space-x-4">
              <Notifications />
              <ThemeToggle />
              <UserNav />
            </div>
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setMobileOpen(false)} />
          <Sidebar mobile onClose={() => setMobileOpen(false)} />
        </div>
      ) : null}
    </>
  )
}

export default DashboardHeader
