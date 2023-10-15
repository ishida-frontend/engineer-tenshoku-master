import React from 'react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../api/auth/[...nextauth]/route'

import { CourseDetail } from '../../../components/pages/CourseDetail'
import { CourseType } from '../../../types/CourseType'
import { SectionType } from '../../../types/SectionType'
import { VideoType } from '../../../types/VideoType'
import { QuestionType } from 'types/QuestionType'
import Error from '../../error'

type CourseDetailPropsType = CourseType & {
  sections: (SectionType & { videos: VideoType[] })[]
}

export default async function CourseDetailPage({
  params,
}: {
  params: { courseId: string }
}) {
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
    const courseData: CourseDetailPropsType = await res.json()

    const handleGetQuestions = async (videoId: string) => {
      const getQuestions = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/question/${videoId}`,
        {
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      const questions: QuestionType[] = await getQuestions.json()
    }

    return (
      <CourseDetail
        courseData={courseData}
        session={session}
        // handleGetQuestions={handleGetQuestions}
        questions={questions}
      />
    )
  } catch (e) {
    return <Error />
  }
}
