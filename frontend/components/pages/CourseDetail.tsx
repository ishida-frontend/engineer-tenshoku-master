'use client'
import React, { useEffect, useState } from 'react'
import { Container, VStack } from '@chakra-ui/react'

import { CourseDetailVideoSection } from '../organisms/CourseDetailVideoSection'
import { CourseDetailAccordionMenu } from '../organisms/CourseDetailAccordionMenu'
import { CourseType } from '../../types/CourseType'
import { SectionType } from '../../types/SectionType'
import { VideoType } from '../../types/VideoType'
import '../../styles/markdown.css'
import { Session } from 'next-auth'
import { useCustomToast } from 'hooks/useCustomToast'

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
  const userId = session?.user?.id
  const [isWatched, setIsWatched] = useState<boolean>(false)
  const { showErrorToast } = useCustomToast()

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
  const [videoId, setVideoId] = useState<string>(
    courseData.sections[0].videos[0].id,
  )
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

  const toggleViewingStatus = () => {
    console.log('isWatched', isWatched)
    if (isWatched === null || isWatched === false) {
      setIsWatched(true)
    } else {
      setIsWatched(false)
    }
  }
  const updateViewingStatus = async ({
    isWatched,
    userId,
    videoId,
  }: {
    isWatched: boolean
    userId: string | undefined
    videoId: string
  }) => {
    console.log('isWatched:', isWatched)
    console.log('userId:', userId)
    console.log('videoId:', videoId)

    // DBにステータス情報がある場合は更新
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/viewingstatus/${userId}/${videoId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            isWatched,
            userId,
            videoId,
          }),
        },
      )
      const result = await res.json()

      if (result.status !== 201) {
        // DBにステータス情報がない場合は作成
        await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/viewingstatus/${userId}/${videoId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
      }
      const viewingStatus = await res.json()
      setIsWatched(viewingStatus)
    } catch (error) {
      showErrorToast('視聴ステータスの変更に失敗しました')
    }
  }

  const handleViewingStatus = async () => {
    toggleViewingStatus()
    await updateViewingStatus({ isWatched, userId, videoId })
  }

  const fetchViewingStatus = async () => {
    if (!userId || !videoId) return

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/viewingstatus/${userId}/${videoId}`,
      )
      const viewingStatus = await res.json()
      setIsWatched(viewingStatus || false)
    } catch (error) {
      showErrorToast('視聴ステータスの取得に失敗しました')
    }
  }
  useEffect(() => {
    fetchViewingStatus()
  }, [videoId])

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
            isWatched={isWatched}
            setIsWatched={setIsWatched}
            courseData={courseData}
            selectedVideo={selectedVideo}
            setSelectedVideo={setSelectedVideo}
            handleChangeVideo={handleChangeVideo}
          />
          <CourseDetailVideoSection
            userId={userId}
            selectedVideo={selectedVideo}
            isWatched={isWatched}
            setIsWatched={setIsWatched}
            handleViewingStatus={handleViewingStatus}
          />
        </Container>
      </Container>
    </VStack>
  )
}
