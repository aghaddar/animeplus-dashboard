"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { userApi, watchlistApi, type User, type Watchlist } from "@/lib/api-client"
import { dashboardService } from "@/lib/dashboard-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Loader2, ArrowLeft, BookmarkIcon, Film } from "lucide-react"

export default function UserWatchlistPage() {
  const params = useParams()
  const router = useRouter()
  const { token } = useAuth()
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const [watchlist, setWatchlist] = useState<Watchlist[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const userId = params.userId as string

  useEffect(() => {
    if (token && userId) {
      fetchUserAndWatchlist()
    }
  }, [token, userId])

  const fetchUserAndWatchlist = async () => {
    setIsLoading(true)
    try {
      // Fetch user details
      const userData = await userApi.getUserById(token!, Number.parseInt(userId))
      setUser(userData)

      // For now, we'll use the getAllWatchlists endpoint and filter by user ID
      // In a real implementation, you'd want a backend endpoint to get watchlist by user ID
      const allWatchlists = await watchlistApi.getAllWatchlists(token!)
      const userWatchlist = allWatchlists.filter((item) => item.user_id === Number.parseInt(userId))
      // enrich
      const enriched = await Promise.all(
        userWatchlist.map(async (item) => {
          const meta = await dashboardService.getAnimeMeta(item.anime_title)
          return {
            ...item,
            img_url: item.img_url || meta?.image || item.img_url,
            anime_title: meta?.title || item.anime_title,
          }
        }),
      )
      setWatchlist(enriched)
    } catch (error) {
      console.error("Failed to fetch data:", error)
      toast({
        title: "Error",
        description: "Failed to load user watchlist",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="container mx-auto py-6">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Users
      </Button>

      {isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {user && (
            <div className="mb-8">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.profile_url || ""} alt={user.username} />
                  <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">{user.username}'s Watchlist</h1>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BookmarkIcon className="h-5 w-5" />
                  <span>Watchlist</span>
                </CardTitle>
              </div>
              <CardDescription>
                {watchlist.length} {watchlist.length === 1 ? "anime" : "animes"} in watchlist
              </CardDescription>
            </CardHeader>
            <CardContent>
              {watchlist.length === 0 ? (
                <div className="flex h-40 flex-col items-center justify-center text-center">
                  <Film className="mb-2 h-10 w-10 text-muted-foreground" />
                  <h3 className="text-lg font-medium">No anime in watchlist</h3>
                  <p className="text-sm text-muted-foreground">
                    This user hasn't added any anime to their watchlist yet
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {watchlist.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="relative aspect-[3/4] w-full">
                        <img
                          src={item.img_url || "/placeholder.svg?height=300&width=225&query=anime"}
                          alt={item.anime_title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="line-clamp-1 text-lg font-semibold">{item.anime_title}</h3>
                        <div className="mt-1 flex items-center">
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            {item.anime_type}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
