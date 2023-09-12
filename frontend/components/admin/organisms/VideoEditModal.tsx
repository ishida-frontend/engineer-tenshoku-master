'use client'
import React, { useState, useEffect } from 'react'
import {
  FormErrorMessage,
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
  Select,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { mutate } from 'swr'
import { SectionType, VideoType } from '../../../types'
import { urlRegExp } from '../../../utils/regExp'
import { useCustomToast } from '../../../hooks/useCustomToast'

export function VideoEditModal({
  courseId,
  videoId,
  section,
  sectionId,
  isOpen,
  onClose,
}: {
  courseId: string
  videoId: number | null
  section: SectionType
  sectionId: number
  isOpen: boolean
  onClose: () => void
}) {
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { onOpen } = useDisclosure()

  const [video, setVideo] = useState<Partial<VideoType>>({
    name: '',
    description: '',
    order: 1,
    url: '',
    published: false,
  })

  const [errors, setErrors] = useState({
    nameError: '',
    descError: '',
    urlError: '',
  })

  const [initialVideoData, setInitialVideoData] = useState<Partial<VideoType>>(
    {},
  )

  useEffect(() => {
    if (isOpen && videoId !== null) {
      fetchVideoData()
    }
  }, [isOpen, videoId])

  // const [allOrders, setAllOrders] = useState<number[]>([])
  // useEffect(() => {
  //   if (section && sectionId !== null && section.id === sectionId) {
  //     const videoOrders = section.videos.map((video) => video.order)
  //     setAllOrders(videoOrders)
  //   }
  // }, [section, sectionId])

  const allOrders = section.videos.map((v: VideoType) => v.order)
  console.log('allOrders:', allOrders)

  const fetchVideoData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/video/${videoId}`,
      )
      const videoData = await response.json()
      setVideo({
        name: videoData.name,
        description: videoData.description,
        url: videoData.url,
        order: videoData.order,
        published: videoData.published,
        sectionId: videoData.sectionId,
      })
      setInitialVideoData({
        name: videoData.name,
        description: videoData.description,
        url: videoData.url,
        order: videoData.order,
        published: videoData.published,
        sectionId: videoData.sectionId,
      })
      onOpen()
    } catch (error) {
      showErrorToast('動画データの取得に失敗しました')
    }
  }

  const hasChanges = () => {
    return JSON.stringify(initialVideoData) !== JSON.stringify(video)
  }

  const isButtonDisabled = () => {
    return (
      !hasChanges() ||
      video.name === '' ||
      video.description === '' ||
      video.url === ''
    )
  }

  const handleEdit = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/video/${videoId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: videoId,
            name: video.name,
            description: video.description,
            url: video.url,
            order: video.order,
            published: video.published,
            sectionId: video.sectionId,
          }),
        },
      )

      const result = await response.json()

      if (response.status === 201) {
        mutate(`course${courseId}`)
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
      showErrorToast('動画の更新に失敗しました')
    }
  }

  return (
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
          <FormControl id="videoName" isRequired isInvalid={!!errors.nameError}>
            <FormLabel htmlFor="videoName">タイトル (5文字以上)</FormLabel>
            <FormErrorMessage>{errors.nameError}</FormErrorMessage>
            <Input
              type="text"
              value={video.name}
              onChange={(e) => {
                setVideo({ ...video, name: e.target.value })
              }}
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
            <FormLabel htmlFor="videoDescription">説明文(15文字以上)</FormLabel>
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
            <FormLabel htmlFor="videoUrl">URL</FormLabel>
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
            <FormLabel htmlFor="videoOrder">再生順</FormLabel>
            {/* <Select
              value={video.order}
              onChange={(e) =>
                setVideo({ ...video, order: Number(e.target.value) })
              }
            >
              {allOrders.map((order) => (
                <option key={order} value={order}>
                  {console.log('mapped order:', order)}
                  {order}
                </option>
              ))}
            </Select> */}
            <Select>
              <option value="1">1</option>
              <option value="2">2</option>
            </Select>
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
            onClick={handleEdit}
          >
            更新
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
