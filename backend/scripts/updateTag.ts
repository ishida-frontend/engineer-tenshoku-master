import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function updateTag() {
  const tag = await prisma.tag.update({
    where: {
      id: 3,
    },
    data: {
      name: 'sano',
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
    const tag = await prisma.tag.updateMany({
      data: {
        name: 'sano',
      },
    })
    console.log("updateFilteredTag", tag)
  }

  updateFilteredTag()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
