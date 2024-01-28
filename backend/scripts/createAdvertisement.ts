import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'
const prisma = new PrismaClient()

export async function createAdvertisement(
  name: string,
  imageUrl: string,
  author: string,
  isShow: boolean
) {
  try {
    const advertisement = await prisma.advertisement.create({
      data: {
        id: crypto.randomUUID(),
        name,
        imageUrl,
        author,
        isShow
      },
    })
    return advertisement
  } catch (e) {
    console.log(e)
    throw new Error(`createAdvertisement error: ${e}`)
  } finally {
    await prisma.$disconnect()
  }
}
