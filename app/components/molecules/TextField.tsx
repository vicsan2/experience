import type { TextInputProps } from "flowbite-react"
import { Label, TextInput } from "flowbite-react"
import { useField } from "remix-validated-form"

interface TextFieldProps extends TextInputProps {
  label: string
  name: string
}

export default function TextField({
  name,
  label,
  helperText,
  ...props
}: TextFieldProps) {
  const { error, getInputProps } = useField(name)
  return (
    <div>
      <div className="mb-2 block">
        <Label
          htmlFor={name}
          color={error ? "failure" : undefined}
          value={label}
        />
      </div>
      <TextInput
        name={name}
        color={error ? "failure" : undefined}
        helperText={error ?? helperText}
        {...getInputProps({ id: name })}
        {...props}
      />
    </div>
  )
}
