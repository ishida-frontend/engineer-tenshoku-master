'use client'
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useParams } from 'next/navigation'
import useSWR from 'swr'

import formatDate from '../../../utils/formatDate'
import { Loader } from '../../../components/admin/atoms/Loader'
import { VideoType } from '../../../types'
import { SectionType } from '../../../types'
import { useCustomToast } from '../../../hooks/useCustomToast'
import { VideoRemover } from './VideoRemover'

export function VideoList({ courseId }: { courseId: number }) {
  const { showErrorToast } = useCustomToast()

  const courseFetcher = async () =>
    (
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/course/${courseId}`,
      )
    ).json()
  const { data: course, error: courseError } = useSWR('specifiedCourse')

  const videoFetcher = async () =>
    (await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/video`)).json()
  const { data: videos, error: videosError } = useSWR('videoList')

  if (courseError) {
    showErrorToast('コースの取得に失敗しました')
  }
  if (videosError) {
    showErrorToast('動画の取得に失敗しました')
  }

  if (!videos) return <Loader />

  return (
    <VStack w="full" maxW="600px" mx="auto" p={6}>
      <Heading size="lg">動画編集画面</Heading>
      <Text fontSize="24px">コース： {course.name}</Text>

      {course.sections.map((section: SectionType) => (
        <VStack key={section.id} w="600px" border="1px" bgColor="gray.200">
          <Box>
            Section {section.id} - {section.title}
          </Box>

          <Flex justify="space-evenly">
            <SimpleGrid columns={3} spacing={2}>
              {section.videos.map((video: VideoType) => (
                <Card key={video.id} maxW="170px" my={1}>
                  <CardBody>
                    <Text>動画{video.order}</Text>
                    <Text>{video.name}</Text>
                    <Text isTruncated>{video.description}</Text>
                    <Text>{video.published ? '公開' : '非公開'}</Text>
                    <Button
                      colorScheme="green"
                      onClick={() => openModal(video.id)}
                    >
                      編集
                    </Button>
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
