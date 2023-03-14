import type { ClassValue } from "clsx"
import clsx from "clsx"

import { clsxInput } from "~/helpers/components"

interface ContainerProps {
  children: React.ReactNode
  className?: ClassValue | ClassValue[]
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <section
      className={clsx(
        "flex flex-col items-center justify-center",
        ...clsxInput(className)
      )}
    >
      {children}
    </section>
  )
}
