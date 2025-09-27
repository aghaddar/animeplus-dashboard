"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", retention: 92 },
  { month: "Feb", retention: 89 },
  { month: "Mar", retention: 91 },
  { month: "Apr", retention: 87 },
  { month: "May", retention: 85 },
  { month: "Jun", retention: 88 },
  { month: "Jul", retention: 90 },
  { month: "Aug", retention: 92 },
  { month: "Sep", retention: 93 },
  { month: "Oct", retention: 91 },
  { month: "Nov", retention: 94 },
  { month: "Dec", retention: 95 },
]

export function UserRetentionChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
          domain={[80, 100]}
        />
        <Tooltip
          formatter={(value: number) => [`${value}%`, "Retention Rate"]}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Bar dataKey="retention" fill="#10b981" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
