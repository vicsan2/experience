import type { Password, User } from "@prisma/client"
import type { TypedResponse } from "@remix-run/server-runtime"
import bcrypt from "bcryptjs"
import type { ValidationErrorResponseData } from "remix-validated-form"
import { validationError } from "remix-validated-form"

import { prisma } from "~/db.server"
import { clientSchema, providerSchema } from "~/schemas/signup"

export type { User } from "@prisma/client"

export interface SignupFields {
  username: User["username"]
  password: string
  email: User["email"]
  dateOfBirth: User["dateOfBirth"]
}

export interface LoginFields {
  email: User["email"]
  password: string
}

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      provider: true,
      client: true,
    },
  })
}

export async function getUserByUserName(username: User["username"]) {
  return prisma.user.findUnique({ where: { username } })
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } })
}

export async function validateUser(userData: FormData, client?: boolean) {
  const result = await (client ? clientSchema : providerSchema).validate(
    userData
  )
  if (result.error) return validationError(result.error)
  const { username } = result.data
  const [user, email] = await Promise.all([
    getUserByUserName(username),
    getUserByEmail(result.data.email),
  ])
  if (user || email) {
    return validationError({
      fieldErrors: {
        ...{ username: "Username already exists" },
        ...{ email: "Email already exists" },
      },
    })
  }
  if (await getUserByUserName(username)) {
    return validationError({
      fieldErrors: { username: "Username already exists" },
    })
  }
  if (await getUserByEmail(result.data.email)) {
    return validationError({
      fieldErrors: { email: "Email already exists" },
    })
  }
}

export async function createClient({
  username,
  password,
  email,
  dateOfBirth,
}: SignupFields) {
  const hashedPassword = await bcrypt.hash(password, 10)

  return prisma.client.create({
    data: {
      user: {
        create: {
          username,
          email,
          lastActive: new Date(),
          dateOfBirth,
          password: {
            create: {
              hash: hashedPassword,
            },
          },
          userRole: "CLIENT",
        },
      },
    },
  })
}

export async function createProvider({
  username,
  password,
  email,
  dateOfBirth,
}: SignupFields) {
  const hashedPassword = await bcrypt.hash(password, 10)

  return prisma.provider.create({
    data: {
      user: {
        create: {
          username,
          email,
          lastActive: new Date(),
          dateOfBirth,
          password: {
            create: {
              hash: hashedPassword,
            },
          },
          userRole: "PROVIDER",
        },
      },
    },
  })
}

export async function deleteUserByUserName(username: User["username"]) {
  return prisma.user.delete({ where: { username } })
}

export async function verifyLogin({
  email,
  password,
}: {
  email: User["email"]
  password: Password["hash"]
}): Promise<User | TypedResponse<ValidationErrorResponseData>> {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  })

  if (!userWithPassword || !userWithPassword.password) {
    return validationError({
      fieldErrors: { form: "Email or password is incorrect" },
    })
  }

  const isValid = await bcrypt.compare(password, userWithPassword.password.hash)

  if (!isValid) {
    return validationError({
      fieldErrors: { form: "Email or password is incorrect" },
    })
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword

  return userWithoutPassword
}
