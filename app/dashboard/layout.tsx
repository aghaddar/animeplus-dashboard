import type React from "react"
import { Suspense } from "react"
import { Sidebar } from "@/components/sidebar"
import DashboardHeader from "@/components/dashboard-header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 flex min-w-0">
        <Suspense fallback={<div>Loading...</div>}>
          <Sidebar />
        </Suspense>
        <main className="flex-1 p-4 md:p-6 min-w-0">{children}</main>
      </div>
    </div>
  )
}
