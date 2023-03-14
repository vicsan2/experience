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

export async function editListingByUsername(
  username: Listing["username"],
  data: Listing
) {
  return prisma.listing.update({
    where: { username },
    data,
  })
}

export async function deleteListingByUsername(username: Listing["username"]) {
  return prisma.listing.delete({
    where: { username },
  })
}

export async function getListings() {
  return prisma.listing.findMany({
    take: 15,
  })
}
