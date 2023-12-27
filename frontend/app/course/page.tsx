import React from 'react'

import { CourseListType } from '../../types/CourseType'
import { CourseListWrapper } from '../../components/wrapper/pages/CourseList'
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

    const initialCourses: CourseListType[] = await res.json()

    return <CourseListWrapper initialCourses={initialCourses} />
  } catch (e) {
    return <Error />
  }
}
