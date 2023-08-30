'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import useSWR, { mutate } from 'swr'

import { Loader } from '../../../../../components/atoms/Loader'
import { SectionType } from '../../../../../types'
import { VideoCreateModal } from '../../../../../components/admin/organisms/VideoCreateModal'
import { VideoEditModal } from '../../../../../components/admin/organisms/VideoEditModal'
import { VideoRemover } from '../../../../../components/admin/organisms/VideoRemover'
import { VideoType } from '../../../../../types'

export default function EditVideoPage() {
  const params = useParams()
  const courseId = Number(params.courseId) || NaN
  const courseFetcher = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/course/${courseId}`,
    )
    const data = await response.json()

    data.sections.forEach((section: SectionType) => {
      section.videos = section.videos.filter(
        (video: VideoType) => !video.deleted_at,
      )
    })
    return data
  }

  const { data: course, error } = useSWR(`course${courseId}`, courseFetcher)

  if (!course) {
    return <Loader />
  }

  return (
    <VStack w="full" maxW="600px" mx="auto" p={6}>
      <Heading size="lg">動画編集画面</Heading>
      <Text fontSize="24px">コース： {course.name}</Text>

      {course.sections.map((section: SectionType) => (
        <VStack key={section.id} w="600px" border="1px" bgColor="gray.200">
          <Box>
            Section {section.id} - {section.title}
          </Box>

          <VideoCreateModal courseId={courseId} sectionId={section.id} />

          <Flex justify="space-evenly">
            <SimpleGrid columns={3} spacing={2}>
              {section.videos.map((video: VideoType) => (
                <Card key={video.id} maxW="170px" my={1}>
                  <CardBody>
                    <Text>動画{video.order}</Text>
                    <Text>{video.name}</Text>
                    <Text isTruncated>{video.description}</Text>
                    <Text>{video.published ? '公開' : '非公開'}</Text>
                    <VideoEditModal videoId={video.id} />
                    <VideoRemover courseId={courseId} videoId={video.id} />
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </Flex>
        </VStack>
      ))}
    </VStack>
  )
}
