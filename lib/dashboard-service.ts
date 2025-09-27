// Mock data for dashboard
const mockAnalytics = {
  totalUsers: 12345,
  activeUsers: 4567,
  totalViews: 1200000,
  totalContent: 2350,
  newUsersToday: 127,
  newContentThisWeek: 15,
  viewsGrowthRate: 18,
  averageWatchTime: 45,
  dailyActiveUsers: Array.from({ length: 30 }, (_, i) => {
    // Generate realistic data with weekend peaks
    const isWeekend = i % 7 === 5 || i % 7 === 6
    const baseValue = 2000 + i * 30 // Slight upward trend
    const randomVariation = Math.floor(Math.random() * 300) - 150
    const weekendBoost = isWeekend ? 500 : 0

    return {
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      users: baseValue + randomVariation + weekendBoost,
    }
  }),
  popularGenres: [
    { name: "Action", count: 35 },
    { name: "Romance", count: 28 },
    { name: "Comedy", count: 22 },
    { name: "Fantasy", count: 18 },
    { name: "Slice of Life", count: 12 },
  ],
  watchTimeDistribution: Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    views: Math.floor(Math.random() * 5000) + (i >= 18 || i <= 2 ? 8000 : 3000), // Peak during evening hours
  })),
}

// Mock top anime data
const mockTopAnime = [
  {
    id: "aot-final",
    title: "Attack on Titan: Final Season",
    image: "/armored-titan-battle.png",
    views: 1250000,
    rating: "9.8",
  },
  {
    id: "demon-slayer-entertainment",
    title: "Demon Slayer: Entertainment District Arc",
    image: "/demon-slayer-inspired.png",
    views: 980000,
    rating: "9.6",
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    image: "/jujutsu-kaisen-inspired.png",
    views: 870000,
    rating: "9.5",
  },
  {
    id: "one-piece-wano",
    title: "One Piece: Wano Arc",
    image: "/grand-line-adventure.png",
    views: 750000,
    rating: "9.4",
  },
  {
    id: "chainsaw-man",
    title: "Chainsaw Man",
    image: "/chainsaw-man-inspired.png",
    views: 720000,
    rating: "9.3",
  },
]

// Mock recent activity data
const mockRecentActivity = [
  {
    id: 1,
    user: "User 1",
    action: "watched",
    anime: "Attack on Titan",
    episode: "Episode 87",
    time: "5 minutes ago",
  },
  {
    id: 2,
    user: "User 2",
    action: "rated",
    anime: "Demon Slayer",
    rating: "9.5",
    time: "10 minutes ago",
  },
  {
    id: 3,
    user: "User 3",
    action: "commented on",
    anime: "Jujutsu Kaisen",
    comment: "This episode was amazing!",
    time: "15 minutes ago",
  },
  {
    id: 4,
    user: "User 4",
    action: "added to watchlist",
    anime: "Chainsaw Man",
    time: "25 minutes ago",
  },
  {
    id: 5,
    user: "User 5",
    action: "started watching",
    anime: "One Piece",
    time: "30 minutes ago",
  },
]

