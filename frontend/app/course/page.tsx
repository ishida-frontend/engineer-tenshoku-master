import React from 'react'

import { CourseListWrapper } from '../../components/pages/CourseListWrapper'
import { CourseType } from '../../types/CourseType'
import Error from '../error'

export default async function Course() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/all`,
      {
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const initialCourses: CourseType[] = await res.json()

    return <CourseListWrapper initialCourses={initialCourses} />
  } catch (e) {
    return <Error />
  }
}
