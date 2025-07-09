import { NextResponse } from "next/server"

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const alertId = params.id

    // In a real application, this would delete from the database
    // For now, we'll just simulate the deletion

    return NextResponse.json({
      success: true,
      alertId,
      deletedAt: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete alert" }, { status: 500 })
  }
}
