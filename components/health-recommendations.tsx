"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lightbulb, CheckCircle } from "lucide-react"
import { useState } from "react"

interface Recommendation {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  category: "exercise" | "nutrition" | "sleep" | "stress" | "medical"
  completed: boolean
  aiConfidence: number
}

export function HealthRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: "1",
      title: "Increase Daily Water Intake",
      description: "Based on your activity level, aim for 8-10 glasses of water daily to maintain optimal hydration.",
      priority: "high",
      category: "nutrition",
      completed: false,
      aiConfidence: 92,
    },
    {
      id: "2",
      title: "Take a 10-Minute Walk",
      description: "Your activity level is below target. A short walk can help improve circulation and mood.",
      priority: "medium",
      category: "exercise",
      completed: false,
      aiConfidence: 87,
    },
    {
      id: "3",
      title: "Practice Deep Breathing",
      description: "Your heart rate variability suggests stress. Try 5 minutes of deep breathing exercises.",
      priority: "medium",
      category: "stress",
      completed: false,
      aiConfidence: 78,
    },
    {
      id: "4",
      title: "Schedule Sleep Earlier",
      description: "Optimize your sleep schedule to get 7-8 hours of quality rest for better recovery.",
      priority: "low",
      category: "sleep",
      completed: false,
      aiConfidence: 85,
    },
  ])

  const toggleRecommendation = (id: string) => {
    setRecommendations((prev) => prev.map((rec) => (rec.id === id ? { ...rec, completed: !rec.completed } : rec)))
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          AI Health Recommendations
        </CardTitle>
        <CardDescription>Personalized suggestions based on your health data and patterns</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className={`p-4 rounded-lg border transition-all ${
              rec.completed ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{getCategoryIcon(rec.category)}</span>
                  <h4 className={`font-medium ${rec.completed ? "line-through text-muted-foreground" : ""}`}>
                    {rec.title}
                  </h4>
                  <Badge variant="outline" className={getPriorityColor(rec.priority)}>
                    {rec.priority}
                  </Badge>
                </div>
                <p className={`text-sm mb-2 ${rec.completed ? "text-muted-foreground" : "text-gray-600"}`}>
                  {rec.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>AI Confidence: {rec.aiConfidence}%</span>
                  {rec.completed && (
                    <>
                      <span>•</span>
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
                className="ml-4"
              >
                {rec.completed ? "Undo" : "Done"}
              </Button>
            </div>
          </div>
        ))}

        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground text-center">
            Recommendations are updated every hour based on your latest health data and AI analysis.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
