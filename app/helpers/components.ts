import type { ClassValue } from "clsx"

export const clsxInput = (className: ClassValue | ClassValue[]) => {
  return Array.isArray(className) ? className : [className]
}
