import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const gifts = await prisma.gift.findMany({
      include: { reserva: true }, // traz se já está reservado
    });

    const giftsWithAvailability = gifts.map((gift) => ({
      ...gift,
      available: !gift.reserva, // true se não tiver reserva
    }));

    return NextResponse.json(giftsWithAvailability);
  } catch (error) {
    console.error("Erro ao buscar presentes:", error);
    return NextResponse.json({ error: "Erro ao buscar presentes" }, { status: 500 });
  }
}
