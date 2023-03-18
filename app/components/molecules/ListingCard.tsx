import type { Listing } from "@prisma/client"
import { Card, Rating } from "flowbite-react"
import { UserIcon } from "@heroicons/react/24/solid"
import Carousel from "./Carousel"
import VoiceNote from "./VoiceNote"

interface ListingCardProps {
  listing: Listing & {
    _count: {
      reviews: number
    }
    avg: number
  }
  onClick?: () => void
  onPlay?: () => void
  playing?: boolean
}

export default function ListingCard({
  listing: {
    username,
    description,
    _count: { reviews: reviewsCount },
    voiceNoteUrl,
    thumbnails,
    location,
    avg,
  },
  onClick,
  onPlay,
  playing,
}: ListingCardProps) {
  return (
    <div className="max-w-[204px] select-none" onClick={onClick}>
      <Card className="cursor-pointer">
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          {thumbnails?.length > 0 ? (
            <Carousel
              onClick={(event) => event.stopPropagation()}
              imgOnlick={onClick}
              slide={false}
              indicators={false}
              photos={thumbnails}
            />
          ) : (
            <div className="absolute -bottom-6 flex w-full justify-center">
              <UserIcon className="h-36 w-36" />
            </div>
          )}
        </div>
        <div className="relative m-3 space-y-1">
          {voiceNoteUrl && (
            <div className="absolute right-0">
              <VoiceNote
                voiceNoteUrl={voiceNoteUrl}
                onPlay={onPlay}
                playing={playing}
              />
            </div>
          )}
          <div className="flex text-sm">
            <Rating>
              <Rating.Star />
              <p className="ml-2 font-bold text-gray-900 dark:text-white">
                {avg.toFixed(2)}
              </p>
              <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
              <span>({reviewsCount ?? "?"})</span>
            </Rating>
          </div>
          <span className="text-xs">{location}</span>
          <h3 className="truncate text-lg font-bold">{username}</h3>
          <p className="truncate text-sm">{description}</p>
        </div>
      </Card>
    </div>
  )
}
