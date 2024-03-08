import React from 'react'
import { getServerSession } from 'next-auth/next'

import { authOptions } from '../../../api/auth/[...nextauth]/route'
import { CourseWithSectionsType } from '../../../../types/CourseType'
import { CourseDetailWrapper } from '../../../../components/wrapper/pages/CourseDetail'
import { QuestionType } from '../../../../types/QuestionType'
import { AnswerType } from '../../../../types/AnswerType'
import Error from '../../../error'
import { loggerInfo } from '../../../../utils/logger'

export default async function CourseDetailPage({
  params,
  searchParams,
}: {
  params: { courseId: string; videoId: string }
  searchParams: { questionId: string }
}) {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id

  try {
    const getCourseData = await fetch(
      `${process.env.NEXT_PUBLIC_FRONT_API_URL}/course/${params.courseId}`,
      {
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const initialCourseData: CourseWithSectionsType = await getCourseData.json()

    const getQuestionsData = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/question/${params.videoId}`,
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

    let WrapperProps = {
      courseId: params.courseId,
      initialCourseData: initialCourseData,
      session: session,
      userId: userId,
      videoId: params.videoId,
      questions: questions,
      answers: answers,
      questionId: searchParams.questionId,
    }

    return <CourseDetailWrapper {...WrapperProps} />
  } catch (e) {
    loggerInfo(`error: ${e}`, {
      caller: 'frontend/app/course/[courseId]/[videoId]/page.tsx',
      status: 400,
    })
    return <Error />
  }
}
