import type { ActionArgs } from "@remix-run/server-runtime"
import { redirect } from "react-router"
import { ValidatedForm } from "remix-validated-form"
import { TextField, FormButton } from "~/components"
import type { SignupFields } from "~/models/user.server"
import { createClient, validateUser } from "~/models/user.server"
import { providerSchema } from "~/schemas/signup"

export async function action({ request }: ActionArgs) {
  const formData = await request.formData()
  const result = await validateUser(formData)
  if (result) {
    return result
  }

  const formPayload = Object.fromEntries(formData) as unknown as SignupFields
  await createClient(formPayload)
  return redirect("/login", { headers: { "Set-Cookie": "signup=1" } })
}

export default function Provider() {
  return (
    <ValidatedForm
      className="w-full space-y-6 p-12"
      validator={providerSchema}
      method="post"
    >
      <h1>Provider Sign Up</h1>
      <TextField
        name="username"
        label="Display Name"
        helperText="This is the name clients will see when you contact them. Feel free to use an alias."
      />
      <TextField
        name="email"
        label="Email"
        type="email"
        helperText="Email used to log in."
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        helperText="Must be at least 8 characters."
      />
      <FormButton className="w-full">Sign Up</FormButton>
    </ValidatedForm>
  )
}
