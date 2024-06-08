import { Label } from "flowbite-react"

interface FieldProps {
  label: string
  name: string
  className?: string
  children: React.ReactNode
  error?: string
}

export default function Field({
  name,
  label,
  className,
  children,
  error,
}: FieldProps) {
  return (
    <div className={className}>
      <div className="mb-2 block">
        <Label
          htmlFor={name}
          color={error ? "failure" : undefined}
          value={label}
        />
      </div>
      {children}
    </div>
  )
}
