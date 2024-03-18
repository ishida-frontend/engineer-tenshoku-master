'use client'
import React, { useState } from 'react'

import { CourseList } from '../../pages/CourseList'
import { CourseListType } from '../../../types/CourseType'
import Error from '../../../app/error'
import { AdvertisementType } from '../../../types/AdvertisementType'

type CourseListWrapperProps = {
  initialCourses: CourseListType[]
  advertisements: AdvertisementType[]
}

export function CourseListWrapper({
  initialCourses,
  advertisements,
}: CourseListWrapperProps) {
  try {
    const [courses, setCourses] = useState<CourseListType[]>(initialCourses)

    const handleTextChange = async (newText: string) => {
      if (newText) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/search`,
          {
            method: 'POST',
            body: JSON.stringify({
              text: newText,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        const searchedCourses: CourseListType[] = await res.json()
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
        const allCourses: CourseListType[] = await res.json()
        setCourses(allCourses)
      }
    }
    return (
      <CourseList
        courses={courses}
        handleTextChange={handleTextChange}
        advertisements={advertisements}
      />
    )
  } catch (e) {
    return <Error />
  }
}
