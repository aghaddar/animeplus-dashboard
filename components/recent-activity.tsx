import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentActivities = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      email: "sarah@example.com",
      avatar: "/abstract-geometric-shapes.png",
    },
    activity: "watched episode 24 of Demon Slayer",
    time: "2 minutes ago",
  },
  {
    id: 2,
    user: {
      name: "Alex Johnson",
      email: "alex@example.com",
      avatar: "/abstract-geometric-shapes.png",
    },
    activity: "added Attack on Titan to watchlist",
    time: "15 minutes ago",
  },
  {
    id: 3,
    user: {
      name: "Jamie Smith",
      email: "jamie@example.com",
      avatar: "/diverse-group-collaborating.png",
    },
    activity: "signed up for premium subscription",
    time: "32 minutes ago",
  },
  {
    id: 4,
    user: {
      name: "Taylor Wong",
      email: "taylor@example.com",
      avatar: "/abstract-geometric-shapes.png",
    },
    activity: "left a review on Jujutsu Kaisen",
    time: "1 hour ago",
  },
  {
    id: 5,
    system: true,
    activity: "New anime 'Chainsaw Man Season 2' added to database",
    time: "2 hours ago",
  },
  {
    id: 6,
    system: true,
    activity: "System maintenance completed",
    time: "3 hours ago",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {recentActivities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          {activity.system ? (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
              <span className="h-2 w-2 rounded-full bg-sky-500"></span>
            </div>
          ) : (
            <Avatar className="h-9 w-9">
              <AvatarImage src={activity.user?.avatar || "/placeholder.svg"} alt={activity.user?.name} />
              <AvatarFallback>{activity.user?.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
          )}
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.system ? <span className="text-sky-500">System</span> : activity.user?.name}
            </p>
            <p className="text-sm text-muted-foreground">{activity.activity}</p>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">{activity.time}</div>
        </div>
      ))}
    </div>
  )
}
