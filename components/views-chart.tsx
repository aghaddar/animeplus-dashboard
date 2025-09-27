"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Generate the last 30 days of data
const generateData = () => {
  const data = []
  const now = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Generate a somewhat realistic view count with some randomness
    // Base value around 20k with some daily fluctuation
    const baseViews = 20000
    const dayOfWeekFactor = date.getDay() === 0 || date.getDay() === 6 ? 1.3 : 1 // Weekend boost
    const randomFactor = 0.8 + Math.random() * 0.4 // Random factor between 0.8 and 1.2

    const views = Math.floor(baseViews * dayOfWeekFactor * randomFactor)

    data.push({
      date: date.toISOString().split("T")[0],
      views,
    })
  }

  return data
}

const data = generateData()

export function ViewsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => {
            const date = new Date(value)
            return `${date.getDate()}/${date.getMonth() + 1}`
          }}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value / 1000}k`}
        />
        <Tooltip
          formatter={(value: number) => [`${value.toLocaleString()} views`, "Views"]}
          labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
        />
        <Line type="monotone" dataKey="views" stroke="#2563eb" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
