import { useLoaderData, useNavigate } from "@remix-run/react"
import type { LoaderArgs } from "@remix-run/server-runtime"
import { json } from "@remix-run/server-runtime"
import { useState } from "react"
import { ListingCard } from "~/components"
import { getListings } from "~/models/listing.server"

export async function loader({ request }: LoaderArgs) {
  const listings = await getListings()
  return json(listings)
}

export default function Index() {
  const listings = useLoaderData<typeof loader>()

  const navigate = useNavigate()

  const [playing, setPlaying] = useState<number | undefined>(undefined)

  const handlePlay = (i: number) => {
    if (playing === i) {
      setPlaying(undefined)
    } else {
      setPlaying(i)
    }
  }

  return (
    <section className="container mx-auto grid max-w-fit grid-flow-row grid-cols-2 gap-9 pt-9 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {listings?.map((listing, i) => (
        <ListingCard
          key={listing.id}
          listing={listing}
          onClick={() => navigate(`/${listing.username}?page=1`)}
          onPlay={() => handlePlay(i)}
          playing={playing === i ? true : false}
        />
      ))}
    </section>
  )
}
