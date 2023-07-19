import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export async function createContact() {
  try {
    const createdContact = await prisma.contact.create({
      data: {
        name: 'Yamada Tarou',
        email: "yamada0123@example.com",
        subject: "I like your videos.",
        message: "Thank you very much.",
        status: 0,
      },
    });
    console.log(createdContact);
  } catch (e: any) {
    console.log(e.message);
  } finally {
    await prisma.$disconnect();
  }
}
