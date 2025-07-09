"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RealtimeMetrics } from "@/components/realtime-metrics"
import { HealthMetricsChart } from "@/components/health-metrics-chart"
import { AnomalyAlerts } from "@/components/anomaly-alerts"
import { HealthRecommendations } from "@/components/health-recommendations"
import { Activity, Heart, TrendingUp, AlertTriangle } from "lucide-react"
import { useEffect, useState } from "react"

interface DashboardStats {
  totalAlerts: number
  activeAlerts: number
  completedRecommendations: number
  healthScore: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalAlerts: 0,
    activeAlerts: 0,
    completedRecommendations: 0,
    healthScore: 85,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const [alertsResponse, recommendationsResponse] = await Promise.all([
          fetch("/api/health-data/alerts"),
          fetch("/api/health-data/recommendations"),
        ])

        const alertsData = await alertsResponse.json()
        const recommendationsData = await recommendationsResponse.json()

        const completedRecs = recommendationsData.recommendations?.filter((r: any) => r.completed).length || 0

        setStats({
          totalAlerts: alertsData.totalAlerts || 0,
          activeAlerts: alertsData.activeAlerts || 0,
          completedRecommendations: completedRecs,
          healthScore: Math.max(60, 100 - alertsData.activeAlerts * 10 + completedRecs * 5),
        })
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardStats()
    const interval = setInterval(fetchDashboardStats, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-red-500" />
          <h1 className="text-xl font-semibold">Health Dashboard</h1>
          <Badge variant="outline" className="text-green-600 border-green-600">
            Live
          </Badge>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Health Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.healthScore}/100</div>
              <p className="text-xs text-muted-foreground">
                {stats.healthScore >= 90 ? "Excellent" : stats.healthScore >= 75 ? "Good" : "Needs Attention"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.activeAlerts}</div>
              <p className="text-xs text-muted-foreground">{stats.totalAlerts} total alerts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recommendations</CardTitle>
              <Activity className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.completedRecommendations}</div>
              <p className="text-xs text-muted-foreground">completed this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Online</div>
              <p className="text-xs text-muted-foreground">All systems operational</p>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Real-time Health Metrics</CardTitle>
            <CardDescription>Live data from your connected health devices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <RealtimeMetrics />
            </div>
          </CardContent>
        </Card>

        {/* Health Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Health Trends (Last 24 Hours)</CardTitle>
            <CardDescription>Track your health metrics over time</CardDescription>
          </CardHeader>
          <CardContent>
            <HealthMetricsChart />
          </CardContent>
        </Card>

        {/* Two Column Layout for Alerts and Recommendations */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <AnomalyAlerts />
          </div>
          <div>
            <HealthRecommendations />
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                <Heart className="h-6 w-6" />
                <span>View Detailed Metrics</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                <AlertTriangle className="h-6 w-6" />
                <span>Check All Alerts</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                <Activity className="h-6 w-6" />
                <span>Export Health Data</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
