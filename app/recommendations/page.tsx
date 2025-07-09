"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Lightbulb, CheckCircle, RefreshCw, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

interface Recommendation {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  category: "exercise" | "nutrition" | "sleep" | "stress" | "medical"
  completed: boolean
  aiConfidence: number
  estimatedImpact: number
  timeToComplete: string
  evidence: string[]
}

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchRecommendations = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/health-data/recommendations")
      const data = await response.json()
      setRecommendations(data.recommendations || [])
    } catch (error) {
      console.error("Failed to fetch recommendations:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRecommendations()
  }, [])

  const toggleRecommendation = async (id: string) => {
    try {
      const recommendation = recommendations.find((r) => r.id === id)
      await fetch(`/api/health-data/recommendations/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !recommendation?.completed,
        }),
      })

      setRecommendations((prev) => prev.map((rec) => (rec.id === id ? { ...rec, completed: !rec.completed } : rec)))
    } catch (error) {
      console.error("Failed to update recommendation:", error)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 border-red-600"
      case "medium":
        return "text-yellow-600 border-yellow-600"
      case "low":
        return "text-green-600 border-green-600"
      default:
        return "text-gray-600 border-gray-600"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "exercise":
        return "🏃‍♂️"
      case "nutrition":
        return "🥗"
      case "sleep":
        return "😴"
      case "stress":
        return "🧘‍♀️"
      case "medical":
        return "🏥"
      default:
        return "💡"
    }
  }

  const completedCount = recommendations.filter((r) => r.completed).length
  const completionRate = recommendations.length > 0 ? (completedCount / recommendations.length) * 100 : 0

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger />
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            <h1 className="text-xl font-semibold">Health Recommendations</h1>
            <Badge variant="outline" className="text-blue-600 border-blue-600">
              AI-Powered
            </Badge>
          </div>
          <Button variant="outline" size="sm" onClick={fetchRecommendations} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* Progress Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recommendations.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {recommendations.filter((r) => r.priority === "high").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completedCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(completionRate)}%</div>
              <Progress value={completionRate} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Personalized AI Recommendations
            </CardTitle>
            <CardDescription>
              AI-generated suggestions based on your health data patterns and medical guidelines
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {isLoading ? (
              <div className="text-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p>Generating personalized recommendations...</p>
              </div>
            ) : recommendations.length === 0 ? (
              <div className="text-center py-8">
                <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Recommendations Available</h3>
                <p className="text-muted-foreground">
                  We're analyzing your health data to generate personalized recommendations.
                </p>
              </div>
            ) : (
              recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className={`p-6 rounded-lg border transition-all ${
                    rec.completed ? "bg-green-50 border-green-200" : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{getCategoryIcon(rec.category)}</span>
                        <div className="flex-1">
                          <h4
                            className={`font-semibold text-lg ${rec.completed ? "line-through text-muted-foreground" : ""}`}
                          >
                            {rec.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className={getPriorityColor(rec.priority)}>
                              {rec.priority} priority
                            </Badge>
                            <Badge variant="outline">{rec.category}</Badge>
                            <span className="text-xs text-muted-foreground">{rec.timeToComplete}</span>
                          </div>
                        </div>
                      </div>

                      <p className={`text-sm mb-4 ${rec.completed ? "text-muted-foreground" : "text-gray-700"}`}>
                        {rec.description}
                      </p>

                      <div className="grid gap-4 md:grid-cols-2 mb-4">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">AI Confidence</p>
                          <div className="flex items-center gap-2">
                            <Progress value={rec.aiConfidence} className="flex-1" />
                            <span className="text-sm font-medium">{rec.aiConfidence}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Estimated Impact</p>
                          <div className="flex items-center gap-2">
                            <Progress value={rec.estimatedImpact} className="flex-1" />
                            <span className="text-sm font-medium">{rec.estimatedImpact}%</span>
                          </div>
                        </div>
                      </div>

                      {rec.evidence && rec.evidence.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-medium text-muted-foreground mb-2">Evidence-based on:</p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {rec.evidence.map((evidence, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                {evidence}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {rec.completed && (
                          <>
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            <span className="text-green-600">Completed</span>
                          </>
                        )}
                      </div>
                    </div>

                    <Button
                      variant={rec.completed ? "outline" : "default"}
                      size="sm"
                      onClick={() => toggleRecommendation(rec.id)}
                      className="ml-6"
                    >
                      {rec.completed ? "Mark Incomplete" : "Mark Complete"}
                    </Button>
                  </div>
                </div>
              ))
            )}

            <div className="pt-6 border-t">
              <p className="text-xs text-muted-foreground text-center">
                Recommendations are updated daily based on your latest health data, activity patterns, and medical
                research. Always consult with healthcare professionals for medical advice.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
