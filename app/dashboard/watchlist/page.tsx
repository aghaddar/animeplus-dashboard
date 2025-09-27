"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { watchlistApi, type Watchlist } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Plus, Search, Trash2, Film } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function WatchlistPage() {
  const { token } = useAuth()
  const { toast } = useToast()
  const [watchlists, setWatchlists] = useState<Watchlist[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedWatchlist, setSelectedWatchlist] = useState<Watchlist | null>(null)

  // Form state for adding anime to watchlist
  const [formData, setFormData] = useState({
    anime_title: "",
    img_url: "",
    anime_type: "TV",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchWatchlist()
  }, [token])

  const fetchWatchlist = async () => {
    if (!token) return

    setIsLoading(true)
    try {
      const data = await watchlistApi.getMyWatchlist(token)
      setWatchlists(data)
    } catch (error) {
      console.error("Failed to fetch watchlist:", error)
      toast({
        title: "Error",
        description: "Failed to load watchlist",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddAnime = async () => {
    if (!token) return

    setIsSubmitting(true)
    try {
      await watchlistApi.addAnimeToWatchlist(token, formData.anime_title, formData.img_url, formData.anime_type)
      toast({
        title: "Success",
        description: "Anime added to watchlist",
      })
      setIsAddDialogOpen(false)
      resetForm()
      fetchWatchlist()
    } catch (error) {
      console.error("Failed to add anime:", error)
      toast({
        title: "Error",
        description: "Failed to add anime to watchlist",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRemoveAnime = async () => {
    if (!token || !selectedWatchlist) return

    setIsSubmitting(true)
    try {
      await watchlistApi.removeAnimeFromWatchlist(token, selectedWatchlist.anime_title)
      toast({
        title: "Success",
        description: "Anime removed from watchlist",
      })
      setIsDeleteDialogOpen(false)
      fetchWatchlist()
    } catch (error) {
      console.error("Failed to remove anime:", error)
      toast({
        title: "Error",
        description: "Failed to remove anime from watchlist",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      anime_title: "",
      img_url: "",
      anime_type: "TV",
    })
    setSelectedWatchlist(null)
  }

  const openDeleteDialog = (watchlist: Watchlist) => {
    setSelectedWatchlist(watchlist)
    setIsDeleteDialogOpen(true)
  }

  const filteredWatchlists = watchlists.filter(
    (watchlist) =>
      watchlist.anime_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      watchlist.anime_type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Watchlist</h1>
          <p className="text-muted-foreground">Manage your anime watchlist</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Anime
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>My Watchlist</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search anime..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <CardDescription>{filteredWatchlists.length} anime in your watchlist</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredWatchlists.length === 0 ? (
                <div className="col-span-full flex h-40 flex-col items-center justify-center text-center">
                  <Film className="mb-2 h-10 w-10 text-muted-foreground" />
                  <h3 className="text-lg font-medium">No anime in watchlist</h3>
                  <p className="text-sm text-muted-foreground">Add some anime to your watchlist to see them here</p>
                </div>
              ) : (
                filteredWatchlists.map((watchlist) => (
                  <Card key={watchlist.id} className="overflow-hidden">
                    <div className="relative aspect-[3/4] w-full">
                      <img
                        src={watchlist.img_url || "/placeholder.svg?height=300&width=225&query=anime"}
                        alt={watchlist.anime_title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute right-2 top-2">
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-muted/50 hover:bg-red-600"
                          onClick={() => openDeleteDialog(watchlist)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="line-clamp-1 text-lg font-semibold">{watchlist.anime_title}</h3>
                      <div className="mt-1 flex items-center">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                          {watchlist.anime_type}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Anime Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Anime to Watchlist</DialogTitle>
            <DialogDescription>Add a new anime to your watchlist</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="anime-title">Anime Title</Label>
              <Input
                id="anime-title"
                value={formData.anime_title}
                onChange={(e) => setFormData({ ...formData, anime_title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="img-url">Image URL</Label>
              <Input
                id="img-url"
                value={formData.img_url}
                onChange={(e) => setFormData({ ...formData, img_url: e.target.value })}
                placeholder="https://example.com/anime.jpg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="anime-type">Type</Label>
              <Select
                value={formData.anime_type}
                onValueChange={(value) => setFormData({ ...formData, anime_type: value })}
              >
                <SelectTrigger id="anime-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TV">TV</SelectItem>
                  <SelectItem value="Movie">Movie</SelectItem>
                  <SelectItem value="OVA">OVA</SelectItem>
                  <SelectItem value="Special">Special</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddAnime} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add to Watchlist"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Anime Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove from Watchlist</DialogTitle>
            <DialogDescription>Are you sure you want to remove this anime from your watchlist?</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedWatchlist && (
              <div className="flex items-center gap-4">
                <img
                  src={selectedWatchlist.img_url || "/placeholder.svg?height=80&width=60&query=anime"}
                  alt={selectedWatchlist.anime_title}
                  className="h-20 w-16 rounded-md object-cover"
                />
                <div>
                  <p className="font-medium">{selectedWatchlist.anime_title}</p>
                  <p className="text-sm text-muted-foreground">{selectedWatchlist.anime_type}</p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRemoveAnime} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Removing...
                </>
              ) : (
                "Remove"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
