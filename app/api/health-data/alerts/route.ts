import { NextResponse } from "next/server"

// Simulate ML-based anomaly detection
function detectAnomalies() {
  const alerts = []
  const now = new Date()

  // Simulate various types of health alerts
  const possibleAlerts = [
    {
      type: "critical" as const,
      title: "Irregular Heart Rhythm Detected",
      description:
        "Your heart rate pattern shows irregularities. Consider consulting a healthcare provider immediately.",
      metric: "Heart Rate Variability",
      value: 45,
      threshold: 50,
    },
    {
      type: "warning" as const,
      title: "Elevated Resting Heart Rate",
      description: "Your resting heart rate has been consistently above normal for the past 2 hours.",
      metric: "Resting Heart Rate",
      value: 95,
      threshold: 90,
    },
    {
      type: "critical" as const,
      title: "Low Blood Oxygen Saturation",
      description: "Blood oxygen levels have dropped below safe thresholds. Seek medical attention.",
      metric: "Blood Oxygen",
      value: 89,
      threshold: 95,
    },
    {
      type: "warning" as const,
      title: "Unusual Activity Pattern",
      description: "Significant decrease in daily activity detected. Consider increasing physical activity.",
      metric: "Daily Steps",
      value: 2100,
      threshold: 5000,
    },
    {
      type: "info" as const,
      title: "Sleep Pattern Disruption",
      description: "Your sleep schedule has been irregular. Maintaining consistent sleep times can improve health.",
      metric: "Sleep Quality",
      value: 65,
      threshold: 80,
    },
    {
      type: "warning" as const,
      title: "Elevated Stress Levels",
      description: "Stress indicators suggest high stress levels. Consider relaxation techniques.",
      metric: "Stress Level",
      value: 8,
      threshold: 6,
    },
  ]

  // Randomly generate 0-3 alerts
  const numAlerts = Math.floor(Math.random() * 4)

  for (let i = 0; i < numAlerts; i++) {
    const alert = possibleAlerts[Math.floor(Math.random() * possibleAlerts.length)]
    alerts.push({
      id: `alert_${Date.now()}_${i}`,
      ...alert,
      timestamp: new Date(now.getTime() - Math.random() * 3600000).toISOString(), // Within last hour
      acknowledged: false,
    })
  }

  return alerts
}

export async function GET() {
  try {
    const alerts = detectAnomalies()

    return NextResponse.json({
      alerts,
      totalAlerts: alerts.length,
      activeAlerts: alerts.filter((a) => !a.acknowledged).length,
      lastChecked: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch health alerts" }, { status: 500 })
  }
}
