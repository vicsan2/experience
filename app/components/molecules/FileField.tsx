import type { FileInputProps } from "flowbite-react"
import { FileInput } from "flowbite-react"
import { useField } from "remix-validated-form"
import Field from "../atoms/Field"

interface TextFieldProps extends FileInputProps {
  label: string
  name: string
}

export default function FileField({
  name,
  label,
  helperText,
  className,
  ...props
}: TextFieldProps) {
  const { error, getInputProps } = useField(name)
  return (
    <Field className={className} name={name} label={label} error={error}>
      <FileInput
        name={name}
        color={error ? "failure" : undefined}
        helperText={error ?? helperText}
        {...getInputProps({ id: name })}
        {...props}
      />
    </Field>
  )
}
