import type { Provider, User } from "@prisma/client"

import { prisma } from "~/db.server"

export async function getVisibleProviders() {
  return prisma.provider.findMany({ where: { visible: true } })
}

export async function getProviderById(userId: Provider["userId"]) {
  return prisma.provider.findUnique({ where: { userId } })
}

export async function getProviderByUserName(username: User["username"]) {
  return prisma.provider.findFirst({
    where: { user: { username } },
  })
}

export async function getUserByProviderId(userId: Provider["userId"]) {
  return prisma.user.findUnique({
    where: { id: userId },
  })
}