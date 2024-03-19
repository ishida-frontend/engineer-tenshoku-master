import prisma from '../utils/prismaClient'

export async function readAllContacts() {
  const contacts = await prisma.contact.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      subject: true,
      message: true,
    },
  })
  return contacts
}
