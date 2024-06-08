import type { ActionArgs, LoaderArgs } from "@remix-run/server-runtime"
import { json, redirect } from "@remix-run/server-runtime"
import type {
  GenericObject,
  ValidateFieldResult,
  ValidationResult,
} from "remix-validated-form"
import { ValidatedForm } from "remix-validated-form"

import {
  FileField,
  FormButton,
  SelectField,
  TextField,
  TextareaField,
} from "~/components"
import { getListingByProviderId } from "~/models/listing.server"
import { getUser } from "~/session.server"

export async function action({ request }: ActionArgs) {
  const formData = await request.formData()
  console.log(formData)
  return json({})
}

export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request)
  if (!user?.provider) return redirect("/")
  const listing = await getListingByProviderId(user.id)
  if (listing) return redirect(`/${user.username}`)
  return json({})
}

export default function CreateListing() {
  return (
    <ValidatedForm
      className="grid max-w-2xl grid-cols-1 gap-6 mx-auto sm:grid-cols-2"
      method="post"
      validator={{
        validate: function (
          unvalidatedData: GenericObject
        ): Promise<ValidationResult<any>> {
          throw new Error("Function not implemented.")
        },
        validateField: function (
          unvalidatedData: GenericObject,
          field: string
        ): Promise<ValidateFieldResult> {
          throw new Error("Function not implemented.")
        },
      }}
    >
      <h1 className="col-span-2 text-center">Create a Listing</h1>
      <p className="col-span-2 text-center">
        Fill out the information below to create your own listing on our site.
        You may edit this listing at any time.
      </p>
      <TextField name="name" label="Name" />
      <SelectField
        name="age"
        label="Age"
        options={[20, 30, 40, 50, 60, 70, 80, 90].map((val) => ({
          label: `${val.toString()}s`,
          value: val,
        }))}
      />
      <TextareaField
        className="col-span-2"
        name="description"
        label="Description"
        rows={2}
      />
      <SelectField
        name="gender"
        label="Gender"
        options={[
          {
            label: "Male",
            value: "male",
          },
          {
            label: "Female",
            value: "female",
          },
          {
            label: "Non-Binary",
            value: "nonBinary",
          },
          {
            label: "Trans",
            value: "trans",
          },
        ]}
      />
      <TextField
        name="pronouns"
        label="Pronouns"
        placeholder="Ex. they/them/theirs"
        helperText="Let people know how to refer to you."
      />
      <FileField className="col-span-2" name="photos" label="Photos" multiple />
      <FormButton className="col-span-2">Submit</FormButton>
    </ValidatedForm>
  )
}
