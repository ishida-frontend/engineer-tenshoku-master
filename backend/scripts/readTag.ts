import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function readTag() {
   const tag = await prisma.tag.findUnique({
    where: {
      id: 99,
    },
  })
  console.dir(tag, { depth: null })
}

readTag()
.catch(e => {
  throw e
})
.finally(async () => {
  await prisma.$disconnect()
})

export async function readFilteredTag() {
const tag = await prisma.tag.findMany({
  where: {
    AND: {
      id: 99,
      name:'github'
    }
  }
})
console.dir(tag, { depth: null })
}

readFilteredTag()
.catch(e => {
  throw e
})
.finally(async () => {
  await prisma.$disconnect()
})