'use client'
import React, { useEffect, useState } from 'react'
import { Container, VStack } from '@chakra-ui/react'

import {
  fetchButtonStatus,
  fetchCheckMarkStatuses,
  upsertViewingStatus,
} from '../../app/api/course/[courseId]/viewingStatus'
import { CourseDetailVideoSection } from '../organisms/CourseDetailVideoSection'
import { CourseDetailAccordionMenu } from '../organisms/CourseDetailAccordionMenu'
import { CourseWithSectionsType } from '../../types/CourseType'
import { QuestionType } from 'types/QuestionType'
import '../../styles/markdown.css'
import { Session } from 'next-auth'
import { useCustomToast } from 'hooks/useCustomToast'
import { useSearchParams } from 'next/navigation'

export type SelectedVideo = {
  id: string
  sections: {
    id: string
    order: number
    videos: {
      id: string
      order: number
      name: string
      description: string
      url: string
    }
  }
}

export type HandleChangeVideo = (
  sectionIndex: number,
  videoIndex: number,
) => void

export type CreateQuestionErrorType = { title: string; content: string }

export function CourseDetail({
  courseData,
  session,
  // handleGetQuestions,
  questions,
}: {
  courseData: CourseWithSectionsType
  session: Session | null
  // handleGetQuestions: (videoId: string) => void
  questions?: QuestionType[]
}) {
  const { showErrorToast } = useCustomToast()
  const userId = session?.user?.id
  const searchParams = useSearchParams()
  const searchedVideoId = searchParams.get('videoId')

  const [isWatched, setIsWatched] = useState<{ [key: string]: boolean }>({})
  const [isChecked, setIsChecked] = useState<{ [key: string]: boolean }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [getQuestions, setGetQuestions] = useState<QuestionType[] | undefined>(
    questions,
  )
  const [createQuestionErrors, setCreateQuestionErrors] =
    useState<CreateQuestionErrorType>({ title: '', content: '' })
  const [questionPage, setQuestionPage] = useState('QuestionList')
  const [videoId, setVideoId] = useState<string>(
    searchedVideoId || courseData.sections[0].videos[0].id,
  )
  const [selectedVideo, setSelectedVideo] = useState<SelectedVideo>({
    id: courseData.id,
    sections: {
      id: courseData.sections[0].id,
      order: courseData.sections[0].order,
      videos: {
        id: courseData.sections[0].videos[0].id,
        order: courseData.sections[0].videos[0].order,
        name: courseData.sections[0].videos[0].name,
        description: courseData.sections[0].videos[0].description,
        url: courseData.sections[0].videos[0].url,
      },
    },
  })

  useEffect(() => {
    setIsLoading(true)

    const fetchData = async () => {
      try {
        const buttonStatus = await fetchButtonStatus({ userId, videoId })
        setIsWatched(buttonStatus as { [key: string]: boolean })

        const checkMarkStatuses = await fetchCheckMarkStatuses({
          userId: session?.user?.id,
          courseId: courseData.id,
        })

        setIsChecked(checkMarkStatuses)
      } catch (error) {
        showErrorToast(`${error}`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [courseData, session, videoId])

  const handleChangeVideo = (sectionIndex: number, videoIndex: number) => {
    const currentlySelectedVideo = {
      id: courseData.id,
      sections: {
        id: courseData.sections[sectionIndex].id,
        order: courseData.sections[sectionIndex].order,
        videos: {
          id: courseData.sections[sectionIndex].videos[videoIndex].id,
          order: courseData.sections[sectionIndex].videos[videoIndex].order,
          name: courseData.sections[sectionIndex].videos[videoIndex].name,
          description:
            courseData.sections[sectionIndex].videos[videoIndex].description,
          url: courseData.sections[sectionIndex].videos[videoIndex].url,
        },
      },
    }
    setSelectedVideo(currentlySelectedVideo)
    setVideoId(currentlySelectedVideo.sections.videos.id)
  }

  const handleViewingStatus = async () => {
    const newWatchedStatus = !(isWatched?.[videoId] || false)
    setIsWatched((prevStatus) => ({
      ...prevStatus,
      [videoId]: newWatchedStatus,
    }))

    try {
      await upsertViewingStatus({
        isWatched: newWatchedStatus,
        userId,
        videoId,
      })
      setIsChecked((prevStatus) => ({
        ...prevStatus,
        [videoId]: newWatchedStatus,
      }))
    } catch (error) {
      showErrorToast(`${error}`)
    }
  }

  const handleFavIconToggle = () => {
    setIsFavorited((prevState) => !prevState)
  }

  // const handleGetQuestions = async (videoId: string) => {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/question/${videoId}`,
  //     {
  //       cache: 'no-cache',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     },
  //   )
  //   const getQuestions: QuestionType[] = await res.json()
  //   setQuestions(getQuestions)
  // }

  const createQuestion = async (createQuestionParams: {
    title: string
    content: string
  }) => {
    const { title, content } = createQuestionParams
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/question/create`,
      {
        method: 'POST',
        body: JSON.stringify({
          title,
          content,
          video_id: videoId,
          user_id: userId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const result = await response.json()
    if (response.status === 200) {
      // await handleGetQuestions
      await setQuestionPage('QuestionList')

      if (result.errors) {
        result.errors[0].map((error) => {
          if (error.path[0] === 'title') {
            setCreateQuestionErrors((prevErrors) => ({
              ...prevErrors,
              title: error.message[0],
            }))
          } else if (error.path[0] === 'content') {
            setCreateQuestionErrors((prevErrors) => ({
              ...prevErrors,
              content: error.message[0],
            }))
          }
        })
      }
    }
  }

  const changeQuestionPage = async (value: string) => {
    setQuestionPage(value)
  }

  return (
    <VStack minH={'100vh'} bg={'gray.100'}>
      <Container minWidth={'100%'} padding={'0px'} bg={'white'}>
        <Container
          minWidth={'100%'}
          padding={'0px'}
          overflow={'hidden'}
          bg={'gray.100'}
        >
          <CourseDetailAccordionMenu
            userId={userId}
            isChecked={isChecked}
            courseData={courseData}
            handleChangeVideo={handleChangeVideo}
          />
          <CourseDetailVideoSection
            userId={userId}
            selectedVideo={selectedVideo}
            questionPage={questionPage}
            questions={questions}
            changeQuestionPage={changeQuestionPage}
            createQuestionErrors={createQuestionErrors}
            isWatched={isWatched}
            isFavorited={isFavorited}
            isLoading={isLoading}
            handleViewingStatus={handleViewingStatus}
            handleFavIconToggle={handleFavIconToggle}
            // handleGetQuestions={handleGetQuestions}
            createQuestion={createQuestion}
          />
        </Container>
      </Container>
    </VStack>
  )
}
