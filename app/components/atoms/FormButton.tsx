import type { ButtonProps } from "flowbite-react"
import { Spinner } from "flowbite-react"
import { Button } from "flowbite-react"
import { useFormContext, useIsSubmitting } from "remix-validated-form"

interface FormButtonProps extends Omit<ButtonProps, "type"> {
  ignoreIsValid?: boolean
}

export default function FormButton({
  children,
  disabled,
  ignoreIsValid,
  ...props
}: FormButtonProps) {
  const isSubmitting = useIsSubmitting()
  const { isValid } = useFormContext()
  const formDisabled = isSubmitting || ignoreIsValid ? false : !isValid

  return (
    <Button type="submit" disabled={formDisabled || disabled} {...props}>
      {isSubmitting && (
        <div className="mr-3">
          <Spinner size="sm" />
        </div>
      )}
      {children}
    </Button>
  )
}
