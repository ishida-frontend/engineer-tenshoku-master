import React from 'react'

import { CourseList } from '../../components/organisms/CourseList'
import { CourseType } from '../../types/CourseType'
import Error from '../error'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
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
    const courses: CourseType[] = await res.json()

    return <CourseList courses={courses} />
  } catch (e) {
    console.log(e)
    return <Error />
  }
}
