import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function createTag() {
  try {
    const tag = await prisma.tag.create({
      data: {
        name: 'github',
        color: 'black',
      },
    })
    return tag
  } catch (e: any) {
    console.log(e.message)
  } finally {
    await prisma.$disconnect()
  }
}
createTag()
