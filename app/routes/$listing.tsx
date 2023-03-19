import { Outlet, useLoaderData } from "@remix-run/react"
import type { LoaderArgs } from "@remix-run/server-runtime"
import { json } from "@remix-run/server-runtime"
import { redirect } from "@remix-run/server-runtime"
import { Rating } from "flowbite-react"
import { Carousel, VoiceNote } from "~/components"
import { getListingByUsername } from "~/models/listing.server"

export async function loader({ params }: LoaderArgs) {
  const { listing: providerUsername } = params
  if (!providerUsername) return redirect("/")
  const { listing, reviews } = await getListingByUsername(providerUsername)
  if (!listing) return redirect("/")
  const { name: _name, ...listingWithoutName } = listing
  const listingWithReviews = {
    ...listingWithoutName,
    ...reviews,
  }
  return json(listingWithReviews)
}

export default function Listing() {
  const {
    username,
    _count: { rating: ratingCount },
    _avg: { rating: ratingAvg },
    location,
    photos,
    pronouns,
    language,
    voiceNoteUrl,
  } = useLoaderData<typeof loader>()
  return (
    <div className="space-y-6">
      <section className="flex flex-row space-x-3 space-y-1">
        <div>
          <h1>
            {username}{" "}
            {pronouns.length > 0 && (
              <span className="text-lg">({pronouns.join("/")})</span>
            )}
          </h1>
          <Rating className="flex items-center space-y-1 text-sm">
            <Rating.Star />
            <p className="ml-2 font-bold text-gray-900 dark:text-white">
              {ratingAvg?.toFixed(2) ?? "--"}
            </p>
            <span className="ml-2">({ratingCount ?? "?"})</span>
            <span className="mx-2 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
            <strong>{location}</strong>
            <span>{language.join()}</span>
          </Rating>
        </div>
        {voiceNoteUrl && (
          <VoiceNote voiceNoteUrl={voiceNoteUrl} placement="right" />
        )}
      </section>
      <section className="mx-auto h-[450px] overflow-hidden rounded-md">
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
      </section>
      <section className="rounded-md bg-gray-700 p-6">
        <Rating className="font-bold text-gray-900 dark:text-white">
          <Rating.Star />
          <p className="ml-2">{ratingAvg?.toFixed(2) ?? "--"}</p>
          <span className="mx-2 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
          <p>{ratingCount} Reviews</p>
        </Rating>
        <hr className="mt-3 mb-3 bg-gray-600" />
        <Outlet />
      </section>
    </div>
  )
}
