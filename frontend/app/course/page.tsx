import React from 'react'

import { CourseList } from '../../components/organisms/CourseList'
import { CourseType } from '../../types/CourseType'
import Error from '../error'
export default async function Course() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/al`,
      {
        cache: 'no-cache',
      },
    )
    const courses: CourseType[] = await res.json()
    console.log('courses', courses)

    return <CourseList courses={courses} />
  } catch (e) {
    console.log(e)
    return <Error />
  }
}
