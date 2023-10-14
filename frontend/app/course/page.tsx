import React from 'react'

import { CourseList } from '../../components/organisms/CourseList'
import { CourseType } from '../../types/CourseType'
import Error from '../error'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { TagType } from '../../types'
export type AllCourseType = CourseType & {
  course_id: string
  tag_id: string
  courseTags: {
    tag_id: string
    course_id: string
    tag: TagType
  }
}
export default async function Course() {
  // TODO ユーザ情報を渡してデータ取得できるようにする
  const session = await getServerSession(authOptions)

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
    console.log('aaaaa', res)

    const courses: AllCourseType[] = await res.json()
    console.log('courses', courses)

    // const first = courses.find((course: any) => course)
    // console.log('first', first)
    // console.log('courses', first.courseTag[0].tag)

    return <CourseList courses={courses} />
  } catch (e) {
    console.log(e)
    return <Error />
  }
}
