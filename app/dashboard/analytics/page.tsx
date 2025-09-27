import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ViewsChart } from "@/components/views-chart"
import { UserRetentionChart } from "@/components/user-retention-chart"
import { PopularGenresChart } from "@/components/popular-genres-chart"
import { WatchTimeDistribution } from "@/components/watch-time-distribution"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Detailed analytics for your anime streaming platform.</p>
      </div>

      <Tabs defaultValue="views" className="space-y-4">
        <TabsList>
          <TabsTrigger value="views">Views</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="views" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Views Over Time</CardTitle>
              <CardDescription>Daily views across the platform over the last 30 days.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ViewsChart />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Peak Viewing Hours</CardTitle>
                <CardDescription>When users are most active on the platform.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <WatchTimeDistribution />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Popular Genres</CardTitle>
                <CardDescription>Most viewed anime genres.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <PopularGenresChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Retention</CardTitle>
              <CardDescription>User retention rates over time.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <UserRetentionChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Analytics</CardTitle>
              <CardDescription>Detailed content performance metrics.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Content analytics coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
              <CardDescription>Metrics on how users interact with the platform.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Engagement analytics coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
