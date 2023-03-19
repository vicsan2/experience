import type { ClassValue } from "clsx"
import clsx from "clsx"
import { clsxInput } from "~/helpers/components"

interface StatusProps {
  status: string
  className?: ClassValue | ClassValue[]
}

const statusColors: {
  [key: string]: string | undefined
} = {
  online: "bg-green-400",
}

export default function Status({ status, className }: StatusProps) {
  if (status in statusColors) {
    return (
      <div
        className={clsx(
          "h-4 w-4 rounded-full border-2 border-green-300",
          statusColors[status],
          ...clsxInput(className)
        )}
      />
    )
  }
  return null
}
