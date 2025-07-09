import { NextResponse } from "next/server"

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const recommendationId = params.id
    const body = await request.json()
    const { completed } = body

    // In a real application, this would update the database
    // For now, we'll just simulate the update

    return NextResponse.json({
      success: true,
      recommendationId,
      completed,
      updatedAt: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update recommendation" }, { status: 500 })
  }
}
