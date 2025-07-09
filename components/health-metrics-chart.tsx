"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"
import { useEffect, useState } from "react"

interface ChartData {
  timestamp: string
  time: string
  heartRate: number
  bloodOxygen: number
  bodyTemperature: number
  activityLevel: number
}

interface HealthMetricsChartProps {
  data?: ChartData[]
}

export function HealthMetricsChart({ data: propData }: HealthMetricsChartProps) {
  const [data, setData] = useState<ChartData[]>([])
  const [isLoading, setIsLoading] = useState(!propData)

  useEffect(() => {
    if (propData) {
      // Format the data for the chart
      const formattedData = propData.map((item) => ({
        ...item,
        time: new Date(item.timestamp).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }))
      setData(formattedData)
      setIsLoading(false)
      return
    }

    const fetchData = async () => {
      try {
        const response = await fetch("/api/health-data/history?range=24h")
        const result = await response.json()

        const formattedData = result.data.map((item: any) => ({
          ...item,
          time: new Date(item.timestamp).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }))

        setData(formattedData)
      } catch (error) {
        console.error("Failed to fetch chart data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [propData])

  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading health data...</p>
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No health data available</p>
        </div>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="time" fontSize={12} tickLine={false} axisLine={false} interval="preserveStartEnd" />
        <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-3 shadow-sm">
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
                              : entry.dataKey === "bodyTemperature"
                                ? "Temperature"
                                : "Activity Level"}
                        </span>
                        <span className="font-bold" style={{ color: entry.color }}>
                          {typeof entry.value === "number" ? entry.value.toFixed(1) : entry.value}
                          {entry.dataKey === "heartRate"
                            ? " bpm"
                            : entry.dataKey === "bloodOxygen"
                              ? "%"
                              : entry.dataKey === "bodyTemperature"
                                ? "°F"
                                : " steps"}
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
        <Legend />
        <Line
          type="monotone"
          dataKey="heartRate"
          stroke="#ef4444"
          strokeWidth={2}
          dot={false}
          name="Heart Rate (bpm)"
        />
        <Line
          type="monotone"
          dataKey="bloodOxygen"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
          name="Blood Oxygen (%)"
        />
        <Line
          type="monotone"
          dataKey="bodyTemperature"
          stroke="#f59e0b"
          strokeWidth={2}
          dot={false}
          name="Temperature (°F)"
        />
        <Line
          type="monotone"
          dataKey="activityLevel"
          stroke="#10b981"
          strokeWidth={2}
          dot={false}
          name="Activity (steps/hr)"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
