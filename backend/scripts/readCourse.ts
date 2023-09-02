import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function readCourse(id: number) {
  const course = await prisma.course.findUnique({
    where: {
      id,
    },
  })
  return course
}

export async function readAllCourses() {
  const courses = await prisma.course.findMany()
  return courses
}

export async function readFilteredCourses() {
  const filteredCourses = await prisma.course.findMany({
    where: {
      deleted_at: null,
    },
  })
  return filteredCourses
}

export async function readPublishedCourseContent(id: string) {
  const publishedCourseContent = await prisma.course.findMany({
    where: {
      id: Number(id),
      published: true,
      deleted_at: null,
    },
    select: {
      id: true,
      name: true,
      description: true,
      sections: {
        where: {
          published: true,
          deleted_at: null,
        },
        orderBy: [
          {
            order: 'asc',
          },
        ],
        select: {
          id: true,
          course_id: true,
          title: true,
          order: true,
          videos: {
            where: {
              published: true,
              deleted_at: null,
            },
            orderBy: [
              {
                order: 'asc',
              },
            ],
            select: {
              id: true,
              section_id: true,
              order: true,
              name: true,
              description: true,
              url: true,
            },
          },
        },
      },
    },
  })
  return publishedCourseContent
}
