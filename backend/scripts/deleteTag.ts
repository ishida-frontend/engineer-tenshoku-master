import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function deleteTag() {
  const tag = await prisma.tag.delete({
    where: {
      id: 3,
    },
  })
  console.log('deleteTag', tag)
}

deleteTag()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
