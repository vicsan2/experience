import type { Password, User } from "@prisma/client"
import bcrypt from "bcryptjs"

import { prisma } from "~/db.server"

export type { User } from "@prisma/client"

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } })
}

export async function getUserByUserName(username: User["username"]) {
  return prisma.user.findUnique({ where: { username } })
}

export async function createClient(
  username: User["username"],
  password: string,
  email: User["email"],
  dateOfBirth: User["dateOfBirth"]
) {
  const hashedPassword = await bcrypt.hash(password, 10)

  return prisma.client.create({
    data: {
      user: {
        create: {
          username,
          email,
          lastActive: new Date(),
          dateOfBirth: dateOfBirth,
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

export async function createProvider(
  username: User["username"],
  password: string,
  email: User["email"],
  dateOfBirth: User["dateOfBirth"]
) {
  const hashedPassword = await bcrypt.hash(password, 10)

  return prisma.provider.create({
    data: {
      user: {
        create: {
          username,
          email,
          lastActive: new Date(),
          dateOfBirth: dateOfBirth,
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

export async function verifyLogin(
  username: User["username"],
  password: Password["hash"]
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { username },
    include: {
      password: true,
    },
  })

  if (!userWithPassword || !userWithPassword.password) {
    return null
  }

  const isValid = await bcrypt.compare(password, userWithPassword.password.hash)

  if (!isValid) {
    return null
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword

  return userWithoutPassword
}
