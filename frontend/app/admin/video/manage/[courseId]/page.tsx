'use client'
import React from 'react'
import useSWR from 'swr'
import { useParams } from 'next/navigation'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { GoVideo } from 'react-icons/go'

import { Loader } from '../../../../../components/atoms/Loader'
import { SectionType } from '../../../../../types'
import { VideoCreateModal } from '../../../../../components/admin/organisms/VideoCreateModal'
import { VideoEditModal } from '../../../../../components/admin/organisms/VideoEditModal'
import { VideoRemoveModal } from '../../../../../components/admin/organisms/VideoRemoveModal'
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

  const { data: courseData, error } = useSWR(`course${courseId}`, courseFetcher)

  if (!courseData) {
    return <Loader />
  }

  return (
    <VStack w="full" maxW="600px" mx="auto" py={6}>
      <Heading size="md" fontSize="24px">
        動画管理画面
      </Heading>
      <Heading size="md" my={2}>
        {courseData.name}
      </Heading>
      {courseData.sections.map((section: SectionType) => (
        <Accordion allowToggle key={section.id}>
          <AccordionItem>
            <VStack p={5} bgColor="gray.200" minW="600px" borderRadius={9}>
              <AccordionButton>
                <AccordionIcon />
                <Heading size="sm" ml={2}>
                  Section {section.id} - {section.title}
                </Heading>
              </AccordionButton>
              <AccordionPanel p={1}>
                <Flex justify="space-evenly">
                  <SimpleGrid columns={2} spacing={5} mb={4}>
                    {section.videos
                      .sort((a: VideoType, b: VideoType) => a.order - b.order)
                      .map((video: VideoType) => (
                        <Card
                          key={video.id}
                          w="250px"
                          maxH="320px"
                          borderRadius={9}
                        >
                          <CardBody>
                            <HStack>
                              <Text>No. {video.order}</Text>
                              {video.published ? (
                                <AiFillEye />
                              ) : (
                                <AiFillEyeInvisible />
                              )}
                            </HStack>
                            <Flex justify="center">
                              <GoVideo size="100px" />
                            </Flex>
                            <Text isTruncated>{video.name}</Text>
                            <Divider
                              mt={1}
                              mb={2}
                              size="3px"
                              borderColor="gray"
                            />
                            <Flex justify="space-evenly">
                              <VideoEditModal
                                courseId={courseId}
                                videoId={video.id}
                                section={section}
                              />
                              <VideoRemoveModal
                                courseId={courseId}
                                videoId={video.id}
                              />
                            </Flex>
                          </CardBody>
                        </Card>
                      ))}
                  </SimpleGrid>
                </Flex>
                <Flex justify="right">
                  <VideoCreateModal
                    courseId={courseId}
                    sectionId={section.id}
                  />
                </Flex>
              </AccordionPanel>
            </VStack>
          </AccordionItem>
        </Accordion>
      ))}
    </VStack>
  )
}
