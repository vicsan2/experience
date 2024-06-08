import { json, redirect } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import type { LoaderArgs } from "@remix-run/server-runtime"

import { Container, Paper } from "~/components"
import { getUserId } from "~/session.server"

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
