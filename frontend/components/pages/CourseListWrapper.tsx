'use client'
import React, { useState } from 'react'

import { CourseList } from '../organisms/CourseList'
import { CourseType } from '../../types/CourseType'
import { SectionType } from '../../types/SectionType'
import { VideoType } from '../../types/VideoType'
import Error from '../../app/error'

export function CourseListWrapper({
  initialCourses,
}: {
  initialCourses: CourseType &
    {
      sections: (SectionType & { videos: VideoType[] })[]
    }[]
}) {
  try {
    const [courses, setCourses] = useState<
      CourseType &
        {
          sections: (SectionType & { videos: VideoType[] })[]
        }[]
    >(initialCourses)

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
        const allCourses: CourseType &
          {
            sections: (SectionType & { videos: VideoType[] })[]
          }[] = await res.json()
        setCourses(allCourses)
      }
    }
    return <CourseList courses={courses} handleTextChange={handleTextChange} />
  } catch (e) {
    return <Error />
  }
}
