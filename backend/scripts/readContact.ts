import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function readAllContacts() {
  const contacts = await prisma.contact.findMany({
    select: {
      name: true,
      email: true,
      subject: true,
      message: true
    }
  })
  console.log(contacts);
}
