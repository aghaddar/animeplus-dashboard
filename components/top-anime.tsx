import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const topAnime = [
  {
    id: "demon-slayer",
    title: "Demon Slayer",
    image: "/demon-slayer-inspired.png",
    views: 124893,
    trend: "+12%",
  },
  {
    id: "attack-on-titan",
    title: "Attack on Titan",
    image: "/armored-titan-battle.png",
    views: 98752,
    trend: "+5%",
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    image: "/jujutsu-kaisen-inspired.png",
    views: 87654,
    trend: "+18%",
  },
  {
    id: "one-piece",
    title: "One Piece",
    image: "/grand-line-adventure.png",
    views: 76543,
    trend: "+3%",
  },
  {
    id: "my-hero-academia",
    title: "My Hero Academia",
    image: "/placeholder.svg?key=vqx0b",
    views: 65432,
    trend: "+7%",
  },
]

export function TopAnime() {
  return (
    <div className="space-y-8">
      {topAnime.map((anime) => (
        <div key={anime.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={anime.image || "/placeholder.svg"} alt={anime.title} />
            <AvatarFallback>{anime.title.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{anime.title}</p>
            <p className="text-sm text-muted-foreground">{anime.views.toLocaleString()} views</p>
          </div>
          <div className="ml-auto font-medium text-green-500">{anime.trend}</div>
        </div>
      ))}
    </div>
  )
}
