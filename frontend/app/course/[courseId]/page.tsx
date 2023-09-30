'use client'
import React, { useContext, useEffect, useState } from 'react'

import { AuthContext } from 'providers/AuthProvider'
import { CourseDetail } from '../../../components/organisms/CourseDetail'
import { CourseType } from '../../../types/CourseType'
import { SectionType } from '../../../types/SectionType'
import { VideoType } from '../../../types/VideoType'
import Error from '../../error'
import { Loader } from 'components/atoms/Loader'

type CourseDetailPropsType = CourseType & {
  sections: (SectionType & { videos: VideoType[] })[]
}

export default function CourseDetailPage({
  params,
}: {
  params: { courseId: string }
}) {
  const { check, user } = useContext(AuthContext)
  const [courseData, setCourseData] = useState<CourseDetailPropsType | null>(
    null,
  )
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${params.courseId}`,
          {
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        const data: CourseDetailPropsType = await courseRes.json()
        setCourseData(data)
      } catch (e: any) {
        setError(e)
      }
    }

    fetchData()
  }, [params.courseId])

  if (error) return <Error />
  if (!courseData) return <Loader />

  return (
    <CourseDetail
      isLogin={check.isAuthenticated}
      courseData={courseData}
      userId={user.id}
    />
  )
}
