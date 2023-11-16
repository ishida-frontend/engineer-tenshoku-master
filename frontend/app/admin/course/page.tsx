import React from 'react'
import { CourseList } from '../../../components/admin/organisms/CourseList'
import { CourseType } from '../../../types'
import Error from '../../error'

export default async function AdminCourse() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/course`,
      {
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const getCourses: CourseType[] = await res.json()
    return <CourseList courses={getCourses} />
  } catch (e) {
    return <Error />
  }
}
