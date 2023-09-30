import React from 'react'
import { CourseList } from '../../../components/admin/organisms/CourseList'
import { CourseType } from '../../../types'

export default async function AdminCourse() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/course`,
    {
      cache: 'no-cache',
    },
  )
  const getCourses: CourseType[] = await res.json()
  return <CourseList courses={getCourses} />
}
