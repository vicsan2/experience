import { UserIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import { Card, Rating } from "flowbite-react"

import Status from "../atoms/Status"

import Carousel from "./Carousel"
import VoiceNote from "./VoiceNote"

import type { getListings } from "~/models/listing.server"



interface ListingCardProps {
  listing: Awaited<ReturnType<typeof getListings>>[0]
  onClick?: () => void
  onPlay?: () => void
  playing?: boolean
}

export default function ListingCard({
  listing: {
    provider: { user: { username } },
    description,
    _count: { reviews: reviewsCount },
    voiceNote,
    thumbnails,
    location,
    avg,
    provider: { status },
  },
  onClick,
  onPlay,
  playing,
}: ListingCardProps) {
  return (
    <div className="max-w-[200px] select-none" onClick={onClick}>
      <Card className="cursor-pointer">
        <div className="relative h-48 overflow-hidden bg-gray-800 rounded-t-lg">
          {thumbnails?.length > 0 ? (
            <Carousel
              onClick={(event) => event.stopPropagation()}
              altText={username}
              imgOnlick={onClick}
              slide={false}
              indicators={false}
              photos={thumbnails}
            />
          ) : (
            <div className="absolute flex justify-center w-full -bottom-6">
              <UserIcon className="h-36 w-36" />
            </div>
          )}
        </div>
        <div className="relative p-3 space-y-1">
          {voiceNote && (
            <VoiceNote
              className="absolute top-0 right-0 w-12 rounded-bl-xl"
              voiceNoteUrl={voiceNote.url}
              onPlay={onPlay}
              playing={playing}
            />
          )}
          <Rating className="flex items-center text-sm">
            <Rating.Star />
            <p className="ml-2 font-bold text-gray-900 dark:text-white">
              {reviewsCount > 0 ? avg.toFixed(2) : "--"}
            </p>
            <span
              className={clsx(
                "mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400",
                {
                  "mt-0.5": reviewsCount === 0,
                }
              )}
            />
            <span>({reviewsCount ?? "?"})</span>
            {status && <Status status={status} className="ml-2" />}
          </Rating>
          <p className="text-xs truncate">{location}</p>
          <h3 className="text-lg font-bold truncate">{username}</h3>
          <p className="text-sm truncate">{description}</p>
        </div>
      </Card>
    </div>
  )
}
