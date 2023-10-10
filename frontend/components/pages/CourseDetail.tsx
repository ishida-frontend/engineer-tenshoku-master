'use client'
import React, { useEffect, useState } from 'react'
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
import { CourseType } from '../../types/CourseType'
import { SectionType } from '../../types/SectionType'
import { VideoType } from '../../types/VideoType'
import { QuestionType } from 'types/QuestionType'
import '../../styles/markdown.css'
import { Session } from 'next-auth'
import { useCustomToast } from 'hooks/useCustomToast'

type loadingStates = {
  watching: boolean
  favoriting: boolean
}

export type CourseDetailPropsType = CourseType & {
  sections: (SectionType & { videos: VideoType[] })[]
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
}: {
  courseData: CourseDetailPropsType
  session: Session | null
}) {
  const { showErrorToast } = useCustomToast()
  const userId = session?.user?.id

  const [isWatched, setIsWatched] = useState<Record<string, boolean>>({})
  const [isChecked, setIsChecked] = useState<Record<string, boolean>>({})
  const [isFavorited, setIsFavorited] = useState<Record<string, boolean>>({})
  const [loadingStates, setLoadingStates] = useState<loadingStates>({
    watching: false,
    favoriting: false,
  })

  const [questions, setQuestions] = useState<QuestionType[]>()

  const [videoId, setVideoId] = useState<string>(
    courseData.sections[0].videos[0].id,
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
    setLoadingStates({ watching: true, favoriting: true })

    const fetchData = async () => {
      try {
        const buttonStatus = await fetchButtonStatus({ userId, videoId })
        setIsWatched(buttonStatus as { [key: string]: boolean })

        const checkMarkStatuses = await fetchCheckMarkStatuses({
          userId: session?.user?.id,
          courseId: courseData.id,
        })
        setIsChecked(checkMarkStatuses)

        const favButtonStatus = await fetchFavButtonStatus({
          userId,
          videoId,
        })
        setIsFavorited(favButtonStatus as { [key: string]: boolean })
      } catch (error) {
        showErrorToast(`${error}`)
      } finally {
        setLoadingStates({ watching: false, favoriting: false })
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
      setIsChecked((prevViewingStatus) => ({
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
    setLoadingStates((prev) => ({ ...prev, favoriting: true }))

    const newFavoritedStatus = !(isFavorited?.[videoId] || false)
    setIsFavorited((prevFavoriteStatus) => ({
      ...prevFavoriteStatus,
      [videoId]: newFavoritedStatus,
    }))

    try {
      await upsertFavoriteVideo({
        isFavorited: newFavoritedStatus,
        userId,
        videoId,
      })
    } catch (error) {
      showErrorToast(`${error}`)
    } finally {
      setLoadingStates((prev) => ({ ...prev, favoriting: false }))
    }
  }

  const handleGetQuestions = async (videoId: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/question/${videoId}`,
      {
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const getQuestions: QuestionType[] = await res.json()
    setQuestions(getQuestions)
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
            questions={questions}
            isWatched={isWatched}
            isFavorited={isFavorited}
            loadingStates={loadingStates}
            handleViewingStatus={handleViewingStatus}
            handleFavoriteVideoStatus={handleFavoriteVideoStatus}
            handleGetQuestions={handleGetQuestions}
          />
        </Container>
      </Container>
    </VStack>
  )
}
