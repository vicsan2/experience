import type { Listing, Review } from "@prisma/client"
import { prisma } from "~/db.server"

export async function getAggregatedReviewsByUsername(
    username: Listing["username"]
  ) {
    return prisma.review.aggregate({
      where: { providerUsername: username },
      _avg: { rating: true },
      _count: { rating: true },
    })
  }

  export async function getReviewsByUsername(
    username: Review["providerUsername"],
    page: number
  ) {
    return prisma.review.findMany({
      where: { providerUsername: username },
      select: {
        censoredReviewerUsername: true,
        rating: true,
        id: true,
        createdAt: true,
        comment: true,
      },
      take: 4,
      skip: page > 1 ? (page - 1) * 4 : 0,
    })
  }