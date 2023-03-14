import type { ClassValue } from "clsx"
import clsx from "clsx"

import { clsxInput } from "~/helpers/components"

interface PaperProps {
  children: React.ReactNode
  className?: ClassValue | ClassValue[]
}

export default function Container({ children, className }: PaperProps) {
  return (
    <section
      className={clsx(
        "flex max-w-4xl min-w-[500px] flex-col items-center justify-center rounded-xl bg-gray-700 shadow-md",
        ...clsxInput(className)
      )}
    >
      {children}
    </section>
  )
}
