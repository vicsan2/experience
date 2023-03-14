import type { LoaderArgs } from "@remix-run/server-runtime"
import { json, redirect } from "@remix-run/node"

import { getUserId } from "~/session.server"
import { Outlet } from "@remix-run/react"
import { Container, Paper } from "~/components"

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request)
  if (userId) return redirect("/")
  return json({})
}

export default function SignUp() {
  return (
    <Container>
      <Paper>
        <Outlet />
      </Paper>
    </Container>
  )
}
