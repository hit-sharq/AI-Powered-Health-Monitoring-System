import { NextResponse } from "next/server"

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()
    const { completed } = body

    // In a real application, you would update the recommendation in your database
    // For now, we'll simulate the update
    console.log(`Updating recommendation ${id}: completed = ${completed}`)

    return NextResponse.json({
      success: true,
      message: "Recommendation updated successfully",
      recommendationId: id,
      completed,
      updatedAt: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update recommendation" }, { status: 500 })
  }
}
