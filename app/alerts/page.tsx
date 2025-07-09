import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Clock, Bell } from "lucide-react"

export default function AlertsPage() {
  const alerts = [
    {
      id: "1",
      type: "critical",
      title: "Blood Oxygen Level Critical",
      description: "Blood oxygen saturation dropped to 89% at 2:30 PM. Immediate medical attention recommended.",
      timestamp: "2024-01-15T14:30:00Z",
      metric: "Blood Oxygen",
      value: 89,
      threshold: 95,
      status: "active",
      aiConfidence: 96,
    },
    {
      id: "2",
      type: "warning",
      title: "Elevated Heart Rate Pattern",
      description: "Heart rate has been consistently above 90 bpm for the past 2 hours during rest periods.",
      timestamp: "2024-01-15T13:15:00Z",
      metric: "Heart Rate",
      value: 94,
      threshold: 90,
      status: "acknowledged",
      aiConfidence: 87,
    },
    {
      id: "3",
      type: "info",
      title: "Activity Goal Not Met",
      description: "Daily step count is 40% below your target. Current: 4,800 steps, Target: 8,000 steps.",
      timestamp: "2024-01-15T12:00:00Z",
      metric: "Activity Level",
      value: 4800,
      threshold: 8000,
      status: "resolved",
      aiConfidence: 78,
    },
    {
      id: "4",
      type: "warning",
      title: "Temperature Fluctuation",
      description: "Body temperature has varied by more than 2°F in the past hour, indicating possible fever onset.",
      timestamp: "2024-01-15T11:45:00Z",
      metric: "Body Temperature",
      value: 99.8,
      threshold: 99.0,
      status: "active",
      aiConfidence: 82,
    },
  ]

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "border-red-500 bg-red-50"
      case "warning":
        return "border-yellow-500 bg-yellow-50"
      case "info":
        return "border-blue-500 bg-blue-50"
      default:
        return "border-gray-500 bg-gray-50"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-red-600 border-red-600"
      case "acknowledged":
        return "text-yellow-600 border-yellow-600"
      case "resolved":
        return "text-green-600 border-green-600"
      default:
        return "text-gray-600 border-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <AlertTriangle className="h-4 w-4" />
      case "acknowledged":
        return <Clock className="h-4 w-4" />
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Anomaly Alerts</h1>
          <Badge variant="outline" className="text-red-600 border-red-600">
            {alerts.filter((a) => a.status === "active").length} Active
          </Badge>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* Alert Summary */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Alerts</p>
                  <p className="text-2xl font-bold">{alerts.length}</p>
                </div>
                <Bell className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Critical</p>
                  <p className="text-2xl font-bold text-red-600">
                    {alerts.filter((a) => a.type === "critical").length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {alerts.filter((a) => a.status === "active").length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">
                    {alerts.filter((a) => a.status === "resolved").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alert List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Recent Alerts</h2>
          {alerts.map((alert) => (
            <Alert key={alert.id} className={getAlertColor(alert.type)}>
              <div className="flex items-start justify-between w-full">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(alert.status)}
                    <AlertTitle className="text-base">{alert.title}</AlertTitle>
                    <Badge variant="outline" className={getStatusColor(alert.status)}>
                      {alert.status}
                    </Badge>
                    <Badge variant="outline">{alert.type}</Badge>
                  </div>

                  <AlertDescription className="mb-3">{alert.description}</AlertDescription>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Metric:</span>
                      <p className="text-muted-foreground">{alert.metric}</p>
                    </div>
                    <div>
                      <span className="font-medium">Value:</span>
                      <p className="text-muted-foreground">{alert.value}</p>
                    </div>
                    <div>
                      <span className="font-medium">Threshold:</span>
                      <p className="text-muted-foreground">{alert.threshold}</p>
                    </div>
                    <div>
                      <span className="font-medium">AI Confidence:</span>
                      <p className="text-muted-foreground">{alert.aiConfidence}%</p>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-muted-foreground">{new Date(alert.timestamp).toLocaleString()}</div>
                </div>

                <div className="flex gap-2 ml-4">
                  {alert.status === "active" && (
                    <>
                      <Button variant="outline" size="sm">
                        Acknowledge
                      </Button>
                      <Button variant="default" size="sm">
                        Resolve
                      </Button>
                    </>
                  )}
                  {alert.status === "acknowledged" && (
                    <Button variant="default" size="sm">
                      Resolve
                    </Button>
                  )}
                </div>
              </div>
            </Alert>
          ))}
        </div>

        {/* ML Model Information */}
        <Card>
          <CardHeader>
            <CardTitle>Anomaly Detection System</CardTitle>
            <CardDescription>AI-powered health monitoring using advanced machine learning algorithms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-medium">Detection Models</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Isolation Forest for outlier detection</li>
                  <li>• LSTM networks for time-series analysis</li>
                  <li>• Statistical process control for trend analysis</li>
                  <li>• Ensemble methods for improved accuracy</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Model Performance</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Accuracy</span>
                    <span className="text-sm font-medium">94.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Precision</span>
                    <span className="text-sm font-medium">91.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Recall</span>
                    <span className="text-sm font-medium">96.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">F1-Score</span>
                    <span className="text-sm font-medium">94.1%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
