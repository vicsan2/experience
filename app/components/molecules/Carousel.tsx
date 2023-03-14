import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid"
import clsx from "clsx"
import type { CarouselProps as FlowbiteCarouselProps } from "flowbite-react"
import { Carousel as FlowbiteCarousel } from "flowbite-react"
import { useMemo, useState } from "react"

interface CarouselProps extends FlowbiteCarouselProps {
  photos: string[]
  altText?: string
  imgOnlick?: () => void
  captions?: string[]
}

export default function Carousel({
  photos,
  imgOnlick,
  altText,
  captions,
  ...props
}: CarouselProps) {
  const [hovering, setHovering] = useState(false)
  const [error, setError] = useState<{ [key: number]: boolean }>({})

  const loadedPhotos = useMemo(
    () => photos?.filter((_photo, index) => !error[index]),
    [error, photos]
  )

  return (
    <FlowbiteCarousel
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      leftControl={
        <ArrowLeftCircleIcon
          className={clsx("h-9 w-9 text-white opacity-0 transition-opacity", {
            "opacity-100": hovering,
          })}
        />
      }
      rightControl={
        <ArrowRightCircleIcon
          className={clsx("h-9 w-9 text-white opacity-0 transition-opacity", {
            "opacity-100": hovering,
          })}
        />
      }
      {...props}
    >
      {loadedPhotos.map((photo, i) => (
        <img
          onClick={imgOnlick}
          key={`${photo}-${i}`}
          src={photo}
          alt={altText}
          onError={() => setError({ ...error, [i]: true })}
        />
      ))}
    </FlowbiteCarousel>
  )
}
