import React from 'react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../api/auth/[...nextauth]/route'

import { CourseDetail } from '../../../components/pages/CourseDetail'
import { CourseWithSectionsType } from '../../../types/CourseType'
import Error from '../../error'
import { useSearchParams } from 'next/navigation'

export default async function CourseDetailPage({
  params,
}: {
  params: { courseId: string }
}) {
  console.log('CourseDetailのSC')
  const session = await getServerSession(authOptions)

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FRONT_API_URL}/course/${params.courseId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const courseData: CourseWithSectionsType = await res.json()

    const searchParams = useSearchParams()
    const searchedVideoId =
      (await searchParams.get('videoId')) || courseData.sections[0].videos[0].id
    console.log('searchedVideoId:', searchedVideoId)

    return (
      <CourseDetail
        courseData={courseData}
        session={session}
        searchedVideoId={searchedVideoId}
      />
    )
  } catch (e) {
    return <Error />
  }
}
