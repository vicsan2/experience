import type { TextInputProps } from "flowbite-react"
import { TextInput } from "flowbite-react"
import { useField } from "remix-validated-form"

import Field from "../atoms/Field"

interface TextFieldProps extends TextInputProps {
  label: string
  name: string
}

export default function TextField({
  name,
  label,
  helperText,
  className,
  ...props
}: TextFieldProps) {
  const { error, getInputProps } = useField(name)
  return (
    <Field className={className} name={name} label={label} error={error}>
      <TextInput
        name={name}
        color={error ? "failure" : undefined}
        helperText={error ?? helperText}
        {...getInputProps({ id: name })}
        {...props}
      />
    </Field>
  )
}
