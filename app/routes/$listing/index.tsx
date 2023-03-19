import { useLoaderData, useSearchParams } from "@remix-run/react"
import type { LoaderArgs } from "@remix-run/server-runtime"
import { json } from "@remix-run/server-runtime"
import { redirect } from "@remix-run/server-runtime"
import { Avatar, Rating, Pagination } from "flowbite-react"
import { readableDate } from "~/helpers/client"
import { getReviewsByUsername } from "~/models/reviews.server"
import { useMatchesData } from "~/utils"
import type { loader as listingLoader } from "../$listing"

export async function loader({ params, request }: LoaderArgs) {
  const { listing: providerUsername } = params
  if (!providerUsername) return redirect("/")
  const reviewsPage = new URL(request.url).searchParams.get("page")
  const reviews = await getReviewsByUsername(
    providerUsername,
    parseInt(reviewsPage ?? "0", 10)
  )
  return json(reviews)
}

export default function Reviews() {
  const reviews = useLoaderData<typeof loader>()
  const {
    _count: { rating: ratingCount },
  } = useMatchesData<typeof listingLoader>("routes/$listing")

  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = parseInt(searchParams.get("page") ?? "0", 10)

  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page) })
  }

  return (
    <div className="flex flex-col divide-y divide-gray-600">
      {reviews.map((review) => (
        <div className="py-3" key={review.id}>
          <div className="flex flex-row items-start space-x-4">
            <Avatar rounded />
            <div className="flex flex-col space-y-3">
              <div className="flex flex-col">
                <div className="flex flex-row gap-2 items-center">
                  <h2>{review.censoredReviewerUsername}</h2>
                  <Rating>
                    <Rating.Star />
                    <p className="ml-2 font-bold">{review.rating}</p>
                  </Rating>
                </div>
                <span className="text-sm font-semibold text-gray-300">
                  {readableDate(new Date(review.createdAt))}
                </span>
              </div>
              <div>
                <p>{review.comment}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="flex items-center justify-center pt-3 text-center">
        {reviews.length ? (
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={Math.ceil(ratingCount / 4)}
            showIcons
          />
        ) : (
          <div className="py-6 w-full">No reviews yet</div>
        )}
      </div>
    </div>
  )
}
