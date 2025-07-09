"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, Play, Pause, RotateCcw, TrendingUp, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"

export default function HeartRateMonitorPage() {
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [currentHeartRate, setCurrentHeartRate] = useState(72)
  const [readings, setReadings] = useState<number[]>([])
  const [sessionDuration, setSessionDuration] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isMonitoring) {
      interval = setInterval(() => {
        // Simulate heart rate readings
        const newReading = Math.floor(Math.random() * 40) + 60 // 60-100 bpm
        setCurrentHeartRate(newReading)
        setReadings((prev) => [...prev.slice(-19), newReading]) // Keep last 20 readings
        setSessionDuration((prev) => prev + 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isMonitoring])

  const startMonitoring = () => {
    setIsMonitoring(true)
    setSessionDuration(0)
    setReadings([])
  }

  const stopMonitoring = () => {
    setIsMonitoring(false)
  }

  const resetSession = () => {
    setIsMonitoring(false)
    setSessionDuration(0)
    setReadings([])
    setCurrentHeartRate(72)
  }

  const getHeartRateZone = (hr: number) => {
    if (hr < 60) return { zone: "Below Normal", color: "text-blue-600", bg: "bg-blue-50" }
    if (hr <= 100) return { zone: "Normal", color: "text-green-600", bg: "bg-green-50" }
    if (hr <= 150) return { zone: "Elevated", color: "text-yellow-600", bg: "bg-yellow-50" }
    return { zone: "High", color: "text-red-600", bg: "bg-red-50" }
  }

  const averageHeartRate = readings.length > 0 ? Math.round(readings.reduce((a, b) => a + b, 0) / readings.length) : 0
  const maxHeartRate = readings.length > 0 ? Math.max(...readings) : 0
  const minHeartRate = readings.length > 0 ? Math.min(...readings) : 0
  const heartRateZone = getHeartRateZone(currentHeartRate)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500" />
          <h1 className="text-xl font-semibold">Heart Rate Monitor</h1>
          {isMonitoring && (
            <Badge variant="destructive" className="animate-pulse">
              Live
            </Badge>
          )}
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* Current Reading */}
        <Card className={`${heartRateZone.bg} border-2`}>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Heart className={`h-16 w-16 ${heartRateZone.color} ${isMonitoring ? "animate-pulse" : ""}`} />
              </div>
              <div className="text-6xl font-bold mb-2">{currentHeartRate}</div>
              <div className="text-lg text-muted-foreground mb-4">beats per minute</div>
              <Badge variant="outline" className={`${heartRateZone.color} border-current`}>
                {heartRateZone.zone}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Controls */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-center gap-4">
              {!isMonitoring ? (
                <Button onClick={startMonitoring} size="lg" className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Start Monitoring
                </Button>
              ) : (
                <Button onClick={stopMonitoring} variant="destructive" size="lg" className="flex items-center gap-2">
                  <Pause className="h-5 w-5" />
                  Stop Monitoring
                </Button>
              )}
              <Button
                onClick={resetSession}
                variant="outline"
                size="lg"
                className="flex items-center gap-2 bg-transparent"
              >
                <RotateCcw className="h-5 w-5" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Session Statistics */}
        {readings.length > 0 && (
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Session Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.floor(sessionDuration / 60)}:{(sessionDuration % 60).toString().padStart(2, "0")}
                </div>
                <p className="text-xs text-muted-foreground">minutes:seconds</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average BPM</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageHeartRate}</div>
                <p className="text-xs text-muted-foreground">session average</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Maximum BPM</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{maxHeartRate}</div>
                <p className="text-xs text-muted-foreground">highest reading</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Minimum BPM</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{minHeartRate}</div>
                <p className="text-xs text-muted-foreground">lowest reading</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Real-time Chart */}
        {readings.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Real-time Heart Rate
              </CardTitle>
              <CardDescription>Live heart rate readings over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-center gap-1">
                {readings.map((reading, index) => (
                  <div
                    key={index}
                    className="bg-red-500 w-4 transition-all duration-300"
                    style={{
                      height: `${(reading / 200) * 100}%`,
                      opacity: index === readings.length - 1 ? 1 : 0.7 - (readings.length - index) * 0.03,
                    }}
                  />
                ))}
              </div>
              <div className="mt-4 text-center text-sm text-muted-foreground">Last {readings.length} readings</div>
            </CardContent>
          </Card>
        )}

        {/* Heart Rate Zones Guide */}
        <Card>
          <CardHeader>
            <CardTitle>Heart Rate Zones</CardTitle>
            <CardDescription>Understanding your heart rate ranges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-blue-800">Resting (50-60 BPM)</h4>
                  <p className="text-sm text-blue-600">Very relaxed state</p>
                </div>
                <Progress value={20} className="w-20" />
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-green-800">Normal (60-100 BPM)</h4>
                  <p className="text-sm text-green-600">Healthy resting heart rate</p>
                </div>
                <Progress value={60} className="w-20" />
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-yellow-800">Elevated (100-150 BPM)</h4>
                  <p className="text-sm text-yellow-600">Light to moderate exercise</p>
                </div>
                <Progress value={80} className="w-20" />
              </div>

              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-red-800">High (150+ BPM)</h4>
                  <p className="text-sm text-red-600">Intense exercise or stress</p>
                </div>
                <Progress value={100} className="w-20" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Important Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>• This is a demonstration tool and should not replace professional medical devices</p>
              <p>• Consult a healthcare provider if you experience irregular heart rhythms</p>
              <p>• Normal resting heart rate varies by age, fitness level, and individual factors</p>
              <p>• Seek immediate medical attention for chest pain or severe symptoms</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
