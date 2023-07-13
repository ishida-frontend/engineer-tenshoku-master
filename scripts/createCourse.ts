import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function courseCreate() {
  const course = await prisma.course.create({
    data: {
      name: "Course 1",
      description: "The very first course in the whole site.",
      published: true
    }
  })
  return course.id;
  console.log(course);
}

courseCreate()
  .catch(e => {
    console.log(e.message)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
