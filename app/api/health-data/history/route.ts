import { NextResponse } from "next/server"

function generateHistoricalData(range: string) {
  const data = []
  let hours = 24

  switch (range) {
    case "7d":
      hours = 24 * 7
      break
    case "30d":
      hours = 24 * 30
      break
    default:
      hours = 24
  }

  const now = new Date()
  const interval = range === "30d" ? 4 : 1 // 4-hour intervals for 30 days, 1-hour for others

  for (let i = 0; i < hours; i += interval) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000)

    // Generate more realistic data with daily patterns
    const hourOfDay = timestamp.getHours()
    const isNight = hourOfDay < 6 || hourOfDay > 22
    const isActive = hourOfDay >= 8 && hourOfDay <= 20

    // Heart rate varies by time of day
    let baseHeartRate = 70
    if (isNight) baseHeartRate = 60 // Lower at night
    if (isActive) baseHeartRate = 80 // Higher during active hours

    // Activity varies by time of day
    let baseActivity = isActive ? 500 : 100 // Steps per hour
    if (isNight) baseActivity = 0

    data.push({
      timestamp: timestamp.toISOString(),
      heartRate: Math.max(50, Math.min(120, baseHeartRate + (Math.random() - 0.5) * 20)),
      bloodOxygen: Math.max(90, Math.min(100, 97 + (Math.random() - 0.5) * 6)),
      bodyTemperature: Math.round((98.6 + (Math.random() - 0.5) * 2) * 10) / 10,
      activityLevel: Math.max(0, baseActivity + (Math.random() - 0.5) * 200),
      stressLevel: Math.max(1, Math.min(10, Math.round(5 + (Math.random() - 0.5) * 6))),
    })
  }

  return data.reverse()
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const range = searchParams.get("range") || "24h"

    const data = generateHistoricalData(range)

    return NextResponse.json({
      data,
      range,
      totalPoints: data.length,
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch historical health data" }, { status: 500 })
  }
}
