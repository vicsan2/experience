import type { ActionArgs, LoaderArgs } from "@remix-run/server-runtime"
import { json, redirect } from "@remix-run/server-runtime"
import { useField, ValidatedForm } from "remix-validated-form"
import { Container, FormButton, Paper, TextField } from "~/components"
import { loginSchema } from "~/schemas/login"
import { validationError } from "remix-validated-form"
import type { LoginFields } from "~/models/user.server"
import { verifyLogin } from "~/models/user.server"
import { createUserSession, getUserId } from "~/session.server"

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request)
  if (userId) return redirect("/")
  return json({})
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData()
  const result = await loginSchema.validate(formData)
  if (result.error) {
    return validationError(result.error)
  }
  const formPayload = Object.fromEntries(formData) as unknown as LoginFields
  const user = await verifyLogin(formPayload)
  if (!("id" in user)) return user
  return createUserSession({
    request,
    userId: user.id,
    redirectTo: "/",
    remember: true,
  })
}

export default function Login() {
  const { error } = useField("form", {
    formId: "login-form",
  })
  return (
    <Container>
      <Paper>
        <ValidatedForm
          id="login-form"
          className="w-full space-y-6 p-12"
          validator={loginSchema}
          method="post"
        >
          <h1 className="text-center">Login</h1>
          <TextField name="email" label="Email" type="email" />
          <TextField name="password" label="Password" type="password" />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <FormButton className="w-full" ignoreIsValid>
            Submit
          </FormButton>
        </ValidatedForm>
      </Paper>
    </Container>
  )
}
