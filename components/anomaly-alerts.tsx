"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Heart, X } from "lucide-react"
import { useEffect, useState } from "react"

interface AnomalyAlert {
  id: string
  type: "warning" | "critical"
  title: string
  description: string
  timestamp: Date
  metric: string
  value: number
  threshold: number
}

export function AnomalyAlerts() {
  const [alerts, setAlerts] = useState<AnomalyAlert[]>([])

  useEffect(() => {
    // Simulate anomaly detection
    const checkForAnomalies = () => {
      const random = Math.random()

      if (random < 0.1) {
        // 10% chance of anomaly
        const anomalies = [
          {
            id: Date.now().toString(),
            type: "warning" as const,
            title: "Elevated Heart Rate Detected",
            description: "Your heart rate has been consistently above normal range for the past 10 minutes.",
            timestamp: new Date(),
            metric: "Heart Rate",
            value: 95,
            threshold: 90,
          },
          {
            id: Date.now().toString() + "1",
            type: "critical" as const,
            title: "Low Blood Oxygen Level",
            description: "Blood oxygen saturation has dropped below safe levels. Please seek medical attention.",
            timestamp: new Date(),
            metric: "Blood Oxygen",
            value: 92,
            threshold: 95,
          },
          {
            id: Date.now().toString() + "2",
            type: "warning" as const,
            title: "Irregular Activity Pattern",
            description: "Unusual decrease in daily activity detected. Consider increasing physical activity.",
            timestamp: new Date(),
            metric: "Activity Level",
            value: 3200,
            threshold: 5000,
          },
        ]

        const selectedAnomaly = anomalies[Math.floor(Math.random() * anomalies.length)]
        setAlerts((prev) => [selectedAnomaly, ...prev.slice(0, 4)]) // Keep only 5 most recent
      }
    }

    const interval = setInterval(checkForAnomalies, 15000) // Check every 15 seconds
    return () => clearInterval(interval)
  }, [])

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id))
  }

  if (alerts.length === 0) {
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
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-orange-500" />
        Anomaly Alerts
      </h3>
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          className={`${alert.type === "critical" ? "border-red-200 bg-red-50" : "border-yellow-200 bg-yellow-50"}`}
        >
          <AlertTriangle className={`h-4 w-4 ${alert.type === "critical" ? "text-red-600" : "text-yellow-600"}`} />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <AlertTitle className={`${alert.type === "critical" ? "text-red-800" : "text-yellow-800"}`}>
                {alert.title}
              </AlertTitle>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={`${
                    alert.type === "critical" ? "text-red-600 border-red-600" : "text-yellow-600 border-yellow-600"
                  }`}
                >
                  {alert.type}
                </Badge>
                <Button variant="ghost" size="sm" onClick={() => dismissAlert(alert.id)} className="h-6 w-6 p-0">
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <AlertDescription className={`${alert.type === "critical" ? "text-red-700" : "text-yellow-700"}`}>
              {alert.description}
            </AlertDescription>
            <div className="mt-2 text-xs text-muted-foreground">
              {alert.metric}: {alert.value} (Threshold: {alert.threshold}) • {alert.timestamp.toLocaleTimeString()}
            </div>
          </div>
        </Alert>
      ))}
    </div>
  )
}
