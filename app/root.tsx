import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import {
  Form,
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react"
import { Avatar, Button, Dropdown, Flowbite, Navbar } from "flowbite-react"

import { getUser } from "./session.server"
import tailwindStylesheetUrl from "./styles/tailwind.css"
import globalStylesheetUrl from "./styles/global.css"
import theme from "./theme"
import { useOptionalUser } from "./utils"

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: globalStylesheetUrl },
  ]
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "The Experience",
  viewport: "width=device-width,initial-scale=1",
})

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
  })
}

export default function App() {
  const user = useOptionalUser()
  const { pathname } = useLocation()
  return (
    <html lang="en" className="h-full overflow-x-hidden">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex h-screen flex-col bg-gray-900 dark:text-white">
        {typeof window !== "undefined" ? (
          <Flowbite theme={{ theme }}>
            <Navbar fluid className="z-50">
              <Navbar.Brand href="/">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="mr-3 h-6 sm:h-9"
                  alt="Flowbite Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold">
                  Experience
                </span>
              </Navbar.Brand>
              <div className="flex gap-2 md:order-2">
                {user ? (
                  <Dropdown
                    inline
                    arrowIcon={false}
                    label={<Avatar alt="User settings" rounded />}
                  >
                    <Dropdown.Header>{user.username}</Dropdown.Header>
                    <Dropdown.Item>
                      <Form action="/logout" method="post">
                        <button type="submit">Logout</button>
                      </Form>
                    </Dropdown.Item>
                  </Dropdown>
                ) : (
                  <>
                    {!pathname.startsWith("/login") && (
                      <NavLink to="/login">
                        <Button>Login</Button>
                      </NavLink>
                    )}
                    {!pathname.startsWith("/signup") && (
                      <NavLink to="/signup">
                        <Button>Sign Up</Button>
                      </NavLink>
                    )}
                  </>
                )}
                <Navbar.Toggle />
              </div>
              {/* <Navbar.Collapse>
                <Navbar.Link href="/" active={location.pathname === "/"}>
                  Home
                </Navbar.Link>
              </Navbar.Collapse> */}
            </Navbar>
            <main className="w-100 overflow-y-auto p-6">
              <Outlet />
            </main>
          </Flowbite>
        ) : (
          <Outlet />
        )}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
