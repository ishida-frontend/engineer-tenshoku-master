import { Prisma, PrismaClient } from '@prisma/client'
import crypto from 'crypto'
const prisma = new PrismaClient()

export class AdvertisementApplicationService {
  async createAdvertisement(params: Prisma.AdvertisementCreateInput) {
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
          endAt,
        },
      })
      return advertisement
    } catch (error) {
      throw new Error(
        `AdvertisementApplicationService: create advertisement error: ${error}`,
      )
    }
  }
  static async getAdvertisement(id: string) {
    try {
      const advertisement = await prisma.advertisement.findUnique({
        where: { id },
      })
      return advertisement
    } catch (error) {
      throw new Error(
        `AdvertisementApplicationService: get advertisement error: ${error}`,
      )
    }
  }
  static async getAdvertisements() {
    try {
      const advertisement = await prisma.advertisement.findMany({
        where: {
          startFrom: {
            lte: new Date(), // 現在の日付以前の開始日時
          },
        },
      })
      return advertisement
    } catch (error) {
      throw new Error(
        `AdvertisementApplicationService: get advertisements error: ${error}`,
      )
    }
  }

  static async updateAdvertisement(params: {
    id: string
    name: string
    url: string
    imageUrl: string
    author: string
    startFrom: Date
    endAt: Date
  }) {
    try {
      const { id, name, url, imageUrl, author, startFrom, endAt } = params
      const updateAdvertisement = await prisma.advertisement.update({
        where: { id },
        data: {
          name,
          url,
          imageUrl,
          author,
          startFrom,
          endAt,
        },
      })
      return updateAdvertisement
    } catch (error) {
      throw new Error(
        `AdvertisementApplicationService: update user error: ${error}`,
      )
    }
  }
}
