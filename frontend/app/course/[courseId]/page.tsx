import React from 'react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../api/auth/[...nextauth]/route'

import { CourseDetail } from '../../../components/pages/CourseDetail'
import { CourseWithSectionsType } from '../../../types/CourseType'
import Error from '../../error'

export default async function CourseDetailPage({
  params,
}: {
  params: { courseId: string }
}) {
  const session = await getServerSession(authOptions)

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FRONT_API_URL}/course/${params.courseId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const courseData: CourseWithSectionsType = await res.json()

    return <CourseDetail courseData={courseData} session={session} />
  } catch (e) {
    return <Error />
  }
}
