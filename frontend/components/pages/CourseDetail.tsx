'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Container, VStack } from '@chakra-ui/react'

import {
  upsertViewingStatus,
  fetchButtonStatus,
  fetchCheckMarkStatuses,
} from '../../app/api/course/[courseId]/viewingStatus'
import {
  upsertFavoriteVideo,
  fetchFavButtonStatus,
} from '../../app/api/course/[courseId]/favoriteVideo'
import { CourseDetailVideoSection } from '../organisms/CourseDetailVideoSection'
import { CourseDetailAccordionMenu } from '../organisms/CourseDetailAccordionMenu'
import { CourseWithSectionsType } from '../../types/CourseType'
import { QuestionType } from 'types/QuestionType'
import '../../styles/markdown.css'
import { Session } from 'next-auth'
import { useCustomToast } from 'hooks/useCustomToast'
import { CreateQuestionErrorType } from 'types/QuestionType'
import { QUESTION_PAGES } from 'constants/index'
import { QuestionPageType } from 'types/QuestionType'
import { AnswerType } from 'types/AnswerType'

type loadingStates = {
  watching: boolean
  isFavorite: boolean
}

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

export function CourseDetail({
  courseData,
  session,
  questions,
  answers,
  questionId,
}: {
  courseData: CourseWithSectionsType
  session: Session | null
  questions?: QuestionType[]
  answers: AnswerType[]
  questionId?: string
}) {
  const router = useRouter()
  const { showErrorToast } = useCustomToast()
  const userId = session?.user?.id
  const searchParams = useSearchParams()
  const searchedVideoId = searchParams.get('videoId')

  const minTitleLength = 10
  const maxTitleLength = 255
  const minContentLength = 15
  const [createQuestionErrors, setCreateQuestionErrors] =
    useState<CreateQuestionErrorType>({ title: '', content: '' })
  const [questionPage, setQuestionPage] = useState<QuestionPageType>(
    QUESTION_PAGES.QuestionList,
  )
  const [watchedStatus, setWatchedStatus] = useState<Record<string, boolean>>(
    {},
  )
  const [checkedStatus, setCheckedStatus] = useState<Record<string, boolean>>(
    {},
  )
  const [favoritedStatus, setFavoritedStatus] = useState<
    Record<string, boolean>
  >({})
  const [loadingStates, setLoadingStates] = useState<loadingStates>({
    watching: false,
    isFavorite: false,
  })

  const [videoId, setVideoId] = useState<string>(
    searchedVideoId || courseData.sections[0].videos[0].id,
  )
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionType>()
  const [selectedVideo, setSelectedVideo] = useState<SelectedVideo | null>(null)

  useEffect(() => {
    try {
      if (questions) {
        const questionData = questions.find((question) => {
          return question.id === questionId
        })
        setSelectedQuestion(questionData)
      }
    } catch (error) {
      throw error
    }
  }, [questionId, questions])

  useEffect(() => {
    const section = courseData.sections.find((currentSection) =>
      currentSection.videos.some((video) => video.id === searchedVideoId),
    )

    const video = section
      ? section.videos.find((video) => video.id === searchedVideoId)
      : null

    if (video && section) {
      const selectedVideoData = {
        id: courseData.id,
        sections: {
          id: section.id,
          order: section.order,
          videos: {
            id: video.id,
            order: video.order,
            name: video.name,
            description: video.description,
            url: video.url,
          },
        },
      }
      setSelectedVideo(selectedVideoData)
      setVideoId(video.id)
    } else {
      showErrorToast('該当の動画が見つかりませんでした')
    }
  }, [searchedVideoId, courseData])

  useEffect(() => {
    setLoadingStates({ watching: true, isFavorite: true })

    const fetchData = async () => {
      try {
        const buttonStatus = await fetchButtonStatus({ userId, videoId })
        setWatchedStatus(buttonStatus as { [key: string]: boolean })

        const checkMarkStatuses = await fetchCheckMarkStatuses({
          userId: session?.user?.id,
          courseId: courseData.id,
        })
        setCheckedStatus(checkMarkStatuses)

        const favButtonStatus = await fetchFavButtonStatus({
          userId,
          videoId,
        })
        setFavoritedStatus(favButtonStatus as { [key: string]: boolean })
      } catch (error) {
        showErrorToast(`${error}`)
      } finally {
        setLoadingStates({ watching: false, isFavorite: false })
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
    setLoadingStates((prev) => ({ ...prev, watching: true }))

    const newWatchedStatus = !(watchedStatus?.[videoId] || false)
    setWatchedStatus((prevStatus) => ({
      ...prevStatus,
      [videoId]: newWatchedStatus,
    }))

    try {
      await upsertViewingStatus({
        isWatched: newWatchedStatus,
        userId,
        videoId,
      })
      setCheckedStatus((prevViewingStatus) => ({
        ...prevViewingStatus,
        [videoId]: newWatchedStatus,
      }))
    } catch (error) {
      showErrorToast(`${error}`)
    } finally {
      setLoadingStates((prev) => ({ ...prev, watching: false }))
    }
  }

  const handleFavoriteVideoStatus = async () => {
    setLoadingStates((prev) => ({ ...prev, isFavorite: true }))

    const newFavoritedStatus = !(favoritedStatus?.[videoId] || false)
    setFavoritedStatus((prevFavoriteStatus) => ({
      ...prevFavoriteStatus,
      [videoId]: newFavoritedStatus,
    }))

    try {
      await upsertFavoriteVideo({
        favoritedStatus: newFavoritedStatus,
        userId,
        videoId,
      })
    } catch (error) {
      showErrorToast(`${error}`)
    } finally {
      setLoadingStates((prev) => ({ ...prev, isFavorite: false }))
    }
  }

  const createQuestion = async (createQuestionParams: {
    title: string
    content: string
  }) => {
    const { title, content } = createQuestionParams
    if (title && title.length >= minTitleLength) {
      setCreateQuestionErrors((prevErrors) => ({ ...prevErrors, title: '' }))
    } else if (title.length <= minTitleLength) {
      setCreateQuestionErrors((prevErrors) => ({
        ...prevErrors,
        title: `※${minTitleLength}文字以上入力してください`,
      }))
    } else if (title.length >= maxTitleLength) {
      setCreateQuestionErrors((prevErrors) => ({
        ...prevErrors,
        title: `※${maxTitleLength}文字以内で入力してください`,
      }))
    }

    if (content && content.length >= minContentLength) {
      setCreateQuestionErrors((prevErrors) => ({ ...prevErrors, content: '' }))
    } else {
      setCreateQuestionErrors((prevErrors) => ({
        ...prevErrors,
        content: `※${minContentLength}文字以上入力してください`,
      }))
    }

    if (
      title.length >= minTitleLength &&
      title.length <= maxTitleLength &&
      content.length >= minContentLength
    ) {
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
        router.refresh()
        await setQuestionPage('QuestionList')
      } else if (result.errors) {
        result.errors[0].map((error: any) => {
          if (error.path[0] === 'title') {
            setCreateQuestionErrors((prevErrors) => ({
              ...prevErrors,
              title: error.message,
            }))
          } else if (error.path[0] === 'content') {
            setCreateQuestionErrors((prevErrors) => ({
              ...prevErrors,
              content: error.message,
            }))
          }
        })
      }
    }
  }

  const createAnswer = async (createAnswerParams: { comment: string }) => {
    const { comment } = createAnswerParams
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/answer/create`,
      {
        method: 'POST',
        body: JSON.stringify({
          question_id: selectedQuestion?.id,
          user_id: session?.user.id,
          comment,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    if (response.status === 200) {
      router.refresh()
    }
  }

  const changeQuestionPage = (value: QuestionPageType) => {
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
            checkedStatus={checkedStatus}
            courseData={courseData}
            handleChangeVideo={handleChangeVideo}
          />
          <CourseDetailVideoSection
            userId={userId}
            selectedVideo={selectedVideo}
            questionPage={questionPage}
            changeQuestionPage={changeQuestionPage}
            questions={questions}
            createQuestion={createQuestion}
            createQuestionErrors={createQuestionErrors}
            handleViewingStatus={handleViewingStatus}
            watchedStatus={watchedStatus}
            favoritedStatus={favoritedStatus}
            loadingStates={loadingStates}
            handleFavoriteVideoStatus={handleFavoriteVideoStatus}
            answers={answers}
            session={session}
            selectedQuestion={selectedQuestion}
            createAnswer={createAnswer}
          />
        </Container>
      </Container>
    </VStack>
  )
}
