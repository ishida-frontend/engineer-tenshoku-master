import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function updateTag() {
  const tag = await prisma.tag.update({
    where: {
      id: 3,
    },
    data: {
      name: 'github',
      color: 'red',
    },
  })
  console.log("updateTag", tag)
}

updateTag()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

  export async function updateFilteredTag() {
    const updatedTags = await prisma.tag.updateMany({
      data: {
        name: 'sano',
      },
    })
    console.log("updateFilteredTag", updatedTags)
  }

  updateFilteredTag()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
