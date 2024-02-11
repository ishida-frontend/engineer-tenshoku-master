import { PrismaClient } from "@prisma/client";
import crypto from 'crypto'
const prisma = new PrismaClient()

export class AdvertisementApplicationService {
  async createAdvertisement(params: {
    name: string,
    url: string,
    imageUrl: string,
    author: string,
    startFrom: Date,
    endAt: Date
  }) {
    try {
      const { name, url, imageUrl, author, startFrom, endAt } = params
      const advertisement = await prisma.advertisement.create({
        data: {
          id: crypto.randomUUID(),
          name,
          url,
          imageUrl,
          author,
          startFrom,
          endAt
        }
      })
      return advertisement
    } catch (error) {
      throw new Error(`AdvertisementApplicationService: create advertisement error: ${error}`)
    }
  }
}
