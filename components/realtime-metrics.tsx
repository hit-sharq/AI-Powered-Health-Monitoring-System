"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Activity, Thermometer, Droplets } from "lucide-react"
import { useEffect, useState } from "react"

interface HealthMetric {
  id: string
  name: string
  value: number
  unit: string
  status: "normal" | "warning" | "critical"
  icon: React.ComponentType<{ className?: string }>
  range: string
}

export function RealtimeMetrics() {
  const [metrics, setMetrics] = useState<HealthMetric[]>([
    {
      id: "heart-rate",
      name: "Heart Rate",
      value: 72,
      unit: "bpm",
      status: "normal",
      icon: Heart,
      range: "60-100 bpm",
    },
    {
      id: "blood-oxygen",
      name: "Blood Oxygen",
      value: 98,
      unit: "%",
      status: "normal",
      icon: Droplets,
      range: "95-100%",
    },
    {
      id: "body-temp",
      name: "Body Temperature",
      value: 98.6,
      unit: "°F",
      status: "normal",
      icon: Thermometer,
      range: "97-99°F",
    },
    {
      id: "activity",
      name: "Activity Level",
      value: 7500,
      unit: "steps",
      status: "normal",
      icon: Activity,
      range: "8000+ steps",
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => {
          let newValue = metric.value
          let newStatus = metric.status

          // Simulate real-time data changes
          switch (metric.id) {
            case "heart-rate":
              newValue = Math.max(60, Math.min(100, metric.value + (Math.random() - 0.5) * 4))
              newStatus = newValue > 90 || newValue < 65 ? "warning" : "normal"
              break
            case "blood-oxygen":
              newValue = Math.max(90, Math.min(100, metric.value + (Math.random() - 0.5) * 2))
              newStatus = newValue < 95 ? "critical" : "normal"
              break
            case "body-temp":
              newValue = Math.max(96, Math.min(101, metric.value + (Math.random() - 0.5) * 0.5))
              newStatus = newValue > 99.5 || newValue < 97 ? "warning" : "normal"
              break
            case "activity":
              newValue = Math.max(0, metric.value + Math.floor((Math.random() - 0.3) * 100))
              newStatus = newValue < 5000 ? "warning" : "normal"
              break
          }

          return {
            ...metric,
            value: Math.round(newValue * 10) / 10,
            status: newStatus,
          }
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-600 border-green-600"
      case "warning":
        return "text-yellow-600 border-yellow-600"
      case "critical":
        return "text-red-600 border-red-600"
      default:
        return "text-gray-600 border-gray-600"
    }
  }

  return (
    <>
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <Card key={metric.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metric.value} {metric.unit}
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">Normal: {metric.range}</p>
                <Badge variant="outline" className={getStatusColor(metric.status)}>
                  {metric.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </>
  )
}
