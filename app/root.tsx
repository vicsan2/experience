import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import { Avatar, Button, Dropdown, Flowbite, Navbar } from "flowbite-react"

import { getUser } from "./session.server"
import tailwindStylesheetUrl from "./styles/tailwind.css"
import theme from "./theme"
import { useOptionalUser } from "./utils"

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }]
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
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        {typeof window !== "undefined" ? (
          <Flowbite theme={{ theme }}>
            <Navbar fluid>
              <Navbar.Brand href="/">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="mr-3 h-6 sm:h-9"
                  alt="Flowbite Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                  Experience
                </span>
              </Navbar.Brand>
              <Navbar.Collapse>
                <Navbar.Link href="/" active={location.pathname === "/"}>
                  Home
                </Navbar.Link>
              </Navbar.Collapse>
              <div className="flex gap-2 md:order-2">
                {user ? (
                  <Dropdown
                    label={
                      <Avatar
                        alt="User settings"
                        img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        rounded
                      />
                    }
                  >
                    <Dropdown.Header>user.username</Dropdown.Header>
                  </Dropdown>
                ) : (
                  <>
                    <NavLink to="/login">
                      <Button>Login</Button>
                    </NavLink>
                    <NavLink to="/signup">
                      <Button>Sign Up</Button>
                    </NavLink>
                  </>
                )}
                <Navbar.Toggle />
              </div>
            </Navbar>
            <main className="relative bg-white sm:flex sm:items-center sm:justify-center">
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