// Mock anime list data
const mockAnimeList = [
  {
    id: "aot-final",
    title: "Attack on Titan: Final Season",
    image: "/armored-titan-battle.png",
    status: "Completed",
    episodes: 16,
    rating: 9.8,
    views: 1250000,
    addedDate: "2022-01-15",
  },
  {
    id: "demon-slayer-entertainment",
    title: "Demon Slayer: Entertainment District Arc",
    image: "/demon-slayer-inspired.png",
    status: "Completed",
    episodes: 11,
    rating: 9.6,
    views: 980000,
    addedDate: "2022-02-20",
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    image: "/jujutsu-kaisen-inspired.png",
    status: "Ongoing",
    episodes: 24,
    rating: 9.5,
    views: 870000,
    addedDate: "2021-10-05",
  },
  {
    id: "one-piece-wano",
    title: "One Piece: Wano Arc",
    image: "/grand-line-adventure.png",
    status: "Ongoing",
    episodes: 150,
    rating: 9.4,
    views: 750000,
    addedDate: "2021-07-10",
  },
  {
    id: "chainsaw-man",
    title: "Chainsaw Man",
    image: "/chainsaw-man-inspired.png",
    status: "Ongoing",
    episodes: 12,
    rating: 9.3,
    views: 720000,
    addedDate: "2022-10-12",
  },
  {
    id: "spy-family",
    title: "Spy x Family",
    image: "/spy-x-family-manga-style.png",
    status: "Ongoing",
    episodes: 25,
    rating: 9.1,
    views: 680000,
    addedDate: "2022-04-18",
  },
  {
    id: "my-hero-academia-s6",
    title: "My Hero Academia Season 6",
    image: "/placeholder.svg?key=a9f4h",
    status: "Ongoing",
    episodes: 25,
    rating: 8.9,
    views: 620000,
    addedDate: "2022-10-01",
  },
  {
    id: "bleach-tybw",
    title: "Bleach: Thousand-Year Blood War",
    image: "/placeholder.svg?key=jajdx",
    status: "Ongoing",
    episodes: 13,
    rating: 9.2,
    views: 590000,
    addedDate: "2022-10-10",
  },
  {
    id: "mob-psycho-100-s3",
    title: "Mob Psycho 100 III",
    image: "/placeholder.svg?key=04z0t",
    status: "Completed",
    episodes: 12,
    rating: 9.0,
    views: 540000,
    addedDate: "2022-10-05",
  },
  {
    id: "cyberpunk-edgerunners",
    title: "Cyberpunk: Edgerunners",
    image: "/cyberpunk-cityscape.png",
    status: "Completed",
    episodes: 10,
    rating: 8.8,
    views: 510000,
    addedDate: "2022-09-13",
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const CONSUMET_BASE = process.env.NEXT_PUBLIC_CONSUMET_BASE || "https://api-consumet-nu.vercel.app"

async function fetchConsumet(path: string) {
  try {
    const res = await fetch(`${CONSUMET_BASE}${path}`)
    if (!res.ok) throw new Error(`Consumet responded with ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn("Consumet fetch failed:", err)
    throw err
  }
}

function mapConsumetAnime(item: any) {
  // Consumet /meta/anilist responses vary; map safely to the app's expected shape
  const titleObj = item.title || item.names || {}
  const title = titleObj.english || titleObj.romaji || titleObj.userPreferred || item.name || item.title
  const image = item.image || item.cover || item.coverImage || (item.images && item.images[0]) || "/placeholder.svg"
  const id = item.id || item._id || item.mal_id || title
  const status = item.status || item.type || (item.isAdult ? "Adult" : "Unknown")
  const episodes = item.totalEpisodes || item.episodes || item.episodeCount || item.episodesCount || null
  const rating = item.rating || item.score || item.averageScore || item.score || "—"
  const views = item.popularity || item.favourites || 0
  const addedDate = item.releaseDate || item.startDate || item.createdAt || null

  return {
    id,
    title,
    image,
    status,
    episodes,
    rating,
    views,
    addedDate,
  }
}

export const dashboardService = {
  getAnalytics: async () => {
    await delay(800)
    return mockAnalytics
  },

  // Try to pull top anime from Consumet, fall back to mock
  getTopAnime: async () => {
    try {
      const data = await fetchConsumet("/meta/anilist/popular?page=1")
      const results = data?.results || data?.data || data?.animes || []
      const mapped = (results as any[]).slice(0, 10).map(mapConsumetAnime)
      return mapped.length ? mapped : mockTopAnime
    } catch (e) {
      return mockTopAnime
    }
  },

  getRecentActivity: async () => {
    await delay(500)
    return mockRecentActivity
  },

  // Pull a larger anime list from Consumet, fall back to mock
  getAnimeList: async () => {
    try {
      const data = await fetchConsumet("/meta/anilist/popular?page=1&perPage=50")
      const results = data?.results || data?.data || data?.animes || []
      const mapped = (results as any[]).map(mapConsumetAnime)
      return mapped.length ? mapped : mockAnimeList
    } catch (e) {
      return mockAnimeList
    }
  },
  // Get metadata for a single anime (by title or id) using a cached anime list to reduce requests
  _cachedAnimeList: null as any[] | null,
  getAnimeMeta: async (query: string) => {
    try {
      // ensure cache
      if (!dashboardService._cachedAnimeList) {
        const list = await dashboardService.getAnimeList()
        dashboardService._cachedAnimeList = list
      }
      const list = dashboardService._cachedAnimeList || []
      const q = (query || "").toString().toLowerCase()
      // try exact matches first
      let item = list.find((a: any) => (a.id && a.id.toString().toLowerCase() === q) || (a.title && a.title.toLowerCase() === q))
      if (!item) {
        // try includes
        item = list.find((a: any) => a.title && a.title.toLowerCase().includes(q))
      }
      return item || null
    } catch (e) {
      console.warn("getAnimeMeta failed:", e)
      return null
    }
  },
}
