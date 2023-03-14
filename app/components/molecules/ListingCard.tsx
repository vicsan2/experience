import type { Listing } from "@prisma/client"
import { Card, Rating, Tooltip } from "flowbite-react"
import { PauseIcon, PlayIcon, UserIcon } from "@heroicons/react/24/solid"
import { useAudio } from "react-use"
import Carousel from "./Carousel"

interface ListingCardProps {
  listing: Listing
  onClick?: () => void
  onPlay?: () => void
  playing?: boolean
}

export default function ListingCard({
  listing: {
    username,
    description,
    rating,
    reviewsCount,
    voiceNoteUrl,
    thumbnails,
    location,
  },
  onClick,
  onPlay,
  playing,
}: ListingCardProps) {
  const [audio, state, controls] = useAudio({
    src: voiceNoteUrl ?? "",
    autoPlay: false,
  })

  if (playing) {
    controls.play()
  }

  if (!playing && state.playing) {
    controls.pause()
  }

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
              <Tooltip
                content={state.playing ? "Pause audio" : "Play audio"}
                arrow={false}
                placement="top"
              >
                <button
                  onClick={(event) => {
                    event.stopPropagation()
                    onPlay?.()
                  }}
                  className="rounded-full bg-gray-100 p-3"
                >
                  {state.playing ? (
                    <PauseIcon className="h-6 w-6 text-blue-100" />
                  ) : (
                    <PlayIcon className="h-6 w-6 text-blue-100" />
                  )}
                  {audio}
                </button>
              </Tooltip>
            </div>
          )}
          <div className="flex text-sm">
            <Rating>
              <Rating.Star />
              <p className="ml-2 font-bold text-gray-900 dark:text-white">
                {rating.toFixed(2)}
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
