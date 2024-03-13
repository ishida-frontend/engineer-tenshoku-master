import { PrismaClient, Prisma } from '@prisma/client'

export { PrismaClient, Prisma }

const prisma = new PrismaClient()
export default prisma
