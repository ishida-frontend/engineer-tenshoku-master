import prisma from '../utils/prismaClient'

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
  const courses = await prisma.course.findMany({
    where: {
      published: true,
      deleted_at: null,
    },
    include: {
      sections: {
        where: {
          published: true,
          deleted_at: null,
        },
        select: {
          videos: {
            where: {
              published: true,
              deleted_at: null,
            },
            select: {
              id: true,
            },
            orderBy: [
              {
                order: 'asc',
              },
            ],
          },
        },
        orderBy: [
          {
            order: 'asc',
          },
        ],
      },
      tags: {
        include: {
          tag: true,
        },
      },
    },
    orderBy: [
      {
        created_at: 'asc',
      },
    ],
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
            include: {
              ViewingStatus: {
                where: {
                  status: true,
                },
              },
            },
          },
        },
      },
    },
  })
  return publishedCourseContent
}

export async function getSearchedCourses({ text }: { text: string }) {
  try {
    const courses = await prisma.course.findMany({
      where: {
        deleted_at: null,
        published: true,
        name: {
          contains: text,
        },
      },
      orderBy: [
        {
          created_at: 'asc',
        },
      ],
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
          select: {
            videos: {
              where: {
                published: true,
                deleted_at: null,
              },
              select: {
                id: true,
              },
              orderBy: [
                {
                  order: 'asc',
                },
              ],
            },
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })
    return courses
  } catch (error) {
    console.log(error)
  }
}
