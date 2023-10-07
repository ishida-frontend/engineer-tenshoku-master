import React from 'react'

import { CourseListWrapper } from '../../components/pages/CourseListWrapper'
import { CourseType } from '../../types/CourseType'
import Error from '../error'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export default async function Course() {
  try {
    // TODO ユーザ情報を渡してデータ取得できるようにする
    const session = await getServerSession(authOptions)
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

    return (
      <CourseListWrapper initialCourses={initialCourses} session={session} />
    )
  } catch (e) {
    return <Error />
  }
}
