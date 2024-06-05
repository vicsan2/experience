import type { TextareaProps } from "flowbite-react"
import { Textarea } from "flowbite-react"
import { useField } from "remix-validated-form"
import Field from "../atoms/Field"

interface TextFieldProps extends TextareaProps {
  label: string
  name: string
}

export default function TextareaField({
  name,
  label,
  helperText,
  className,
  ...props
}: TextFieldProps) {
  const { error, getInputProps } = useField(name)
  return (
    <Field className={className} name={name} label={label} error={error}>
      <Textarea
        name={name}
        color={error ? "failure" : undefined}
        helperText={error ?? helperText}
        {...getInputProps({ id: name })}
        {...props}
      />
    </Field>
  )
}
