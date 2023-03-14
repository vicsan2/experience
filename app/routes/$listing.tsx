import { useLoaderData } from "@remix-run/react"
import type { LoaderArgs } from "@remix-run/server-runtime"
import { json } from "@remix-run/server-runtime"
import { redirect } from "@remix-run/server-runtime"
import { Rating } from "flowbite-react"
import { Carousel } from "~/components"
import { getListingByUsername } from "~/models/listing.server"

export async function loader({ params }: LoaderArgs) {
  const { listing: providerUsername } = params
  if (!providerUsername) return redirect("/")
  const listing = await getListingByUsername(providerUsername)
  if (!listing) return redirect("/")
  const { name: _name, ...listingWithoutName } = listing
  return json(listingWithoutName)
}

export default function Listing() {
  const {
    username,
    rating,
    reviewsCount,
    location,
    photos,
    pronouns,
    language,
  } = useLoaderData<typeof loader>()
  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1>
          {username} <span className="text-lg">({pronouns.join("/")})</span>
        </h1>
        <div className="flex space-y-1 text-sm">
          <Rating>
            <Rating.Star />
            <p className="ml-2 font-bold text-gray-900 dark:text-white">
              {rating.toFixed(2)}
            </p>
            <span className="ml-2">({reviewsCount ?? "?"})</span>
            <span className="mx-2 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
          </Rating>
          <strong>{location}</strong>
          <span>{language.join()}</span>
        </div>
      </div>
      <div className="mx-auto h-[450px] overflow-hidden rounded-md">
        <Carousel
          photos={photos}
          slide={false}
          theme={{
            // @ts-ignore
            item: {
              base: "h-full w-full object-contain bg-gray-700",
            },
          }}
        />
      </div>
    </section>
  )
}
