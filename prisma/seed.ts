import { randomInt } from "crypto"

import { faker } from "@faker-js/faker"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

import { censorUsername } from "~/helpers/server"

const prisma = new PrismaClient()

async function seed() {
  const username1 = "vicsan"
  const username2 = "vicsan2"
  const tagTag = "LGBTQ+"
  // cleanup the existing database
  await prisma.user.deleteMany().catch(() => { })
  await prisma.tag.deleteMany().catch(() => { })
  await prisma.listing.deleteMany().catch(() => { })
  await prisma.voiceNote.deleteMany().catch(() => { })

  const hashedPassword = await bcrypt.hash("password", 10)

  const tag = await prisma.tag.create({
    data: {
      tag: tagTag,
    },
  })

  prisma.client.create({
    data: {
      user: {
        create: {
          username: username1,
          email: "test2@gmail.com",
          lastActive: new Date(),
          dateOfBirth: "1995-01-01",
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
          dateOfBirth: "1995-01-01",
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
      username: provider.username,
    },
  })

  prisma.listing.create({
    data: {
      name: "Victor",
      description: "I am a cool guy",
      age: 26,
      gender: "Male",
      location: "Shreveport, LA, US",
      providerId: provider.userId,
      username: provider.username,
      voiceNoteUrl: voiceNote.url,
    },
  })

  const users = []

  for (let i = 0; i < 20; i++) {
    const clientUsername = faker.internet.userName()
    const clientEmail = faker.internet.email()

    const client = await prisma.client.create({
      data: {
        user: {
          create: {
            username: clientUsername,
            email: clientEmail,
            lastActive: new Date(),
            dateOfBirth: "1995-01-01",
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

    users.push(client)
  }

  for (let i = 0; i < 20; i++) {
    const providerUsername = faker.internet.userName()
    const providerEmail = faker.internet.email()
    const name = faker.name.fullName()

    const provider = await prisma.provider.create({
      data: {
        user: {
          create: {
            username: providerUsername,
            email: providerEmail,
            lastActive: new Date(),
            dateOfBirth: "1995-01-01",
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

    const photoIds = [randomInt(400), randomInt(400), randomInt(400)]

    if (i === 0) {
      await prisma.listing.create({
        data: {
          name: name,
          description: faker.random.words(4),
          age: faker.datatype.number({ min: 18, max: 40 }),
          gender: faker.name.gender(),
          pronouns: ["she", "her", "they", "them"],
          location: `${faker.address.city()}, ${faker.address.stateAbbr()}, ${faker.address.countryCode()}`,
          providerId: provider.userId,
          username: provider.username,
          photos: photoIds.map((id) => `https://picsum.photos/id/${id}/1000`),
          thumbnails: photoIds.map(
            (id) => `https://picsum.photos/id/${id}/200`
          ),
        },
      })
      continue
    }

    const listing = await prisma.listing.create({
      data: {
        name: name,
        description: faker.random.words(4),
        age: faker.datatype.number({ min: 18, max: 40 }),
        gender: faker.name.gender(),
        pronouns: ["she", "her", "they", "them"],
        location: `${faker.address.city()}, ${faker.address.stateAbbr()}, ${faker.address.countryCode()}`,
        providerId: provider.userId,
        username: provider.username,
        photos: photoIds.map((id) => `https://picsum.photos/id/${id}/1000`),
        thumbnails: photoIds.map((id) => `https://picsum.photos/id/${id}/200`),
      },
    })

    for (let i = 0; i < randomInt(5, 20); i++) {
      prisma.review.create({
        data: {
          rating: faker.datatype.number({ min: 1, max: 5 }),
          listingId: listing.id,
          providerId: provider.userId,
          providerUsername: provider.username,
          reviewerId: users[i].userId,
          reviewerUsername: users[i].username,
          censoredReviewerUsername: censorUsername(users[i].username),
          comment: faker.random.words(randomInt(5, 15)),
        },
      })
    }
  }

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
