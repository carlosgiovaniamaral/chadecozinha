"use server";

import { prisma } from "@/lib/prisma";

export async function getGifts() {
  const gifts = await prisma.gift.findMany({
    where: { available: true },
    orderBy: { createdAt: "desc" },
  });
  return gifts;
}
