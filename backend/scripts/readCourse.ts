import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function readCourse(id: string) {
  const course = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      sections: {
        include: {
          videos: true,
        },
      },
    },
  })
  return course
}

export async function readAllCourses() {
  const courses = await prisma.course.findMany({
    where: {
      deleted_at: null,
      published: true,
    },
  })
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
  const publishedCourseContent = await prisma.course.findUnique({
    where: {
      id,
      published: true,
      deleted_at: null,
    },
    include: {
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
        include: {
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
          },
        },
      },
    },
  })
  return publishedCourseContent
}

export async function getSearchedCourses(text: string) {
  const courses = await prisma.course.findMany({
    where: {
      deleted_at: null,
      published: true,
      name: {
        contains: text,
      },
    },
  })
  return courses
}
