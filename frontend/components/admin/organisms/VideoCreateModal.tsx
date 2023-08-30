'use client'
import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import useSWR, { mutate } from 'swr'

import { SectionType } from '../../../types'
import { VideoType } from '../../../types'
import { useCustomToast } from '../../../hooks/useCustomToast'

export const VideoCreateModal = ({
  courseId,
  sectionId,
}: {
  courseId: number
  sectionId: number
}) => {
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [maxOrder, setMaxOrder] = useState<number>(1)
  const [orderChanged, setOrderChanged] = useState(false)
  const [currentSectionId, setCurrentSectionId] = useState<number | null>(null)

  const [video, setVideo] = useState<Partial<VideoType>>({
    name: '',
    description: '',
    order: maxOrder,
    url: '',
    published: false,
  })

  const [errors, setErrors] = useState({
    nameError: '',
    descError: '',
    orderError: '',
    urlError: '',
  })

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

  const openModal = (sectionId: number) => {
    setCurrentSectionId(sectionId)
    const currentSection = course?.sections.find(
      (s: SectionType) => s.id === sectionId,
    )
    if (currentSection) {
      const maxOrderInSection = Math.max(
        ...currentSection.videos.map((v: VideoType) => v.order),
        0,
      )
      setMaxOrder(maxOrderInSection + 1)
    }
    onOpen()
  }

  const handleCreate = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/video/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: video.name,
            description: video.description,
            order: orderChanged ? video.order : maxOrder,
            url: video.url,
            sectionId: currentSectionId,
          }),
        },
      )

      const result = await response.json()

      if (response.status === 201) {
        setVideo({
          name: '',
          description: '',
          order: 1,
          url: '',
          published: false,
        })
        setErrors({
          nameError: '',
          descError: '',
          orderError: '',
          urlError: '',
        })
        onClose()
        showSuccessToast(result.message)
        mutate(`course${courseId}`)
      } else if (response.status === 400) {
        showErrorToast(result.message)
      }
    } catch (error) {
      showErrorToast('An error occurred while creating the video.')
    }
  }

  return (
    <>
      <Button colorScheme="green" onClick={() => openModal(sectionId)}>
        動画を追加
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>動画詳細入力</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="videoName">
              <FormLabel htmlFor="videoName">タイトル</FormLabel>
              <Input
                type="text"
                value={video.name}
                onChange={(e) => setVideo({ ...video, name: e.target.value })}
                aria-required={true}
                border="1px"
                borderColor="gray.400"
                autoFocus={true}
              />
            </FormControl>
            <FormControl id="videoDescription">
              <FormLabel htmlFor="videoDescription">説明文</FormLabel>
              <Textarea
                value={video.description}
                onChange={(e) =>
                  setVideo({ ...video, description: e.target.value })
                }
                aria-required={true}
                rows={5}
                border="1px"
                borderColor="gray.400"
              />
            </FormControl>
            <FormControl>
              セクション内での順番
              <NumberInput
                defaultValue={maxOrder}
                min={1}
                max={30}
                clampValueOnBlur={false}
                onChange={(_, valueNumber) => {
                  setVideo({ ...video, order: valueNumber })
                }}
              >
                <NumberInputField border="1px" borderColor="gray.400" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>URL</FormLabel>
              <Input
                type="text"
                value={video.url}
                onChange={(e) => setVideo({ ...video, url: e.target.value })}
                aria-required={true}
                border="1px"
                borderColor="gray.400"
              />
            </FormControl>
            <FormControl id="coursePublished">
              <FormLabel htmlFor="CoursePublished">公開設定</FormLabel>
              <Select
                id="coursePublished"
                value={video.published ? 'public' : 'hidden'}
                onChange={(e) =>
                  setVideo({
                    ...video,
                    published: e.target.value === 'public',
                  })
                }
                border="1px"
                borderColor="gray.400"
              >
                <option value="hidden">非公開</option>
                <option value="public">公開</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              閉じる
            </Button>
            <Button colorScheme="green" onClick={handleCreate}>
              追加
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
