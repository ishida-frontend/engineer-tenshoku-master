import React from 'react'
import { CourseEditor } from '../../../../../components/admin/organisms/CourseEditor'

export default async function AdminEditCourse({
  params,
}: {
  params: { course_id: string }
}) {
  console.log('params.course_id', params.course_id)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/course/${params.course_id}`,
    {
      cache: 'no-cache',
    },
  )
  const courseData = await res.json()

  console.log('courseData', courseData)

  return <CourseEditor course_id={params.course_id} courseData={courseData} />
}
