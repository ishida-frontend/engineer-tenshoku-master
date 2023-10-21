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
      tags: {
        select: {
          tag_id: true,
        },
      },
    },
  })
  return course
}

export async function readAllCourses() {
  try {
    const courses = await prisma.course.findMany({
      where: {
        deleted_at: null,
        published: true,
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })
    return courses
  } catch (error) {
    console.log('error', error)
  }
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
