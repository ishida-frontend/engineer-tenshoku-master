import React from 'react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../api/auth/[...nextauth]/route'

import { CourseDetail } from '../../../components/pages/CourseDetail'
import { CourseWithSectionsType } from 'types'
import { QuestionType } from 'types/QuestionType'
import { AnswerType } from 'types/AnswerType'
import Error from '../../error'

export default async function CourseDetailPage({
  params,
  searchParams,
}: {
  params: { courseId: string }
  searchParams: { videoId: string; questionId: string }
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

    const getQuestionsData = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/question/${searchParams.videoId}`,
      {
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const questions: QuestionType[] = await getQuestionsData.json()

    const getAnswersData = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/answer/${searchParams.questionId}`,
      {
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const answers: AnswerType[] = await getAnswersData.json()

    return (
      <CourseDetail
        courseData={courseData}
        session={session}
        questions={questions}
        answers={answers}
        questionId={searchParams.questionId}
      />
    )
  } catch (e) {
    return <Error />
  }
}
