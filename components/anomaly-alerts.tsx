"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Heart, X, RefreshCw } from "lucide-react"
import { useEffect, useState } from "react"

interface AnomalyAlert {
  id: string
  type: "warning" | "critical" | "info"
  title: string
  description: string
  timestamp: string
  metric: string
  value: number
  threshold: number
  acknowledged: boolean
}

export function AnomalyAlerts() {
  const [alerts, setAlerts] = useState<AnomalyAlert[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchAlerts = async () => {
    try {
      const response = await fetch("/api/health-data/alerts")
      const data = await response.json()
      setAlerts(data.alerts || [])
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

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5 animate-spin" />
          <h3 className="text-lg font-semibold">Loading Alerts...</h3>
        </div>
      </div>
    )
  }

  const activeAlerts = alerts.filter((alert) => !alert.acknowledged)

  if (activeAlerts.length === 0) {
    return (
      <Alert className="border-green-200 bg-green-50">
        <Heart className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">All Systems Normal</AlertTitle>
        <AlertDescription className="text-green-700">
          No anomalies detected. Your health metrics are within normal ranges.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Health Alerts
        </h3>
        <Badge variant="destructive">{activeAlerts.length} Active</Badge>
      </div>

      {activeAlerts.slice(0, 3).map((alert) => (
        <Alert
          key={alert.id}
          className={`${
            alert.type === "critical"
              ? "border-red-200 bg-red-50"
              : alert.type === "warning"
                ? "border-yellow-200 bg-yellow-50"
                : "border-blue-200 bg-blue-50"
          }`}
        >
          <AlertTriangle
            className={`h-4 w-4 ${
              alert.type === "critical"
                ? "text-red-600"
                : alert.type === "warning"
                  ? "text-yellow-600"
                  : "text-blue-600"
            }`}
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <AlertTitle
                className={`${
                  alert.type === "critical"
                    ? "text-red-800"
                    : alert.type === "warning"
                      ? "text-yellow-800"
                      : "text-blue-800"
                }`}
              >
                {alert.title}
              </AlertTitle>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={`${
                    alert.type === "critical"
                      ? "text-red-600 border-red-600"
                      : alert.type === "warning"
                        ? "text-yellow-600 border-yellow-600"
                        : "text-blue-600 border-blue-600"
                  }`}
                >
                  {alert.type}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => acknowledgeAlert(alert.id)}
                  className="h-6 px-2 text-xs"
                >
                  Acknowledge
                </Button>
                <Button variant="ghost" size="sm" onClick={() => dismissAlert(alert.id)} className="h-6 w-6 p-0">
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <AlertDescription
              className={`${
                alert.type === "critical"
                  ? "text-red-700"
                  : alert.type === "warning"
                    ? "text-yellow-700"
                    : "text-blue-700"
              }`}
            >
              {alert.description}
            </AlertDescription>
            <div className="mt-2 text-xs text-muted-foreground">
              {alert.metric}: {alert.value} (Threshold: {alert.threshold}) •
              {new Date(alert.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </Alert>
      ))}

      {activeAlerts.length > 3 && (
        <div className="text-center">
          <Button variant="outline" size="sm" asChild>
            <a href="/alerts">View All {activeAlerts.length} Alerts</a>
          </Button>
        </div>
      )}
    </div>
  )
}
