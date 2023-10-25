import { CourseWithSectionsType } from '../../../types'

export const getCourseData = async (courseId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FRONT_API_URL}/course/${courseId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const data: CourseWithSectionsType = await response.json()
    return data
  } catch (e) {}
}
