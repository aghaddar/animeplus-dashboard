"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { userApi, type User } from "@/lib/api-client"
import { watchlistApi } from "@/lib/api-client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Search, Bookmark, Users } from "lucide-react"  // <-- Bookmark instead of BookmarkIcon


export default function WatchlistsPage() {
  const { token } = useAuth()
  const { toast } = useToast()
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchUsers()
  }, [token])

  const fetchUsers = async () => {
    if (!token) return

    setIsLoading(true)
    try {
      const data = await userApi.getUsers(token)
      // fetch all watchlists once to show counts per user
      try {
        const all = await watchlistApi.getAllWatchlists(token)
        const counts = all.reduce<Record<number, number>>((acc, item) => {
          acc[item.user_id] = (acc[item.user_id] || 0) + 1
          return acc
        }, {})
        // attach count to user objects in a lightweight way
        const usersWithCounts = data.map((u) => ({ ...u, watchlistCount: counts[u.id] || 0 }))
        setUsers(usersWithCounts as any)
      } catch (e) {
        setUsers(data)
      }
    } catch (error) {
      console.error("Failed to fetch users:", error)
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">User Watchlists</h1>
        <p className="text-muted-foreground">View and manage user watchlists</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>Users</span>
            </CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <CardDescription>Select a user to view their watchlist</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredUsers.length === 0 ? (
                <div className="col-span-full flex h-40 flex-col items-center justify-center text-center">
                  <Users className="mb-2 h-10 w-10 text-muted-foreground" />
                  <h3 className="text-lg font-medium">No users found</h3>
                  <p className="text-sm text-muted-foreground">Try adjusting your search query</p>
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <Link href={`/dashboard/watchlists/${user.id}`} key={user.id}>
                    <Card className="cursor-pointer transition-all hover:shadow-md">
                      <CardContent className="flex items-center gap-4 p-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.profile_url || ""} alt={user.username} />
                          <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                          <h3 className="font-medium">{user.username}</h3>
                          <p className="truncate text-sm text-muted-foreground">{user.email}</p>
                          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                            <Bookmark className="h-3 w-3" />
                            <span>View Watchlist</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
