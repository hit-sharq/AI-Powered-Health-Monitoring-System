import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, TrendingUp } from "lucide-react"
import { HealthMetricsChart } from "@/components/health-metrics-chart"
import { RealtimeMetrics } from "@/components/realtime-metrics"
import { AnomalyAlerts } from "@/components/anomaly-alerts"
import { HealthRecommendations } from "@/components/health-recommendations"

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Health Dashboard</h1>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <Activity className="h-3 w-3 mr-1" />
            Live Monitoring
          </Badge>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* Real-time Health Status */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <RealtimeMetrics />
        </div>

        {/* Anomaly Alerts */}
        <AnomalyAlerts />

        {/* Health Trends Chart */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Health Trends (24h)
              </CardTitle>
              <CardDescription>Real-time monitoring of your vital signs</CardDescription>
            </CardHeader>
            <CardContent>
              <HealthMetricsChart />
            </CardContent>
          </Card>

          <HealthRecommendations />
        </div>

        {/* Health Score Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Health Score</CardTitle>
            <CardDescription>AI-powered assessment based on your current metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-green-600">85/100</div>
                <p className="text-sm text-muted-foreground">Good Health Status</p>
              </div>
              <div className="text-right space-y-1">
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Stable
                </Badge>
                <p className="text-xs text-muted-foreground">Last updated: 2 min ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
