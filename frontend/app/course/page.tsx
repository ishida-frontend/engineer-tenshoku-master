import React from 'react'

import { CourseListType } from '../../types/CourseType'
import { AdvertisementType } from '../../types/AdvertisementType'
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

    const advertisementData = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/advertisement/banner`,
      {
        cache: 'no-cache',
      },
    )
    const advertisements: AdvertisementType[] = await advertisementData.json()

    return (
      <CourseListWrapper
        initialCourses={initialCourses}
        advertisements={advertisements}
      />
    )
  } catch (e) {
    return <Error />
  }
}
