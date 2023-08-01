import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const fakeData = Array.from({length: 10}, () => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  subject: faker.lorem.lines(1),
  message: faker.lorem.lines(3),
  status: 0
}))

async function addFakeData() {
  const addedFakeData = await prisma.contact.createMany({
    data: fakeData
  })

  await console.log(addedFakeData);

  await prisma.$disconnect()
}

addFakeData();
