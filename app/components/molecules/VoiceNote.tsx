import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid"
import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import type { TooltipProps } from "flowbite-react"
import { Tooltip } from "flowbite-react"
import { useAudio } from "react-use"

import { clsxInput } from "~/helpers/components"

interface VoiceNoteProps {
  voiceNoteUrl: string
  onPlay?: () => void
  placement?: TooltipProps["placement"]
  playing?: boolean
  className?: ClassValue | ClassValue[]
  rounded?: boolean
}

export default function VoiceNote({
  voiceNoteUrl,
  className,
  onPlay,
  placement,
  playing,
  rounded,
}: VoiceNoteProps) {
  const [audio, state, controls] = useAudio({
    src: voiceNoteUrl ?? "",
    autoPlay: false,
  })

  if (playing) {
    controls.play()
  }

  if (playing !== undefined && !playing && state.playing) {
    controls.pause()
  }

  const togglePlay = () => {
    if (state.playing) controls.pause()
    else controls.play()
  }

  return (
    <Tooltip
      content={state.playing ? "Pause audio" : "Play audio"}
      arrow={false}
      placement={placement ?? "top"}
    >
      <button
        onClick={(event) => {
          event.stopPropagation()
          if (onPlay) onPlay?.()
          else togglePlay()
        }}
        className={clsx(
          "bg-gray-600 p-2",
          {
            "rounded-full": rounded,
          },
          ...clsxInput(className)
        )}
      >
        {state.playing ? (
          <PauseIcon className="mx-auto h-5 w-5 text-blue-300" />
        ) : (
          <PlayIcon className="mx-auto h-5 w-5 text-blue-300" />
        )}
        {audio}
      </button>
    </Tooltip>
  )
}
