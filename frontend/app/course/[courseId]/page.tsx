import React from 'react'

import { CourseDetail } from '../../../components/pages/CourseDetail'
import { CourseType } from '../../../types/CourseType'
import { SectionType } from '../../../types/SectionType'
import { VideoType } from '../../../types/VideoType'
import Error from '../../error'

type CourseDetailPropsType = CourseType & {
  sections: (SectionType & { videos: VideoType[] })[]
}

export default async function CourseDetailPage({
  params,
}: {
  params: { courseId: string }
}) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FRONT_API_URL}/course/${params.courseId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const courseData: CourseDetailPropsType = await res.json()

    return <CourseDetail courseData={courseData} />
  } catch (e) {
    return <Error />
  }
}
