"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { dashboardService } from "@/lib/dashboard-service"
import { Search, Edit, Trash2, Filter, ArrowUpDown, Eye } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ContentPage() {
  const [topAnime, setTopAnime] = useState<any[]>([])
  const [animeList, setAnimeList] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchContentData() {
      try {
        const [topAnimeData, animeListData] = await Promise.all([
          dashboardService.getTopAnime(),
          dashboardService.getAnimeList(),
        ])

        setTopAnime(topAnimeData)
        setAnimeList(animeListData)
      } catch (error) {
        console.error("Error fetching content data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchContentData()
  }, [])

  const filteredAnime = animeList.filter((anime) => anime.title.toLowerCase().includes(searchQuery.toLowerCase()))

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
        <p className="text-muted-foreground">Monitor and manage anime content across your platform</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="library">Library</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="card-hover overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
              <CardTitle>Top Anime</CardTitle>
              <CardDescription>Most viewed anime this month</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {topAnime.map((anime, index) => (
                  <div key={anime.id} className="flex items-center p-4 transition-colors hover:bg-muted/50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {index + 1}
                    </div>
                    <div className="ml-4 w-12 h-12 rounded-md overflow-hidden">
                      <img
                        src={anime.image || "/placeholder.svg"}
                        alt={anime.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                      <p className="font-medium truncate">{anime.title}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Eye className="mr-1 h-3.5 w-3.5" />
                        <span>{anime.views.toLocaleString()} views</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50">
                        {anime.rating}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="library" className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search anime..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-[200px] lg:w-[300px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8">
                <ArrowUpDown className="mr-2 h-3.5 w-3.5" />
                Sort
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Episodes</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Added Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAnime.map((anime) => (
                    <TableRow key={anime.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded overflow-hidden mr-2">
                            <img
                              src={anime.image || "/placeholder.svg"}
                              alt={anime.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {anime.title}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            anime.status === "Ongoing"
                              ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                              : "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                          }
                        >
                          {anime.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{anime.episodes}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="font-medium">{anime.rating}</span>
                          <span className="ml-1 text-yellow-500">★</span>
                        </div>
                      </TableCell>
                      <TableCell>{anime.views.toLocaleString()}</TableCell>
                      <TableCell>{anime.addedDate}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
