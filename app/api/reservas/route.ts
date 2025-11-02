import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { giftId, name } = await request.json()

    if (!giftId || !name) {
      return NextResponse.json({ error: "Nome e giftId são obrigatórios" }, { status: 400 })
    }

    console.log("[v1] POST /api/reservas - Tentando conectar ao banco")

    // Verifica se o presente existe
    const gift = await prisma.gift.findUnique({
      where: { id: giftId },
      include: { reserva: true },
    })

    if (!gift) {
      return NextResponse.json({ error: "Presente não encontrado" }, { status: 404 })
    }

    // Verifica se o presente já foi reservado
    if (gift.reserva) {
      return NextResponse.json({ error: "Este presente já foi reservado" }, { status: 400 })
    }

    // Cria usuário
    const user = await prisma.user.create({
      data: { name },
    })

    // Cria reserva
    const reserva = await prisma.reserva.create({
      data: {
        userId: user.id,
        giftId: gift.id,
      },
      include: {
        user: true,
      },
    })

    console.log("[v1] Reserva criada:", reserva.id)
    return NextResponse.json(reserva, { status: 201 })

  } catch (error) {
    console.error("[v1] Erro ao criar reserva:", error)
    return NextResponse.json({ error: "Erro ao criar reserva" }, { status: 500 })
  }
}
