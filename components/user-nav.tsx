"use client"

import { useAuth } from "@/context/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

export function UserNav() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [isGuest, setIsGuest] = useState(false)
  const [mounted, setMounted] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  // Read isGuest from localStorage only on the client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
    try {
      const guest = localStorage.getItem("isGuest") === "true"
      setIsGuest(guest)
    } catch (e) {
      setIsGuest(false)
    }
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.profile_url || ""} alt={user?.username || "User"} />
            <AvatarFallback>{user?.username ? getInitials(user.username) : "U"}</AvatarFallback>
          </Avatar>
          {mounted && isGuest && (
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-[8px] text-white font-bold">G</span>
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium leading-none">{user?.username || "User"}</p>
              {mounted && isGuest && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium">
                  Guest
                </span>
              )}
            </div>
            <p className="text-xs leading-none text-muted-foreground">{user?.email || "user@example.com"}</p>
            {mounted && isGuest && (
              <p className="text-xs text-blue-600 font-medium">Full Admin Access</p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
