"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, Download, RefreshCw } from "lucide-react"
import { HealthMetricsChart } from "@/components/health-metrics-chart"
import { useEffect, useState } from "react"

interface HealthData {
  timestamp: string
  heartRate: number
  bloodOxygen: number
  bodyTemperature: number
  activityLevel: number
  stressLevel: number
}

export default function MetricsPage() {
  const [data, setData] = useState<HealthData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("24h")

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/health-data/history?range=${timeRange}`)
      const result = await response.json()
      setData(result.data)
    } catch (error) {
      console.error("Failed to fetch health data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [timeRange])

  const exportData = async () => {
    try {
      const response = await fetch("/api/health-data/export")
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `health-data-${new Date().toISOString().split("T")[0]}.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Failed to export data:", error)
    }
  }

  const getAverages = () => {
    if (data.length === 0) return null

    return {
      heartRate: Math.round(data.reduce((sum, d) => sum + d.heartRate, 0) / data.length),
      bloodOxygen: Math.round(data.reduce((sum, d) => sum + d.bloodOxygen, 0) / data.length),
      bodyTemperature: Math.round((data.reduce((sum, d) => sum + d.bodyTemperature, 0) / data.length) * 10) / 10,
      activityLevel: Math.round(data.reduce((sum, d) => sum + d.activityLevel, 0) / data.length),
      stressLevel: Math.round(data.reduce((sum, d) => sum + d.stressLevel, 0) / data.length),
    }
  }

  const averages = getAverages()

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger />
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            <h1 className="text-xl font-semibold">Health Metrics</h1>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={fetchData} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
            <Button variant="outline" size="sm" onClick={exportData}>
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* Summary Cards */}
        {averages && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg Heart Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averages.heartRate} bpm</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg Blood Oxygen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averages.bloodOxygen}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg Temperature</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averages.bodyTemperature}°F</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg Daily Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averages.activityLevel.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg Stress Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averages.stressLevel}/10</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Detailed Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Health Trends</CardTitle>
            <CardDescription>Detailed view of your health metrics over time ({timeRange})</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2" />
                  <p>Loading health data...</p>
                </div>
              </div>
            ) : (
              <HealthMetricsChart data={data} />
            )}
          </CardContent>
        </Card>

        {/* Data Quality Indicators */}
        <Card>
          <CardHeader>
            <CardTitle>Data Quality</CardTitle>
            <CardDescription>Information about your health data collection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <p className="text-sm font-medium">Data Points Collected</p>
                <p className="text-2xl font-bold">{data.length}</p>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Complete
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Collection Period</p>
                <p className="text-2xl font-bold">{timeRange}</p>
                <Badge variant="outline" className="text-blue-600 border-blue-600">
                  Active
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Last Updated</p>
                <p className="text-sm text-muted-foreground">
                  {data.length > 0 ? new Date(data[data.length - 1].timestamp).toLocaleString() : "No data"}
                </p>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Real-time
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
