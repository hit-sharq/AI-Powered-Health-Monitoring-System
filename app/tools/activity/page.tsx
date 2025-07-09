"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Play, Pause, RotateCcw, Target, Footprints, Zap, Clock } from "lucide-react"
import { useState, useEffect } from "react"

export default function ActivityTrackerPage() {
  const [isTracking, setIsTracking] = useState(false)
  const [sessionTime, setSessionTime] = useState(0)
  const [steps, setSteps] = useState(0)
  const [calories, setCalories] = useState(0)
  const [distance, setDistance] = useState(0)

  const dailyGoals = {
    steps: 10000,
    calories: 500,
    distance: 8.0, // km
    activeMinutes: 30,
  }

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isTracking) {
      interval = setInterval(() => {
        setSessionTime((prev) => prev + 1)
        // Simulate activity data
        setSteps((prev) => prev + Math.floor(Math.random() * 3) + 1)
        setCalories((prev) => prev + Math.floor(Math.random() * 2))
        setDistance((prev) => prev + Math.random() * 0.02)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isTracking])

  const startTracking = () => {
    setIsTracking(true)
  }

  const stopTracking = () => {
    setIsTracking(false)
  }

  const resetSession = () => {
    setIsTracking(false)
    setSessionTime(0)
    setSteps(0)
    setCalories(0)
    setDistance(0)
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getActivityLevel = () => {
    if (sessionTime < 300) return { level: "Light", color: "text-blue-600" }
    if (sessionTime < 1800) return { level: "Moderate", color: "text-green-600" }
    return { level: "Intense", color: "text-red-600" }
  }

  const activityLevel = getActivityLevel()
  const stepsProgress = (steps / dailyGoals.steps) * 100
  const caloriesProgress = (calories / dailyGoals.calories) * 100
  const distanceProgress = (distance / dailyGoals.distance) * 100

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-green-500" />
          <h1 className="text-xl font-semibold">Activity Tracker</h1>
          {isTracking && (
            <Badge variant="secondary" className="animate-pulse">
              Tracking
            </Badge>
          )}
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* Session Overview */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Activity className={`h-16 w-16 text-green-500 ${isTracking ? "animate-bounce" : ""}`} />
              </div>
              <div className="text-4xl font-bold mb-2">{formatTime(sessionTime)}</div>
              <div className="text-lg text-muted-foreground mb-4">Active Time</div>
              <Badge variant="outline" className={`${activityLevel.color} border-current`}>
                {activityLevel.level} Activity
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Controls */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-center gap-4">
              {!isTracking ? (
                <Button onClick={startTracking} size="lg" className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Start Activity
                </Button>
              ) : (
                <Button onClick={stopTracking} variant="destructive" size="lg" className="flex items-center gap-2">
                  <Pause className="h-5 w-5" />
                  Stop Activity
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

        {/* Current Session Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Footprints className="h-4 w-4" />
                Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{steps.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">this session</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Calories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calories}</div>
              <p className="text-xs text-muted-foreground">burned</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="h-4 w-4" />
                Distance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{distance.toFixed(2)} km</div>
              <p className="text-xs text-muted-foreground">covered</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Pace
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {distance > 0 ? (sessionTime / 60 / distance).toFixed(1) : "0.0"}
              </div>
              <p className="text-xs text-muted-foreground">min/km</p>
            </CardContent>
          </Card>
        </div>

        {/* Daily Goals Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Goals Progress</CardTitle>
            <CardDescription>Track your progress towards daily fitness targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Footprints className="h-4 w-4" />
                  Steps Goal
                </span>
                <span>
                  {steps.toLocaleString()} / {dailyGoals.steps.toLocaleString()}
                </span>
              </div>
              <Progress value={Math.min(stepsProgress, 100)} />
              <p className="text-xs text-muted-foreground">
                {stepsProgress >= 100
                  ? "Goal achieved! 🎉"
                  : `${(dailyGoals.steps - steps).toLocaleString()} steps to go`}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Calories Goal
                </span>
                <span>
                  {calories} / {dailyGoals.calories}
                </span>
              </div>
              <Progress value={Math.min(caloriesProgress, 100)} />
              <p className="text-xs text-muted-foreground">
                {caloriesProgress >= 100 ? "Goal achieved! 🔥" : `${dailyGoals.calories - calories} calories to go`}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Distance Goal
                </span>
                <span>
                  {distance.toFixed(1)} km / {dailyGoals.distance} km
                </span>
              </div>
              <Progress value={Math.min(distanceProgress, 100)} />
              <p className="text-xs text-muted-foreground">
                {distanceProgress >= 100
                  ? "Goal achieved! 🏃‍♂️"
                  : `${(dailyGoals.distance - distance).toFixed(1)} km to go`}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Active Minutes Goal
                </span>
                <span>
                  {Math.floor(sessionTime / 60)} / {dailyGoals.activeMinutes} min
                </span>
              </div>
              <Progress value={Math.min((sessionTime / 60 / dailyGoals.activeMinutes) * 100, 100)} />
              <p className="text-xs text-muted-foreground">
                {sessionTime >= dailyGoals.activeMinutes * 60
                  ? "Goal achieved! ⏰"
                  : `${dailyGoals.activeMinutes - Math.floor(sessionTime / 60)} minutes to go`}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Activity Types */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Types</CardTitle>
            <CardDescription>Choose your activity type for more accurate tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="h-16 flex flex-col gap-1 bg-transparent">
                <span>🚶‍♂️</span>
                <span className="text-xs">Walking</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col gap-1 bg-transparent">
                <span>🏃‍♂️</span>
                <span className="text-xs">Running</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col gap-1 bg-transparent">
                <span>🚴‍♂️</span>
                <span className="text-xs">Cycling</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col gap-1 bg-transparent">
                <span>🏊‍♂️</span>
                <span className="text-xs">Swimming</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Health Benefits */}
        <Card>
          <CardHeader>
            <CardTitle>Health Benefits</CardTitle>
            <CardDescription>Benefits of regular physical activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-medium">Physical Benefits</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Improved cardiovascular health</li>
                  <li>• Stronger muscles and bones</li>
                  <li>• Better weight management</li>
                  <li>• Enhanced immune system</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Mental Benefits</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Reduced stress and anxiety</li>
                  <li>• Improved mood and energy</li>
                  <li>• Better sleep quality</li>
                  <li>• Enhanced cognitive function</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
