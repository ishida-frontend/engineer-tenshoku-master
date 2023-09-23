import React from 'react'
import { CourseList } from '../../../components/admin/organisms/CourseList'

export default async function AdminCourse() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/course`,
    {
      cache: 'no-cache',
    },
  )
  const getCourses = await res.json()
  return <CourseList courses={getCourses} />
}
