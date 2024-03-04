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
  async getAdvertisement(id: string) {
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
  async getAdvertisements() {
    try {
      const advertisements = await prisma.advertisement.findMany({
        where: {
          deleted_at: null, 
        },
        orderBy: {
          startFrom: 'asc',
        },  
      })
      return advertisements
    } catch (error) {
      throw new Error(
        `AdvertisementApplicationService: get advertisements error: ${error}`,
      )
    }
  }

  async updateAdvertisement(params: {
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
      const updatedAdvertisement = await prisma.advertisement.update({
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
      return updatedAdvertisement
    } catch (error) {
      throw new Error(
        `AdvertisementApplicationService: update user error: ${error}`,
      )
    }
  }

  async deleteAdvertisement(id: string) {
    try {
      const deletedAdvertisement = await prisma.advertisement.update({
        where: { id },
        data: { deleted_at: new Date() },
      })
      return deletedAdvertisement
    } catch (error) {
      throw new Error(
        `AdvertisementApplicationService: delete advertisement error: ${error}`,
      )
    }
  }
}
