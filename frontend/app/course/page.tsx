import React from 'react'

import { CourseList } from '../../components/organisms/CourseList'
import { CourseType } from '../../types/CourseType'

export default async function Course() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/all`, {
    // cache: 'no-cache',
  })
  const courses: CourseType[] = await res.json()
  console.log('courses', courses)
  return <CourseList courses={courses} />
}
