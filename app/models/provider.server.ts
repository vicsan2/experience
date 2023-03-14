import type { Provider } from "@prisma/client"
import { prisma } from "~/db.server"

export async function getVisibleProviders() {
  return prisma.provider.findMany({ where: { visible: true } })
}

export async function getProviderById(userId: Provider["userId"]) {
  return prisma.provider.findUnique({ where: { userId } })
}

export async function getProviderByUserName(username: Provider["username"]) {
  return prisma.provider.findUnique({
    where: { username },
  })
}

export async function getUserByProviderId(userId: Provider["userId"]) {
  return prisma.user.findUnique({
    where: { id: userId },
  })
}

export async function getUserByProviderUsername(
  username: Provider["username"]
) {
  return prisma.user.findUnique({
    where: { username },
  })
}
