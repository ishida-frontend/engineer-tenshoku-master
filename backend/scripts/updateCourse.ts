import prisma from '../utils/prismaClient'

export async function updateCourse(
  id: string,
  name: string,
  description: string,
  published: boolean,
  tagIds: string[],
) {
  try {
    const targetCourse = await prisma.course.findUnique({
      where: {
        id,
      },
      include: {
        tags: true,
      },
    })
    if (!targetCourse) {
      throw new Error('Course not found')
    }
    const deleteCourseTags = targetCourse.tags.filter(
      (tag) => !tagIds.includes(tag.tag_id),
    )

    const updatedCourse = await prisma.course.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        published,
        tags: {
          upsert: tagIds.map((tagId) => ({
            where: {
              course_id_tag_id: {
                course_id: id,
                tag_id: tagId,
              },
            },
            create: {
              tag: {
                connect: {
                  id: tagId,
                },
              },
            },
            update: {
              tag_id: tagId,
            },
          })),
          delete: deleteCourseTags.map((tag) => ({
            course_id_tag_id: {
              course_id: id,
              tag_id: tag.tag_id,
            },
          })),
        },
      },
    })

    return updatedCourse
  } catch (error) {
    throw error
  }
}

export async function updateCourses() {
  const courses = await prisma.course.updateMany({
    where: {
      description: {
        contains: 'Enjoy the course!',
      },
    },
    data: {
      description: 'This course will change your life!',
    },
  })
}
