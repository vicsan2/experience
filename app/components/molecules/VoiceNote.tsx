import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid"
import type { TooltipProps } from "flowbite-react"
import { Tooltip } from "flowbite-react"
import { useAudio } from "react-use"

interface VoiceNoteProps {
  voiceNoteUrl: string
  onPlay?: () => void
  placement?: TooltipProps["placement"]
  playing?: boolean
}

export default function VoiceNote({
  voiceNoteUrl,
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
  )
}
