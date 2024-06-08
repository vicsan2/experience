import type { Client } from "@prisma/client"

import { prisma } from "~/db.server"

export async function getClientById(userId: Client["userId"]) {
  return prisma.client.findUnique({ where: { userId } })
}

export async function getUserByClientId(userId: Client["userId"]) {
  return prisma.user.findUnique({
    where: { id: userId },
  })
}