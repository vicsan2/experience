import type { Listing, Provider } from "@prisma/client"
import { prisma } from "~/db.server"

export async function getListingByProviderId(userId: Provider["userId"]) {
  return prisma.listing.findUnique({
    where: { providerId: userId },
  })
}

export async function getListingByUsername(username: Listing["username"]) {
  return prisma.listing.findUnique({
    where: { username },
  })
}
