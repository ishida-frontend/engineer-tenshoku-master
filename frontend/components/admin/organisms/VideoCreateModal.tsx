'use client'
import React, { useState } from 'react'
import useSWR, { mutate } from 'swr'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react'

import { SectionType, VideoType } from '../../../types'
import { useCustomToast } from '../../../hooks/useCustomToast'

export const VideoCreateModal = ({
  courseId,
  sectionId,
}: {
  courseId: string | string[]
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
    urlError: '',
  })

  const courseFetcher = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/course/${courseId}`,
    )
    const courseData = await response.json()

    courseData.sections.forEach((section: SectionType) => {
      section.videos = section.videos.filter(
        (video: VideoType) => !video.deleted_at,
      )
    })
    return courseData
  }

  const { data: courseData, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/course/${courseId}`,
    courseFetcher,
  )

  // 既存動画の１番大きい再生順番に＋１
  const openModal = (sectionId: number) => {
    setCurrentSectionId(sectionId)
    const currentSection = courseData?.sections.find(
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

  const isButtonDisabled = () => {
    return video.name === '' || video.description === '' || video.url === ''
  }

  const handleCreate = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/video`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: video.name,
            description: video.description,
            url: video.url,
            order: orderChanged ? video.order : maxOrder,
            published: video.published,
            sectionId: currentSectionId,
          }),
        },
      )

      const result = await response.json()
      const urlRegx =
        /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/

      if (response.status === 201) {
        mutate(`course${courseId}`)
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
          urlError: '',
        })
        onClose()
        showSuccessToast(result.message)
      } else if (response.status === 400) {
        if (video.name && video.name.length >= 5) {
          setErrors((prevErrors) => ({ ...prevErrors, nameError: '' }))
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            nameError: result.errors.name,
          }))
        }

        if (video.description && video.description.length >= 15) {
          setErrors((prevErrors) => ({ ...prevErrors, descError: '' }))
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            descError: result.errors.description,
          }))
        }

        if (video.url && !urlRegx.test(video.url)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            urlError: result.errors.url,
          }))
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            urlError: result.errors.url,
          }))
        }
      }
    } catch (error) {
      showErrorToast('動画の追加に失敗しました')
    }
  }

  return (
    <>
      <Button colorScheme="green" onClick={() => openModal(sectionId)}>
        追加
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
            <FormControl
              id="videoName"
              isRequired
              isInvalid={!!errors.nameError}
            >
              <FormLabel htmlFor="videoName">タイトル (5文字以上)</FormLabel>
              <FormErrorMessage>{errors.nameError}</FormErrorMessage>
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
            <FormControl
              id="videoDescription"
              isRequired
              isInvalid={!!errors.descError}
            >
              <FormLabel htmlFor="videoDescription">
                説明文 (15文字以上)
              </FormLabel>
              <FormErrorMessage>{errors.descError}</FormErrorMessage>
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
            <FormControl id="videoUrl" isRequired isInvalid={!!errors.urlError}>
              <FormLabel>URL</FormLabel>
              <FormErrorMessage>{errors.urlError}</FormErrorMessage>
              <Input
                type="text"
                value={video.url}
                onChange={(e) => setVideo({ ...video, url: e.target.value })}
                aria-required={true}
                border="1px"
                borderColor="gray.400"
              />
            </FormControl>
            <FormControl id="videoOrder">
              <FormLabel htmlFor="videoOrder">
                再生順 (追加時は変更不可)
              </FormLabel>
              <NumberInput
                defaultValue={maxOrder}
                min={1}
                max={30}
                clampValueOnBlur={false}
                onChange={(_, valueNumber) => {
                  setVideo({ ...video, order: valueNumber })
                }}
                isDisabled={true}
              >
                <NumberInputField border="1px" borderColor="gray.400" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
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
            <Button
              isDisabled={isButtonDisabled()}
              colorScheme="green"
              onClick={handleCreate}
            >
              追加
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
