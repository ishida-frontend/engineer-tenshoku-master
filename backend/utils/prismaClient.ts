import { PrismaClient, Prisma } from '@prisma/client'

export { PrismaClient }
export { Prisma }

const prisma = new PrismaClient()
export default prisma
