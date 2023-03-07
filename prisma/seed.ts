import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function seed() {
  const username1 = "vicsan"
  const username2 = "vicsan2"
  const tagTag = "LGBTQ+"
  // cleanup the existing database
  await prisma.user.delete({ where: { username: username1 } }).catch(() => {})
  await prisma.user.delete({ where: { username: username2 } }).catch(() => {})
  await prisma.tag.delete({ where: { tag: tagTag } }).catch(() => {})
  await prisma.listing
    .delete({ where: { username: username2 } })
    .catch(() => {})
  await prisma.voiceNote
    .delete({
      where: {
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      },
    })
    .catch(() => {})

  const hashedPassword = await bcrypt.hash("password", 10)

  const tag = await prisma.tag.create({
    data: {
      tag: tagTag,
    },
  })

  await prisma.client.create({
    data: {
      user: {
        create: {
          username: username1,
          email: "test2@gmail.com",
          lastActive: new Date(),
          dateOfBirth: new Date(1995, 1, 1),
          password: {
            create: {
              hash: hashedPassword,
            },
          },
          userRole: "CLIENT",
        },
      },
      tags: {
        connect: {
          id: tag.id,
        },
      },
    },
  })

  const provider = await prisma.provider.create({
    data: {
      user: {
        create: {
          username: username2,
          email: "test@gmail.com",
          lastActive: new Date(),
          dateOfBirth: new Date(1995, 1, 1),
          password: {
            create: {
              hash: hashedPassword,
            },
          },
          userRole: "PROVIDER",
        },
      },
      tags: {
        connect: {
          id: tag.id,
        },
      },
    },
  })

  const voiceNote = await prisma.voiceNote.create({
    data: {
      providerId: provider.userId,
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
  })

  await prisma.listing.create({
    data: {
      name: "Victor",
      age: 26,
      gender: "Male",
      location: "Shreveport, LA",
      providerId: provider.userId,
      username: provider.username,
      voiceNoteUrl: voiceNote.url,
    },
  })

  console.log(`Database has been seeded. 🌱`)
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
