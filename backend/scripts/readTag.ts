import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function readTag() {
  const tag = await prisma.tag.read({
    data: {
      name: 'githab',
      color: 'black',
    },
  })
  return tag
}

readTag()