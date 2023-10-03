'use client'
import React, { useState } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  AspectRatio,
  Box,
  Card,
  CardHeader,
  Container,
  Heading,
  HStack,
  Text,
  Spacer,
  Stack,
  StackDivider,
  VStack,
} from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'

import { CourseDetailVideoSection } from '../organisms/CourseDetailVideoSection'
import { CourseDetailAccordionMenu } from '../organisms/CourseDetailAccordionMenu'
import { WatchedButton } from 'components/atoms/WatchedButton'
import { WatchedCheckCircle } from 'components/atoms/WatchedCheckCircle'
import { CourseType } from '../../types/CourseType'
import { SectionType } from '../../types/SectionType'
import { VideoType } from '../../types/VideoType'
import { UserType } from 'types'
import '../../styles/markdown.css'
import { Session } from 'next-auth'

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
  const [isWatched, setIsWatched] = useState<boolean>(false)

  const userId = session?.user?.id

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

  const handleChangeVideo = (sectionIndex: number, videoIndex: number) => {
    setSelectedVideo({
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
    })
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
            isWatched={isWatched}
            setIsWatched={setIsWatched}
            courseData={courseData}
            selectedVideo={selectedVideo}
            setSelectedVideo={setSelectedVideo}
            handleChangeVideo={handleChangeVideo}
          />
          <CourseDetailVideoSection
            isWatched={isWatched}
            setIsWatched={setIsWatched}
            selectedVideo={selectedVideo}
            setSelectedVideo={setSelectedVideo}
          />
        </Container>
      </Container>
    </VStack>
  )
}
