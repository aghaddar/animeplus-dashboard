"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    views: 143000,
    users: 8000,
  },
  {
    name: "Feb",
    views: 192000,
    users: 9200,
  },
  {
    name: "Mar",
    views: 219000,
    users: 9800,
  },
  {
    name: "Apr",
    views: 275000,
    users: 10400,
  },
  {
    name: "May",
    views: 329000,
    users: 11100,
  },
  {
    name: "Jun",
    views: 392000,
    users: 11700,
  },
  {
    name: "Jul",
    views: 431000,
    users: 12200,
  },
  {
    name: "Aug",
    views: 479000,
    users: 12500,
  },
  {
    name: "Sep",
    views: 521000,
    users: 12800,
  },
  {
    name: "Oct",
    views: 539000,
    users: 13100,
  },
  {
    name: "Nov",
    views: 562000,
    users: 13400,
  },
  {
    name: "Dec",
    views: 584000,
    users: 12500,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value / 1000}k`}
        />
        <Tooltip
          formatter={(value: number) => [`${value.toLocaleString()}`, undefined]}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Bar dataKey="views" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
        <Bar dataKey="users" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary/30" />
      </BarChart>
    </ResponsiveContainer>
  )
}
