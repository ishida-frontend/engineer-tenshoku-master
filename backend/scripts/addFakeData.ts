import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function fakeData() {
  const courses = generateFakeCourses(10)

  await prisma.course.createMany({
    data: courses
  })

  console.log("Courses inserted successfully!")
}

function generateFakeCourses(num: number) {
  const courses =[]

  for (let i = 0; i < num; i++) {
    courses.push({
      name: faker.commerce.product(),
      description: faker.lorem.paragraph(),
    })
  }
  return courses
}

fakeData()
.catch(e => {
  throw e
})
.finally(async () => {
  await prisma.$disconnect()
})
