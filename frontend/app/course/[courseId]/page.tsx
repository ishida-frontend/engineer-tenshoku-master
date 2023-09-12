import React from 'react'

import { CourseDetail } from '../../../components/organisms/CourseDetail'
import { CourseType } from '../../../types/CourseType'
import { SectionType } from '../../../types/SectionType'
import { VideoType } from '../../../types/VideoType'

type CourseDetailPropsType = CourseType & {
  sections: (SectionType & { videos: VideoType[] })[]
}

export default async function CourseDetailPage({
  params,
}: {
  params: { courseId: string }
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${params.courseId}`,
    {
      cache: 'no-cache',
    },
  )
  const courseData: CourseDetailPropsType = await res.json()

  return <CourseDetail courseData={courseData} />
}
