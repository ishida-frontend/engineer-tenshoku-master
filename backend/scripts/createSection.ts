import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function createSection(courseId: number) {
  try {
    const section = await prisma.section.create({
      data: {
        title: 'Section 1',
        order: 1,
        published: true,
        course: { connect: { id: courseId } },
      },
    })
    return section
  } catch (e: any) {
    console.log(e.message)
  } finally {
    await prisma.$disconnect()
  }
}
export default createSection(1)
