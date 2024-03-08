'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Container, VStack } from '@chakra-ui/react'

import { CourseDetailVideoSection } from '../organisms/CourseDetailVideoSection'
import { CourseDetailAccordionMenu } from '../organisms/CourseDetailAccordionMenu'

import { useCustomToast } from '../../hooks/useCustomToast'
import { QUESTION_PAGES } from '../../constants/index'
import { CreateQuestionErrorType, QuestionType } from '../../types/QuestionType'
import { courseDetailPropsType, QuestionPageType } from '../../types'

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

type QuestionValidationError = {
  path: string[]
  message: string
}

export function CourseDetail(courseDetailProps: courseDetailPropsType) {
  const router = useRouter()
  const { showErrorToast } = useCustomToast()
  const params = useParams<{ videoId: string }>()
  const searchedVideoId = params.videoId

  const minTitleLength = 10
  const maxTitleLength = 255
  const minContentLength = 15

  const [createQuestionErrors, setCreateQuestionErrors] =
    useState<CreateQuestionErrorType>({ title: '', content: '' })
  const [questionPage, setQuestionPage] = useState<QuestionPageType>(
    QUESTION_PAGES.QuestionList,
  )

  const [videoId, setVideoId] = useState<string>(
    searchedVideoId || courseDetailProps.courseData.sections[0].videos[0].id,
  )
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionType>()
  const [selectedVideo, setSelectedVideo] = useState<SelectedVideo | null>(null)

  useEffect(() => {
    if (courseDetailProps.questions) {
      const questionData = courseDetailProps.questions.find((question) => {
        return question.id === courseDetailProps.questionId
      })
      setSelectedQuestion(questionData)
    }
  }, [courseDetailProps.questionId, courseDetailProps.questions])

  useEffect(() => {
    const section = courseDetailProps.courseData.sections.find(
      (currentSection) =>
        currentSection.videos.some((video) => video.id === searchedVideoId),
    )

    const video = section
      ? section.videos.find((video) => video.id === searchedVideoId)
      : null

    if (video && section) {
      const selectedVideoData = {
        id: courseDetailProps.courseData.id,
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
  }, [searchedVideoId, courseDetailProps.courseData])

  const handleChangeVideo = (sectionIndex: number, videoIndex: number) => {
    const currentlySelectedVideo = {
      id: courseDetailProps.courseData.id,
      sections: {
        id: courseDetailProps.courseData.sections[sectionIndex].id,
        order: courseDetailProps.courseData.sections[sectionIndex].order,
        videos: {
          id: courseDetailProps.courseData.sections[sectionIndex].videos[
            videoIndex
          ].id,
          order:
            courseDetailProps.courseData.sections[sectionIndex].videos[
              videoIndex
            ].order,
          name: courseDetailProps.courseData.sections[sectionIndex].videos[
            videoIndex
          ].name,
          description:
            courseDetailProps.courseData.sections[sectionIndex].videos[
              videoIndex
            ].description,
          url: courseDetailProps.courseData.sections[sectionIndex].videos[
            videoIndex
          ].url,
        },
      },
    }
    setSelectedVideo(currentlySelectedVideo)
    setVideoId(currentlySelectedVideo.sections.videos.id)
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
            user_id: courseDetailProps.session.user.id,
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
        result.errors[0].map((error: QuestionValidationError) => {
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
          user_id: courseDetailProps.session?.user.id,
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

  let accordionMenuProps = {
    session: courseDetailProps.session,
    completePercentage: courseDetailProps.completePercentage,
    checkedStatus: courseDetailProps.checkedStatus,
    courseData: courseDetailProps.courseData,
    handleChangeVideo: handleChangeVideo,
  }

  let videoSectionProps = {
    questions: courseDetailProps.questions,
    handleViewingStatus: courseDetailProps.handleViewingStatus,
    watchedStatus: courseDetailProps.watchedStatus,
    favoritedStatus: courseDetailProps.favoritedStatus,
    isWatchingLoading: courseDetailProps.isWatchingLoading,
    isFavoriteLoading: courseDetailProps.isFavoriteLoading,
    handleFavoriteVideoStatus: courseDetailProps.handleFavoriteVideoStatus,
    answers: courseDetailProps.answers,
    session: courseDetailProps.session,
    getAnotherUserProfile: courseDetailProps.getAnotherUserProfile,
    anotherUserProfile: courseDetailProps.anotherUserProfile,
    isProfileOpen: courseDetailProps.isProfileOpen,
    closeProfileModal: courseDetailProps.closeProfileModal,
    selectedVideo: selectedVideo,
    questionPage: questionPage,
    changeQuestionPage: changeQuestionPage,
    createQuestion: createQuestion,
    createQuestionErrors: createQuestionErrors,
    selectedQuestion: selectedQuestion,
    createAnswer: createAnswer,
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
          <CourseDetailAccordionMenu {...accordionMenuProps} />
          <CourseDetailVideoSection {...videoSectionProps} />
        </Container>
      </Container>
    </VStack>
  )
}
