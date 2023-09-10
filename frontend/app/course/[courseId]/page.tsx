import React from 'react'
import { useParams } from 'next/navigation'

import { CourseDetailPropsType } from '../../../types/CourseDetail'
import { CourseDetail } from '../../../components/organisms/CourseDetail'

export default async function CourseDetailPage({
  params,
}: {
  params: { courseId: string }
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${params.courseId}`,
    {
      cache: 'no-cache',
    },
  )
  const courseData: CourseDetailPropsType = await res.json()

  return <CourseDetail courseData={courseData} />
}
