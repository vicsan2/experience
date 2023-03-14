import type z from "zod"

export interface FormData<Fields> {
  fields: Fields
  errors?: z.inferFlattenedErrors<z.ZodType<any>>
}

export interface FormErrors {
  errors: z.inferFlattenedErrors<z.ZodType<any>>
}
