import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function readTag() {
  const tag = await prisma.tag.findUnique({
    where: {
      id: '1',
    },
  })
  console.log('readTag', tag)
}

readTag()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

export async function readAllTag() {
  const tag = await prisma.tag.findMany({})
  console.log('readAllTag', tag)
}

readAllTag()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

export async function readFilteredTag() {
  const tag = await prisma.tag.findMany({
    where: {
      AND: {
        id: 1,
        name: 'github',
        color: 'black',
      },
    },
  })
  console.log('readFilteredTag', tag)
}

readFilteredTag()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
