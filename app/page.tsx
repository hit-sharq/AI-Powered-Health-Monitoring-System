"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, Activity, AlertTriangle, TrendingUp, Users, Target } from "lucide-react"
import { RealtimeMetrics } from "@/components/realtime-metrics"
import { HealthMetricsChart } from "@/components/health-metrics-chart"
import { AnomalyAlerts } from "@/components/anomaly-alerts"
import { HealthRecommendations } from "@/components/health-recommendations"
import { Lightbulb } from "lucide-react"

export default function Dashboard() {
  const [healthScore, setHealthScore] = useState(85)
  const [activeAlerts, setActiveAlerts] = useState(2)

  useEffect(() => {
    // Simulate real-time health score updates
    const interval = setInterval(() => {
      setHealthScore((prev) => {
        const change = (Math.random() - 0.5) * 4
        return Math.max(60, Math.min(100, prev + change))
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getHealthScoreStatus = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    return "Needs Attention"
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Health Dashboard</h2>
          <p className="text-muted-foreground">
            Real-time monitoring aligned with UN SDG 3: Good Health and Well-being
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Target className="h-3 w-3" />
            SDG 3 Aligned
          </Badge>
          <Badge variant={activeAlerts > 0 ? "destructive" : "secondary"}>{activeAlerts} Active Alerts</Badge>
        </div>
      </div>

      {/* Health Score Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Score</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <span className={getHealthScoreColor(healthScore)}>{Math.round(healthScore)}%</span>
            </div>
            <p className="text-xs text-muted-foreground">{getHealthScoreStatus(healthScore)}</p>
            <Progress value={healthScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Monitoring</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24/7</div>
            <p className="text-xs text-muted-foreground">Continuous health tracking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Insights</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Personalized recommendations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Impact</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">SDG 3</div>
            <p className="text-xs text-muted-foreground">Global health goals</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Real-time Metrics */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Real-time Health Metrics</CardTitle>
            <CardDescription>Live monitoring of vital signs and health indicators</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <RealtimeMetrics />
          </CardContent>
        </Card>

        {/* Anomaly Alerts */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Health Alerts
            </CardTitle>
            <CardDescription>AI-detected anomalies requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <AnomalyAlerts />
          </CardContent>
        </Card>
      </div>

      {/* Charts and Recommendations */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Health Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Health Trends</CardTitle>
            <CardDescription>Historical analysis of your health metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <HealthMetricsChart />
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              AI Health Recommendations
            </CardTitle>
            <CardDescription>Personalized suggestions for better health outcomes</CardDescription>
          </CardHeader>
          <CardContent>
            <HealthRecommendations />
          </CardContent>
        </Card>
      </div>

      {/* SDG 3 Impact Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-4 w-4 text-blue-600" />
            UN SDG 3: Good Health and Well-being Impact
          </CardTitle>
          <CardDescription>How this system contributes to global health goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Early Detection</h4>
              <p className="text-sm text-muted-foreground">
                AI-powered anomaly detection helps identify health issues before they become critical
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Preventive Care</h4>
              <p className="text-sm text-muted-foreground">
                Personalized recommendations promote healthy lifestyle choices and disease prevention
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Accessible Healthcare</h4>
              <p className="text-sm text-muted-foreground">
                24/7 health monitoring makes healthcare more accessible and affordable for everyone
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
