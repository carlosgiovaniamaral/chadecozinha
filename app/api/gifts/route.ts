import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const gifts = await prisma.gift.findMany({
      include: { reserva: true },
    })

    const giftsWithAvailability = gifts.map((gift) => ({
      ...gift,
      available: !gift.reserva,
    }))

    return NextResponse.json(giftsWithAvailability)
  } catch (error) {
    console.error("Erro ao buscar presentes:", error)
    // Retorna array vazio, não quebra o front
    return NextResponse.json([], { status: 500 })
  }
}
