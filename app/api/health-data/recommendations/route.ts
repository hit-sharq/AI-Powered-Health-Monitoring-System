import { NextResponse } from "next/server"

// Simulate AI-powered health recommendations
function generateRecommendations() {
  const recommendations = [
    {
      id: "rec_hydration_001",
      title: "Increase Daily Water Intake",
      description:
        "Based on your activity level and environmental factors, your hydration needs have increased. Aim for 8-10 glasses of water daily to maintain optimal cellular function and energy levels.",
      priority: "high" as const,
      category: "nutrition" as const,
      completed: false,
      aiConfidence: 94,
      estimatedImpact: 85,
      timeToComplete: "Ongoing daily habit",
      evidence: [
        "Activity level increased by 15% this week",
        "Environmental temperature above average",
        "Urine color analysis suggests mild dehydration",
      ],
    },
    {
      id: "rec_exercise_002",
      title: "Add 15-Minute Morning Walk",
      description:
        "Your cardiovascular health metrics suggest benefit from low-intensity cardio. A morning walk can improve circulation, boost mood, and enhance metabolic function throughout the day.",
      priority: "medium" as const,
      category: "exercise" as const,
      completed: false,
      aiConfidence: 89,
      estimatedImpact: 78,
      timeToComplete: "15 minutes daily",
      evidence: [
        "Resting heart rate slightly elevated",
        "Step count below recommended 8,000 daily",
        "Morning cortisol levels suggest stress",
      ],
    },
    {
      id: "rec_stress_003",
      title: "Practice Deep Breathing Exercises",
      description:
        "Your heart rate variability and stress indicators suggest elevated stress levels. Deep breathing exercises can activate the parasympathetic nervous system and reduce cortisol production.",
      priority: "high" as const,
      category: "stress" as const,
      completed: false,
      aiConfidence: 91,
      estimatedImpact: 82,
      timeToComplete: "5-10 minutes, 2-3 times daily",
      evidence: [
        "Heart rate variability below optimal range",
        "Sleep quality decreased by 12%",
        "Stress biomarkers elevated in recent data",
      ],
    },
    {
      id: "rec_sleep_004",
      title: "Optimize Sleep Schedule",
      description:
        "Your sleep patterns show inconsistency affecting recovery and cognitive function. Establishing a regular sleep-wake cycle can improve sleep quality and overall health metrics.",
      priority: "medium" as const,
      category: "sleep" as const,
      completed: false,
      aiConfidence: 87,
      estimatedImpact: 75,
      timeToComplete: "2-3 weeks to establish routine",
      evidence: [
        "Bedtime varies by more than 2 hours nightly",
        "REM sleep percentage below optimal",
        "Morning recovery metrics inconsistent",
      ],
    },
    {
      id: "rec_nutrition_005",
      title: "Increase Omega-3 Rich Foods",
      description:
        "Based on your cardiovascular and cognitive health goals, increasing omega-3 fatty acids through fish, walnuts, or flaxseeds can support heart and brain function.",
      priority: "low" as const,
      category: "nutrition" as const,
      completed: false,
      aiConfidence: 83,
      estimatedImpact: 70,
      timeToComplete: "Incorporate into weekly meal planning",
      evidence: [
        "Inflammatory markers slightly elevated",
        "Cognitive performance metrics trending down",
        "Dietary analysis shows omega-3 deficiency",
      ],
    },
    {
      id: "rec_medical_006",
      title: "Schedule Routine Health Checkup",
      description:
        "Your health data suggests it's time for a comprehensive health assessment. Regular checkups can detect issues early and optimize your health management plan.",
      priority: "medium" as const,
      category: "medical" as const,
      completed: false,
      aiConfidence: 95,
      estimatedImpact: 90,
      timeToComplete: "1-2 hours appointment",
      evidence: [
        "Last checkup was 8 months ago",
        "Several metrics showing gradual changes",
        "Age-appropriate screening recommendations",
      ],
    },
  ]

  // Randomly select 3-5 recommendations
  const numRecs = Math.floor(Math.random() * 3) + 3
  const selectedRecs = recommendations.sort(() => Math.random() - 0.5).slice(0, numRecs)

  return selectedRecs
}

export async function GET() {
  try {
    const recommendations = generateRecommendations()

    return NextResponse.json({
      recommendations,
      totalRecommendations: recommendations.length,
      generatedAt: new Date().toISOString(),
      nextUpdate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate health recommendations" }, { status: 500 })
  }
}
