"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Droplets, Thermometer, Activity } from "lucide-react"
import { useEffect, useState } from "react"

interface HealthMetrics {
  heartRate: number
  bloodOxygen: number
  bodyTemperature: number
  activityLevel: number
  timestamp: string
}

export function RealtimeMetrics() {
  const [metrics, setMetrics] = useState<HealthMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch("/api/health-data/realtime")
        const data = await response.json()
        setMetrics(data.currentMetrics)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch metrics:", error)
        setIsLoading(false)
      }
    }

    fetchMetrics()
    const interval = setInterval(fetchMetrics, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const getHeartRateStatus = (hr: number) => {
    if (hr < 60) return { status: "Low", color: "text-blue-600 border-blue-600" }
    if (hr > 100) return { status: "High", color: "text-red-600 border-red-600" }
    return { status: "Normal", color: "text-green-600 border-green-600" }
  }

  const getOxygenStatus = (oxygen: number) => {
    if (oxygen < 95) return { status: "Low", color: "text-red-600 border-red-600" }
    if (oxygen >= 98) return { status: "Excellent", color: "text-green-600 border-green-600" }
    return { status: "Good", color: "text-yellow-600 border-yellow-600" }
  }

  const getTempStatus = (temp: number) => {
    if (temp < 97 || temp > 99.5) return { status: "Abnormal", color: "text-red-600 border-red-600" }
    return { status: "Normal", color: "text-green-600 border-green-600" }
  }

  const getActivityStatus = (steps: number) => {
    if (steps < 5000) return { status: "Low", color: "text-red-600 border-red-600" }
    if (steps > 10000) return { status: "Excellent", color: "text-green-600 border-green-600" }
    return { status: "Good", color: "text-yellow-600 border-yellow-600" }
  }

  if (isLoading) {
    return (
      <>
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </>
    )
  }

  if (!metrics) {
    return (
      <Card className="col-span-4">
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">Failed to load health metrics</p>
        </CardContent>
      </Card>
    )
  }

  const heartRateStatus = getHeartRateStatus(metrics.heartRate)
  const oxygenStatus = getOxygenStatus(metrics.bloodOxygen)
  const tempStatus = getTempStatus(metrics.bodyTemperature)
  const activityStatus = getActivityStatus(metrics.activityLevel)

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
          <Heart className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.heartRate} bpm</div>
          <Badge variant="outline" className={heartRateStatus.color}>
            {heartRateStatus.status}
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Blood Oxygen</CardTitle>
          <Droplets className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.bloodOxygen}%</div>
          <Badge variant="outline" className={oxygenStatus.color}>
            {oxygenStatus.status}
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Body Temperature</CardTitle>
          <Thermometer className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.bodyTemperature}°F</div>
          <Badge variant="outline" className={tempStatus.color}>
            {tempStatus.status}
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Daily Steps</CardTitle>
          <Activity className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.activityLevel.toLocaleString()}</div>
          <Badge variant="outline" className={activityStatus.color}>
            {activityStatus.status}
          </Badge>
        </CardContent>
      </Card>
    </>
  )
}
