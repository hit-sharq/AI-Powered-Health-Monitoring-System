"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useEffect, useState } from "react"

interface ChartData {
  time: string
  heartRate: number
  bloodOxygen: number
  temperature: number
}

export function HealthMetricsChart() {
  const [data, setData] = useState<ChartData[]>([])

  useEffect(() => {
    // Initialize with some sample data
    const initialData: ChartData[] = []
    const now = new Date()

    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000)
      initialData.push({
        time: time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        heartRate: 70 + Math.random() * 20,
        bloodOxygen: 96 + Math.random() * 4,
        temperature: 98 + Math.random() * 2,
      })
    }

    setData(initialData)

    // Update data every 5 seconds
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev.slice(1)]
        const now = new Date()
        newData.push({
          time: now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          heartRate: 70 + Math.random() * 20,
          bloodOxygen: 96 + Math.random() * 4,
          temperature: 98 + Math.random() * 2,
        })
        return newData
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="time" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Time</span>
                      <span className="font-bold text-muted-foreground">{label}</span>
                    </div>
                    {payload.map((entry, index) => (
                      <div key={index} className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          {entry.dataKey === "heartRate"
                            ? "Heart Rate"
                            : entry.dataKey === "bloodOxygen"
                              ? "Blood Oxygen"
                              : "Temperature"}
                        </span>
                        <span className="font-bold" style={{ color: entry.color }}>
                          {entry.value?.toFixed(1)}
                          {entry.dataKey === "heartRate" ? " bpm" : entry.dataKey === "bloodOxygen" ? "%" : "°F"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line type="monotone" dataKey="heartRate" stroke="#ef4444" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="bloodOxygen" stroke="#3b82f6" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="temperature" stroke="#f59e0b" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
