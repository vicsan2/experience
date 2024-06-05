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
} from "@remix-run/react"
import { Avatar, Button, Dropdown, Flowbite, Navbar } from "flowbite-react"

import { getUser } from "./session.server"
import tailwindStylesheetUrl from "./styles/tailwind.css"
import globalStylesheetUrl from "./styles/global.css"
import theme from "./theme"
import { useOptionalUser } from "./utils"
import clsx from "clsx"

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
  return (
    <html lang="en" className="h-full overflow-x-hidden">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col h-screen bg-gray-900 dark:text-white">
        {typeof window !== "undefined" ? (
          <Flowbite theme={{ theme }}>
            <Navbar fluid className="z-50">
              <NavLink to="/" prefetch="intent">
                <Navbar.Brand>
                  <img
                    src="https://flowbite.com/docs/images/logo.svg"
                    className="w-6 h-6 mr-3 sm:h-9 sm:w-9"
                    alt="Flowbite Logo"
                  />
                  <span className="self-center text-xl font-semibold whitespace-nowrap">
                    Experience
                  </span>
                </Navbar.Brand>
              </NavLink>
              <div className="flex gap-2 md:order-2">
                {user ? (
                  <Dropdown
                    inline
                    arrowIcon={false}
                    label={<Avatar alt="User settings" rounded />}
                  >
                    <Dropdown.Header>{user.username}</Dropdown.Header>
                    {user.provider && (
                      <Dropdown.Item>
                        <NavLink to={user.username} prefetch="intent">
                          {({ isActive }) => (
                            <button
                              name="profile"
                              className={clsx({ "text-white": isActive })}
                            >
                              Listing
                            </button>
                          )}
                        </NavLink>
                      </Dropdown.Item>
                    )}
                    <Dropdown.Item>
                      <Form action="/logout" method="post">
                        <button name="logout" type="submit">
                          Logout
                        </button>
                      </Form>
                    </Dropdown.Item>
                  </Dropdown>
                ) : (
                  <>
                    <NavLink to="login" prefetch="intent">
                      {({ isActive }) => !isActive && <Button>Login</Button>}
                    </NavLink>
                    <NavLink to="signup" prefetch="intent">
                      {({ isActive }) => !isActive && <Button>Sign Up</Button>}
                    </NavLink>
                  </>
                )}
                {/* <Navbar.Toggle /> */}
              </div>
              {/* <Navbar.Collapse>
                <Navbar.Link href="/" active={location.pathname === "/"}>
                  Home
                </Navbar.Link>
              </Navbar.Collapse> */}
            </Navbar>
            <main className="p-6 overflow-y-auto w-100">
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
