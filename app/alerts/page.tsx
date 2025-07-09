"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Bell, CheckCircle, X, RefreshCw } from "lucide-react"
import { useEffect, useState } from "react"

interface AlertData {
  id: string
  type: "critical" | "warning" | "info"
  title: string
  description: string
  timestamp: string
  metric: string
  value: number
  threshold: number
  acknowledged: boolean
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<AlertData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchAlerts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/health-data/alerts")
      const data = await response.json()
      setAlerts(data.alerts)
    } catch (error) {
      console.error("Failed to fetch alerts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAlerts()
    const interval = setInterval(fetchAlerts, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const acknowledgeAlert = async (id: string) => {
    try {
      await fetch(`/api/health-data/alerts/${id}/acknowledge`, {
        method: "POST",
      })
      setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, acknowledged: true } : alert)))
    } catch (error) {
      console.error("Failed to acknowledge alert:", error)
    }
  }

  const dismissAlert = async (id: string) => {
    try {
      await fetch(`/api/health-data/alerts/${id}`, {
        method: "DELETE",
      })
      setAlerts((prev) => prev.filter((alert) => alert.id !== id))
    } catch (error) {
      console.error("Failed to dismiss alert:", error)
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "border-red-200 bg-red-50"
      case "warning":
        return "border-yellow-200 bg-yellow-50"
      case "info":
        return "border-blue-200 bg-blue-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  const getAlertIconColor = (type: string) => {
    switch (type) {
      case "critical":
        return "text-red-600"
      case "warning":
        return "text-yellow-600"
      case "info":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  const getAlertTextColor = (type: string) => {
    switch (type) {
      case "critical":
        return "text-red-800"
      case "warning":
        return "text-yellow-800"
      case "info":
        return "text-blue-800"
      default:
        return "text-gray-800"
    }
  }

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "critical":
        return "text-red-600 border-red-600"
      case "warning":
        return "text-yellow-600 border-yellow-600"
      case "info":
        return "text-blue-600 border-blue-600"
      default:
        return "text-gray-600 border-gray-600"
    }
  }

  const activeAlerts = alerts.filter((alert) => !alert.acknowledged)
  const acknowledgedAlerts = alerts.filter((alert) => alert.acknowledged)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger />
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            <h1 className="text-xl font-semibold">Health Alerts</h1>
            {activeAlerts.length > 0 && <Badge variant="destructive">{activeAlerts.length} Active</Badge>}
          </div>
          <Button variant="outline" size="sm" onClick={fetchAlerts} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* Alert Summary */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{activeAlerts.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Acknowledged</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{acknowledgedAlerts.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alerts.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Active Alerts */}
        {activeAlerts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-red-500" />
                Active Alerts
              </CardTitle>
              <CardDescription>Alerts requiring your attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeAlerts.map((alert) => (
                <Alert key={alert.id} className={getAlertColor(alert.type)}>
                  <AlertTriangle className={`h-4 w-4 ${getAlertIconColor(alert.type)}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <AlertTitle className={getAlertTextColor(alert.type)}>{alert.title}</AlertTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getBadgeColor(alert.type)}>
                          {alert.type}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="h-8 px-2"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Acknowledge
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => dismissAlert(alert.id)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <AlertDescription className={getAlertTextColor(alert.type).replace("800", "700")}>
                      {alert.description}
                    </AlertDescription>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {alert.metric}: {alert.value} (Threshold: {alert.threshold}) •
                      {new Date(alert.timestamp).toLocaleString()}
                    </div>
                  </div>
                </Alert>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Acknowledged Alerts */}
        {acknowledgedAlerts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Acknowledged Alerts
              </CardTitle>
              <CardDescription>Previously acknowledged alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {acknowledgedAlerts.map((alert) => (
                <Alert key={alert.id} className="border-green-200 bg-green-50 opacity-75">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <AlertTitle className="text-green-800">{alert.title}</AlertTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Acknowledged
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => dismissAlert(alert.id)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <AlertDescription className="text-green-700">{alert.description}</AlertDescription>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {alert.metric}: {alert.value} (Threshold: {alert.threshold}) •
                      {new Date(alert.timestamp).toLocaleString()}
                    </div>
                  </div>
                </Alert>
              ))}
            </CardContent>
          </Card>
        )}

        {/* No Alerts State */}
        {alerts.length === 0 && !isLoading && (
          <Card>
            <CardContent className="p-12 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">All Clear!</h3>
              <p className="text-muted-foreground">No health alerts detected. Your metrics are within normal ranges.</p>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {isLoading && (
          <Card>
            <CardContent className="p-12 text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p>Loading health alerts...</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
