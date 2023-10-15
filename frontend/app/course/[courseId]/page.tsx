import React from 'react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../api/auth/[...nextauth]/route'

import { CourseDetail } from '../../../components/pages/CourseDetail'
import { QuestionType } from 'types/QuestionType'
import { CourseWithSectionsType } from '../../../types/CourseType'
import Error from '../../error'

export default async function CourseDetailPage({
  params,
  searchParams,
}: {
  params: { courseId: string }
  searchParams: { videoId: string }
}) {
  const session = await getServerSession(authOptions)

  try {
    const getCourseData = await fetch(
      `${process.env.NEXT_PUBLIC_FRONT_API_URL}/course/${params.courseId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const courseData: CourseWithSectionsType = await getCourseData.json()

    console.log('searchParams.videoId:', searchParams.videoId)
    const handleGetQuestions = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/question/${searchParams.videoId}`,
      {
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const questions: QuestionType[] = await handleGetQuestions.json()

    return (
      <CourseDetail
        courseData={courseData}
        session={session}
        questions={questions}
      />
    )
  } catch (e) {
    return <Error />
  }
}
