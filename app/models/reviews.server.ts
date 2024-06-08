import type { User } from "@prisma/client"

import { prisma } from "~/db.server"

export async function getAggregatedReviewsByUsername(
  username: User["username"]
) {
  return prisma.review.aggregate({
    where: { provider: { user: { username } } },
    _avg: { rating: true },
    _count: { rating: true },
  })
}

export async function getReviewsByUsername(
  username: User["username"],
  page: number
) {
  return prisma.review.findMany({
    where: { provider: { user: { username } } },
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