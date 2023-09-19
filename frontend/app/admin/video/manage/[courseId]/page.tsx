'use client'
import React, { useState } from 'react'
import useSWR from 'swr'
import { useParams } from 'next/navigation'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { GoVideo } from 'react-icons/go'

import { VideoCreateModal } from '../../../../../components/admin/organisms/VideoCreateModal'
import { VideoEditModal } from '../../../../../components/admin/organisms/VideoEditModal'
import { VideoRemoveModal } from '../../../../../components/admin/organisms/VideoRemoveModal'
import { Loader } from '../../../../../components/atoms/Loader'
import { useCustomToast } from '../../../../../hooks/useCustomToast'
import { SectionType } from '../../../../../types'
import { VideoType } from '../../../../../types'

export default function EditVideoPage() {
  const { showErrorToast } = useCustomToast()

  const [currentSectionId, setCurrentSectionId] = useState<number | null>(null)

  // 動画カード追加モーダル関連
  const [maxOrder, setMaxOrder] = useState<number>(1)
  const {
    isOpen: isCreateModalOpen,
    onOpen: openCreateModal,
    onClose: closeCreateModal,
  } = useDisclosure()

  // 動画カード編集モーダル関連
  const [sectionToEdit, setSectionToEdit] = useState<SectionType | null>(null)
  const [videoToEdit, setVideoToEdit] = useState<number | null>(null)
  const {
    isOpen: isEditModalOpen,
    onOpen: openEditModal,
    onClose: closeEditModal,
  } = useDisclosure()

  // 動画カード削除モーダル関連
  const [videoToRemove, setVideoToRemove] = useState<number | null>(null)
  const {
    isOpen: isRemoveModalOpen,
    onOpen: openRemoveModal,
    onClose: closeRemoveModal,
  } = useDisclosure()

  // courseIdをもとにコースデータを取得
  const params = useParams()
  const { courseId } = params as { courseId: string }

  const fetchCourseData = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/course/${courseId}`,
    )
    const originalData = await response.json()

    const mappedSections = originalData.sections.map(
      (section: SectionType) => ({
        ...section,
        videos: section.videos.filter((video: VideoType) => !video.deleted_at),
      }),
    )

    return { ...originalData, sections: mappedSections }
  }

  const { data: courseData, error } = useSWR(
    `course${courseId}`,
    fetchCourseData,
  )

  if (!courseData) {
    return <Loader />
  }
  if (error) {
    showErrorToast('データの取得に失敗しました')
  }

  const handleCreateVideo = (sectionId: number) => {
    setCurrentSectionId(sectionId)
    const currentSection = courseData?.sections.find(
      (s: SectionType) => s.id === sectionId,
    )
    if (currentSection) {
      // 動画追加時ボタン押下時に、セクション内の既存動画で１番大きい再生順番に＋１
      const maxOrderInSection = Math.max(
        ...currentSection.videos.map((v: VideoType) => v.order),
        0,
      )
      setMaxOrder(maxOrderInSection + 1)
    }
    openCreateModal()
  }

  const handleEditVideo = (videoId: number, section: SectionType) => {
    setSectionToEdit(section)
    setVideoToEdit(videoId)
    openEditModal()
  }

  return (
    <VStack maxW="600px" mx="auto" py={6}>
      <Heading size="md" fontSize="24px">
        動画管理画面
      </Heading>
      <Heading size="md" my={2}>
        {courseData.name}
      </Heading>
      {courseData.sections.map((section: SectionType) => (
        <Accordion allowToggle key={section.id}>
          <AccordionItem border="none">
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
                                <AiFillEye size="20px" />
                              ) : (
                                <AiFillEyeInvisible size="20px" />
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
                              <Button
                                colorScheme="green"
                                onClick={() =>
                                  handleEditVideo(video.id, section)
                                }
                                ml={1}
                              >
                                編集
                              </Button>
                              <Button
                                colorScheme="red"
                                onClick={() => {
                                  setVideoToRemove(video.id)
                                  openRemoveModal()
                                }}
                              >
                                削除
                              </Button>
                            </Flex>
                          </CardBody>
                        </Card>
                      ))}
                  </SimpleGrid>
                </Flex>
                <Flex justify="center">
                  <Button
                    colorScheme="green"
                    onClick={() => handleCreateVideo(section.id)}
                  >
                    追加
                  </Button>
                  <VideoCreateModal
                    courseId={courseId}
                    sectionId={section.id}
                    currentSectionId={currentSectionId}
                    maxOrder={maxOrder}
                    isOpen={isCreateModalOpen}
                    onClose={closeCreateModal}
                  />
                  <VideoEditModal
                    courseId={courseId}
                    section={sectionToEdit}
                    videoId={videoToEdit}
                    isOpen={isEditModalOpen}
                    onClose={() => {
                      setVideoToEdit(videoToEdit)
                      closeEditModal()
                    }}
                  />
                  <VideoRemoveModal
                    courseId={courseId}
                    videoId={videoToRemove}
                    isOpen={isRemoveModalOpen}
                    onClose={() => {
                      setVideoToRemove(null)
                      closeRemoveModal()
                    }}
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
