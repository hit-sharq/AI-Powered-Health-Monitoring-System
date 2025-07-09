import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Target, CheckCircle, Clock } from "lucide-react"

export default function RecommendationsPage() {
  const recommendations = [
    {
      id: "1",
      title: "Increase Daily Water Intake",
      description: "Based on your activity level and body metrics, you should aim for 10-12 glasses of water daily. Current intake appears insufficient based on hydration markers.",
      priority: "high",
      category: "nutrition",
      aiConfidence: 92,
      estimatedImpact: "High",
      timeToComplete: "Ongoing",
      status: "active",
      progress: 0,
      evidence: [
        "Heart rate variability suggests dehydration",
        "Activity level vs. fluid intake ratio is suboptimal",
        "Temperature regulation patterns indicate need for more fluids"
      ],
      actionSteps: [
        "Set hourly water reminders",
        "Carry a water bottle throughout the day",
        "Monitor urine color as hydration indicator"
      ]
    },
    {
      id: "2",
      title: "Implement 15-Minute Morning Exercise",
      description: "Your cardiovascular metrics and activity patterns suggest benefit from consistent morning exercise. This can improve heart rate variability and overall fitness.",
      priority: "high",
      category: "exercise",
      aiConfidence: 88,
      estimatedImpact: "High",
      timeToComplete: "2-3 weeks to establish habit",
      status: "in-progress",
      progress: 35,
      evidence: [
        "Resting heart rate could be improved",
        "Activity levels are below optimal range",
        "Morning cortisol patterns suggest exercise would be beneficial"
      ],
      actionSteps: [
        "Start with 5-minute walks",
        "Gradually increase to 15 minutes",
        "Include light stretching or yoga"
      ]
    },
    {
      id: "3",
      title: "Optimize Sleep Schedule",
      description: "Your heart rate and temperature patterns suggest irregular sleep. Consistent sleep timing can improve recovery and overall health metrics.",
      priority: "medium",
      category: "sleep",
      aiConfidence: 85,
      estimatedImpact: "Medium",
      timeToComplete: "1-2 weeks",
      status: "active",
      progress: 0,
      evidence: [
        "Heart rate variability shows poor recovery patterns",
        "Temperature regulation suggests disrupted circadian rhythm",
        "Activity patterns indicate fatigue during peak hours"
      ],
      actionSteps: [
        "Set consistent bedtime and wake time",
        "Create a relaxing bedtime routine",
        "Limit screen time 1 hour before bed"
      ]
    },
    {
      id: "4",
      title: "Practice Stress Management Techniques",
      description: "Elevated heart rate patterns during rest periods suggest chronic stress. Implementing stress reduction techniques could improve overall health metrics.",
      priority: "medium",
      category: "stress",
      aiConfidence: 78,
      estimatedImpact: "Medium",
      timeToComplete: "Ongoing",
      status: "completed",
      progress: 100,
      evidence: [
        "Heart rate spikes during typical rest periods",
        "Blood pressure patterns suggest stress response",
        "Sleep quality metrics indicate stress impact"
      ],
      actionSteps: [
        "Practice deep breathing exercises",
        "Try meditation or mindfulness apps",
        "Consider yoga or tai chi"
      ]
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 border-red-600 bg-red-50"
      case "medium": return "text-yellow-600 border-yellow-600 bg-yellow-50"
      case "low": return "text-green-600 border-green-600 bg-green-50"
      default: return "text-gray-600 border-gray-600 bg-gray-50"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "exercise": return "🏃‍♂️"
      case "nutrition": return "🥗"
      case "sleep": return "😴"
      case "stress": return "🧘‍♀️"
      case "medical": return "🏥"
      default: return "💡"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-progress": return <Clock className="h-4 w-4 text-yellow-600" />
      case "active": return <Target className="h-4 w-4 text-blue-600" />
      default: return <Lightbulb className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Health Recommendations</h1>
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            AI-Powered
          </Badge>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Recommendations</p>
                  <p className="text-2xl font-bold">{recommendations.length}</p>
                </div>
                <Lightbulb className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                  <p className="text-2xl font-bold text-red-600">
                    {recommendations.filter(r => r.priority === "high").length}
                  </p>
                </div>
                <Target className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {recommendations.filter(r => r.status === "in-progress").length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {recommendations.filter(r => r.status === "completed").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations List */}
        <div className="space-y-6">
          {recommendations.map((rec) => (
            <Card key={
