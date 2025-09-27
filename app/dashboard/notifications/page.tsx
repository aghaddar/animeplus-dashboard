"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from "next/navigation"

type Notification = {
  id: string
  title: string
  description: string
  time: string
  read: boolean
}

const initialNotifications: Notification[] = [
  { id: "1", title: "New User Registered", description: "A new user has registered on the platform.", time: "Just now", read: false },
  { id: "2", title: "Content Upload Complete", description: "Your content upload has been processed successfully.", time: "2 hours ago", read: false },
  { id: "3", title: "System Update", description: "The system will undergo maintenance in 24 hours.", time: "Yesterday", read: true },
  { id: "4", title: "New Comment", description: "Someone commented on your latest upload.", time: "3 days ago", read: true },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const router = useRouter()

  const markAsRead = (id: string) => {
    setNotifications((s) => s.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => setNotifications((s) => s.map((n) => ({ ...n, read: true })))

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">All notifications for your account</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          <Button onClick={markAllAsRead}>Mark all as read</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent notifications</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent>
          <ScrollArea className="h-[60vh]">
            <div className="space-y-2">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">No notifications</div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-4 rounded-md border ${n.read ? "bg-card" : "bg-muted/20"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{n.title}</div>
                        <div className="text-xs text-muted-foreground">{n.time}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!n.read && (
                          <Button size="sm" variant="ghost" onClick={() => markAsRead(n.id)}>
                            Mark read
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">{n.description}</div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
