'use client'
import React, { useState } from 'react'
import {
  Box,
  Center,
  Flex,
  Heading,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react'

import { CourseType } from '../../types'
import { SectionType } from '../../types'
import { VideoType } from '../../types'
import { VideoCard } from './VideoCard'
import { Loader } from '../atoms/Loader'
import { PRIMARY_FONT_COLOR } from '../../constants/colors'

type CourseDetailPropsType = CourseType & {
  sections: (SectionType & { videos: VideoType[] })[]
}

type SelectedVideo = {
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

export function FavoriteVideoList({
  favorites,
}: {
  favorites: FavoriteVideoType[]
}) {
  if (!favorites) return <Loader />

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

  return (
    <Center bg={'gray.200'}>
      <VStack mx="auto" padding={'60px 96px'}>
        <Heading py={10} color={PRIMARY_FONT_COLOR} fontSize="36px">
          お気に入り動画一覧
        </Heading>
        <Box mb={10}>
          <Flex
            alignItems="center"
            pb={2}
            borderBottom="1px"
            borderColor={'blackAlpha.500'}
          ></Flex>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            mt="40px"
            spacingX={[0, 10, 20]}
            spacingY="10"
          >
            {courses.map((course: CourseType) => (
              <VideoCard key={course.id} course={course} />
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Center>
  )
}
