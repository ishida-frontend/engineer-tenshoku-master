'use client'
import React, { useState } from 'react'
import { mutate } from 'swr'
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
} from '@chakra-ui/react'

import { urlRegExp } from '../../../utils/regExp'
import { SectionType, VideoType } from '../../../types'
import { useCustomToast } from '../../../hooks/useCustomToast'

export const VideoCreateModal = ({
  courseId,
  currentSectionId,
  maxOrder,
  isOpen,
  onClose,
}: {
  courseId: string
  sectionId: number
  currentSectionId: number | null
  maxOrder: number
  isOpen: boolean
  onClose: () => void
}) => {
  const { showSuccessToast, showErrorToast } = useCustomToast()

  const [orderChanged] = useState(false)

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

  const fetchCourseData = async () => {
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

        if (video.url && !urlRegExp.test(video.url)) {
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      blockScrollOnMount={false}
    >
      <ModalOverlay bg="rgba(0, 0, 0, 0.1)" />
      <ModalContent>
        <ModalHeader>動画詳細入力</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="videoName" isRequired isInvalid={!!errors.nameError}>
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
  )
}
