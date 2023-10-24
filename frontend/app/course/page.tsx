import React from 'react'

import { CourseListType } from '../../types/CourseType'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { CourseListWrapper } from '../../components/pages/CourseListWrapper'
import Error from '../error'
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

    const initialCourses: CourseListType[] = await res.json()

    return <CourseListWrapper initialCourses={initialCourses} />
  } catch (e) {
    return <Error />
  }
}
