import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Heart, Thermometer, Droplets, TrendingUp, TrendingDown } from "lucide-react"

export default function MetricsPage() {
  const metrics = [
    {
      name: "Heart Rate",
      current: 72,
      unit: "bpm",
      range: "60-100",
      status: "normal",
      trend: "stable",
      icon: Heart,
      history: [68, 70, 72, 74, 72, 71, 72],
      color: "text-red-500",
    },
    {
      name: "Blood Oxygen",
      current: 98,
      unit: "%",
      range: "95-100",
      status: "normal",
      trend: "up",
      icon: Droplets,
      history: [96, 97, 97, 98, 98, 98, 98],
      color: "text-blue-500",
    },
    {
      name: "Body Temperature",
      current: 98.6,
      unit: "°F",
      range: "97-99",
      status: "normal",
      trend: "stable",
      icon: Thermometer,
      history: [98.4, 98.5, 98.6, 98.7, 98.6, 98.5, 98.6],
      color: "text-orange-500",
    },
    {
      name: "Activity Level",
      current: 7500,
      unit: "steps",
      range: "8000+",
      status: "below",
      trend: "down",
      icon: Activity,
      history: [8200, 7800, 7600, 7400, 7300, 7400, 7500],
      color: "text-green-500",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-600 bg-green-100"
      case "warning":
        return "text-yellow-600 bg-yellow-100"
      case "below":
        return "text-orange-600 bg-orange-100"
      case "critical":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-300" />
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger />
        <h1 className="text-xl font-semibold">Health Metrics</h1>
      </header>

      <main className="flex-1 p-6 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {metrics.map((metric) => {
            const Icon = metric.icon
            const progressValue =
              metric.name === "Activity Level"
                ? (metric.current / 10000) * 100
                : metric.name === "Blood Oxygen"
                  ? ((metric.current - 90) / 10) * 100
                  : metric.name === "Heart Rate"
                    ? ((metric.current - 40) / 60) * 100
                    : ((metric.current - 95) / 5) * 100

            return (
              <Card key={metric.name}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className={`h-5 w-5 ${metric.color}`} />
                      <CardTitle className="text-lg">{metric.name}</CardTitle>
                    </div>
                    {getTrendIcon(metric.trend)}
                  </div>
                  <CardDescription>
                    Normal range: {metric.range} {metric.unit}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">
                      {metric.current} {metric.unit}
                    </div>
                    <Badge className={getStatusColor(metric.status)}>{metric.status}</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{Math.round(progressValue)}%</span>
                    </div>
                    <Progress value={progressValue} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">7-Day Trend</h4>
                    <div className="flex items-end gap-1 h-16">
                      {metric.history.map((value, index) => {
                        const height =
                          metric.name === "Activity Level"
                            ? (value / Math.max(...metric.history)) * 100
                            : ((value - Math.min(...metric.history)) /
                                (Math.max(...metric.history) - Math.min(...metric.history))) *
                              100

                        return (
                          <div
                            key={index}
                            className={`flex-1 bg-gradient-to-t from-blue-500 to-blue-300 rounded-sm opacity-70 hover:opacity-100 transition-opacity`}
                            style={{ height: `${height}%` }}
                            title={`Day ${index + 1}: ${value} ${metric.unit}`}
                          />
                        )
                      })}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>7 days ago</span>
                      <span>Today</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Detailed Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>AI Analysis Summary</CardTitle>
            <CardDescription>Machine learning insights based on your health patterns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                <h4 className="font-medium text-green-800">Cardiovascular Health</h4>
                <p className="text-sm text-green-700 mt-1">
                  Your heart rate patterns show good cardiovascular fitness with stable resting heart rate.
                </p>
                <Badge className="mt-2 bg-green-100 text-green-800">Excellent</Badge>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                <h4 className="font-medium text-blue-800">Respiratory Function</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Blood oxygen levels are consistently optimal, indicating healthy lung function.
                </p>
                <Badge className="mt-2 bg-blue-100 text-blue-800">Normal</Badge>
              </div>

              <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                <h4 className="font-medium text-orange-800">Activity Patterns</h4>
                <p className="text-sm text-orange-700 mt-1">
                  Daily activity is slightly below recommended levels. Consider increasing movement.
                </p>
                <Badge className="mt-2 bg-orange-100 text-orange-800">Needs Improvement</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
