import React, { useState } from 'react'

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
    const initialCourses: CourseType[] = await res.json()
    const [text, setText] = useState<string>('')
    const [courses, setCourses] = useState<CourseType[]>(initialCourses)
    const handleTextChange = (newText: string) => {
      setText(newText)
    }
    if (!!text) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/search/${text}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      const searchedCourses: CourseType[] = await res.json()
      setCourses(searchedCourses)
    } else {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/all`,
        {
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      const allCourses: CourseType[] = await res.json()
      setCourses(allCourses)
    }

    return <CourseList handleTextChange={handleTextChange} courses={courses} />
  } catch (e) {
    console.log(e)
    return <Error />
  }
}
