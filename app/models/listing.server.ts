import type { Listing, Provider, User } from "@prisma/client"

import { getAggregatedReviewsByUsername } from "./reviews.server"

import { prisma } from "~/db.server"

export async function getListingByProviderId(userId: Provider["userId"]) {
  return prisma.listing.findUnique({
    where: { providerId: userId },
  })
}

export async function getListingByUsername(username: User["username"]) {
  const reviews = await getAggregatedReviewsByUsername(username)
  const listing = await prisma.listing.findFirst(
    {
      where: {
        provider: {
          user: {
            username
          }
        }
      },
      include: {
        voiceNote: {
          select: {
            url: true,
          },
        },
        provider: {
          select: {
            status: true,
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    }
  )

  return { listing, reviews }
}

export async function editListingById(
  id: Listing["id"],
  data: Listing
) {
  return prisma.listing.update({
    where: { id },
    data,
  })
}

export async function deleteListingById(id: Listing["id"]) {
  return prisma.listing.delete({
    where: { id },
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
          user: {
            select: {
              username: true,
            },
          },
        },
      },
      voiceNote: {
        select: {
          url: true,
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
