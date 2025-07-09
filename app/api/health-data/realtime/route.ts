import { NextResponse } from "next/server"

// Simulate real-time health data from wearable devices
function generateRealtimeHealthData() {
  // Simulate more realistic health data with some variability
  const baseHeartRate = 72
  const baseOxygen = 98
  const baseTemp = 98.6
  const baseActivity = 7500

  // Add some realistic variation
  const heartRateVariation = (Math.random() - 0.5) * 20
  const oxygenVariation = (Math.random() - 0.5) * 4
  const tempVariation = (Math.random() - 0.5) * 2
  const activityVariation = (Math.random() - 0.5) * 5000

  return {
    heartRate: Math.max(50, Math.min(120, Math.round(baseHeartRate + heartRateVariation))),
    bloodOxygen: Math.max(90, Math.min(100, Math.round(baseOxygen + oxygenVariation))),
    bodyTemperature: Math.round((baseTemp + tempVariation) * 10) / 10,
    activityLevel: Math.max(0, Math.round(baseActivity + activityVariation)),
    timestamp: new Date().toISOString(),
  }
}

export async function GET() {
  try {
    const currentMetrics = generateRealtimeHealthData()

    return NextResponse.json({
      currentMetrics,
      status: "active",
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch real-time health data" }, { status: 500 })
  }
}
