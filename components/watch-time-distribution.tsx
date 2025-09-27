"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { hour: "00:00", views: 1200 },
  { hour: "02:00", views: 800 },
  { hour: "04:00", views: 500 },
  { hour: "06:00", views: 700 },
  { hour: "08:00", views: 1500 },
  { hour: "10:00", views: 2000 },
  { hour: "12:00", views: 2400 },
  { hour: "14:00", views: 2800 },
  { hour: "16:00", views: 3500 },
  { hour: "18:00", views: 4200 },
  { hour: "20:00", views: 4800 },
  { hour: "22:00", views: 3200 },
]

export function WatchTimeDistribution() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="hour" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value / 1000}k`}
        />
        <Tooltip
          formatter={(value: number) => [`${value.toLocaleString()} views`, "Views"]}
          labelFormatter={(label) => `Time: ${label}`}
        />
        <Bar dataKey="views" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
