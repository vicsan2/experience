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
}

export default function VoiceNote({
  voiceNoteUrl,
  className,
  onPlay,
  placement,
  playing,
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
          "rounded-bl-xl w-12 bg-gray-100 p-2",
          ...clsxInput(className)
        )}
      >
        {state.playing ? (
          <PauseIcon className="h-5 w-5 mx-auto text-blue-100" />
        ) : (
          <PlayIcon className="h-5 w-5 mx-auto text-blue-100" />
        )}
        {audio}
      </button>
    </Tooltip>
  )
}
