import type { SelectProps } from "flowbite-react"
import { Select } from "flowbite-react"
import { useField } from "remix-validated-form"

import Field from "../atoms/Field"

interface TextFieldProps extends SelectProps {
  label: string
  name: string
  options?: { value: string | number; label: string }[]
}

export default function SelectField({
  name,
  label,
  helperText,
  className,
  options,
  ...props
}: TextFieldProps) {
  const { error, getInputProps } = useField(name)
  return (
    <Field className={className} name={name} label={label} error={error}>
      <Select
        name={name}
        color={error ? "failure" : undefined}
        helperText={error ?? helperText}
        {...getInputProps({ id: name })}
        {...props}
      >
        {options?.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
    </Field>
  )
}
