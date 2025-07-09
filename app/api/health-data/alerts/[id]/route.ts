import { NextResponse } from "next/server"

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // In a real application, you would delete the alert from your database
    // For now, we'll simulate the deletion
    console.log(`Deleting alert: ${id}`)

    return NextResponse.json({
      success: true,
      message: "Alert deleted successfully",
      alertId: id,
      deletedAt: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete alert" }, { status: 500 })
  }
}
