import { Link } from "@remix-run/react"
import { Button } from "flowbite-react"

export default function SignUpIndex() {
  return (
    <div className="h-full w-full space-y-6 p-12 text-center">
      <h2>Welcome to Experience!</h2>
      <p>
        To sign up, please first choose whether you would like to be a client or
        provide a service.
      </p>
      <div className="flex w-full justify-center gap-10">
        <Link className="w-full" to="provider">
        <Button className="w-full" size="xl">
          I am a provider
        </Button>
        </Link>
        <Link className="w-full" to ="client">
        <Button className="w-full" size="xl">
          I am a client
        </Button>
        </Link>
      </div>
    </div>
  )
}
