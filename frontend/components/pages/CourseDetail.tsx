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
import { useRouter } from 'next/navigation'

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
  questions,
}: {
  courseData: CourseWithSectionsType
  session: Session | null
  questions?: QuestionType[]
}) {
  const router = useRouter()
  const { showErrorToast } = useCustomToast()
  const userId = session?.user?.id
  const searchParams = useSearchParams()
  const searchedVideoId = searchParams.get('videoId')

  const [isWatched, setIsWatched] = useState<{ [key: string]: boolean }>({})
  const [isChecked, setIsChecked] = useState<{ [key: string]: boolean }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
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

  const createQuestion = async (createQuestionParams: {
    title: string
    content: string
  }) => {
    const { title, content } = createQuestionParams
    // if (title && title.length >= 15) {
    //   setCreateQuestionErrors((prevErrors) => ({ ...prevErrors, title: '' }))
    // } else {
    //   setCreateQuestionErrors((prevErrors) => ({
    //     ...prevErrors,
    //     title: '※15文字以上入力してください',
    //   }))
    // }

    // if (content && content.length >= 15) {
    //   setCreateQuestionErrors((prevErrors) => ({ ...prevErrors, content: '' }))
    // } else {
    //   setCreateQuestionErrors((prevErrors) => ({
    //     ...prevErrors,
    //     content: '※15文字以上入力してください',
    //   }))
    // }

    // if (title.length >= 15 && content.length >= 15) {
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
      console.log('result.errors[0]:', result.errors[0])
      const isTitleError = result.errors[0].filter((error) => {
        error.path[0] === 'title'
      })
      console.log('isTitleError:', isTitleError)
      // if (!isTitleError) {
      //   console.log('nonTitle')
      //   setCreateQuestionErrors((prevErrors) => ({
      //     ...prevErrors,
      //     title: '',
      //   }))
      // }else if(isTitleError){
      //     console.log('ErrorTitle')
      //     setCreateQuestionErrors((prevErrors) => ({
      //       ...prevErrors,
      //       title: error.message,
      //     }))

      // }
      // }
      //   if (error.path[0] != 'content') {
      //     console.log('nonContent')
      //     setCreateQuestionErrors((prevErrors) => ({
      //       ...prevErrors,
      //       content: '',
      //     }))
      //   } else if (error.path[0] === 'content') {
      //     console.log('ErrorContent')
      //     setCreateQuestionErrors((prevErrors) => ({
      //       ...prevErrors,
      //       content: error.message,
      //     }))
      //   }
      // })
    }
    // }
    // }
  }
  console.log('createQuestionErrors:', createQuestionErrors)

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
            createQuestion={createQuestion}
          />
        </Container>
      </Container>
    </VStack>
  )
}
