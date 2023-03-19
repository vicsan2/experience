import type { Listing, Provider } from "@prisma/client"
import { prisma } from "~/db.server"
import { getAggregatedReviewsByUsername } from "./reviews.server"

export async function getListingByProviderId(userId: Provider["userId"]) {
  return prisma.listing.findUnique({
    where: { providerId: userId },
  })
}

export async function getListingByUsername(username: Listing["username"]) {
  const reviews = await getAggregatedReviewsByUsername(username)
  const listing = await prisma.listing.findUnique({
    where: { username },
  })

  return { listing, reviews }
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
  const listings = await prisma.listing.findMany({
    take: 15,
    include: {
      _count: {
        select: {
          reviews: true,
        },
      },
      reviews: {
        select: {
          rating: true,
        },
      },
      provider: {
        select: {
          status: true,
        },
      },
    },
  })

  const ratedListings = listings.map(({ reviews, ...listing }) => {
    if (!reviews.length) return { avg: 0, ...listing }
    const total = reviews.reduce((acc, { rating }) => acc + rating, 0)
    const avg = total / reviews.length
    return { avg: avg ?? 0, ...listing }
  })

  return ratedListings
}
