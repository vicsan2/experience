import { withZod } from "@remix-validated-form/with-zod"
import z from "zod"

const validAge = new Date()
validAge.setFullYear(validAge.getFullYear() - 18)

const userSchema = {
  username: z
    .string({
      required_error: "Display name is required",
    })
    .min(3, "Display name must be at least 3 characters")
    .max(20, "Display name must be at most 20 characters"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
}

export const clientSchema = withZod(
  z.object({
    ...userSchema,
    dateOfBirth: z.coerce
      .date({
        required_error: "Date of birth is required",
        invalid_type_error: "Date of birth must be a date",
      })
      .max(validAge, "You must be at least 18 years old"),
  })
)

export const providerSchema = withZod(z.object(userSchema))
