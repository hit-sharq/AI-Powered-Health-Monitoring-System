import { NextResponse } from "next/server"

function generateCSVData() {
  const headers = [
    "Timestamp",
    "Heart Rate (bpm)",
    "Blood Oxygen (%)",
    "Body Temperature (°F)",
    "Activity Level (steps)",
    "Stress Level (1-10)",
  ]

  const data = []
  const now = new Date()

  // Generate 30 days of data
  for (let i = 0; i < 30 * 24; i++) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000)
    const hourOfDay = timestamp.getHours()
    const isNight = hourOfDay < 6 || hourOfDay > 22
    const isActive = hourOfDay >= 8 && hourOfDay <= 20

    let baseHeartRate = 70
    if (isNight) baseHeartRate = 60
    if (isActive) baseHeartRate = 80

    let baseActivity = isActive ? 500 : 100
    if (isNight) baseActivity = 0

    data.push([
      timestamp.toISOString(),
      Math.max(50, Math.min(120, baseHeartRate + (Math.random() - 0.5) * 20)),
      Math.max(90, Math.min(100, 97 + (Math.random() - 0.5) * 6)),
      Math.round((98.6 + (Math.random() - 0.5) * 2) * 10) / 10,
      Math.max(0, baseActivity + (Math.random() - 0.5) * 200),
      Math.max(1, Math.min(10, Math.round(5 + (Math.random() - 0.5) * 6))),
    ])
  }

  // Convert to CSV format
  const csvContent = [headers.join(","), ...data.map((row) => row.join(","))].join("\n")

  return csvContent
}

export async function GET() {
  try {
    const csvData = generateCSVData()

    return new NextResponse(csvData, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="health-data-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to export health data" }, { status: 500 })
  }
}
