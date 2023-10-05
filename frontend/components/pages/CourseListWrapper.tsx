'use client'
import React, { useState } from 'react'

import { CourseList } from '../organisms/CourseList'
import { CourseType } from '../../types/CourseType'
import Error from '../../app/error'

export function CourseListWrapper({
  initialCourses,
}: {
  initialCourses: CourseType[]
}) {
  try {
    const [text, setText] = useState<string>('')
    const [courses, setCourses] = useState<CourseType[]>(initialCourses)

    const handleTextChange = async (newText: string) => {
      setText(newText)
      if (newText) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/search/${newText}`,
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
    }
    return <CourseList courses={courses} handleTextChange={handleTextChange} />
  } catch (e) {
    console.log(e)
    return <Error />
  }
}
