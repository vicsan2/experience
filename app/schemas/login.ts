import { withZod } from "@remix-validated-form/with-zod"
import z from "zod"

export const loginSchema = withZod(
  z.object({
    email: z.string({
      required_error: "Username is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
  })
)
