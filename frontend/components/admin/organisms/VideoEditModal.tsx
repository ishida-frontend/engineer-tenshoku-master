'use client'
import React, { useEffect, useState } from 'react'
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

export const VideoEditModal = ({ videoId }: { videoId: number }) => {
  console.log('videoId:', videoId)

  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [orderChanged, setOrderChanged] = useState(false)

  const [video, setVideo] = useState<Partial<VideoType>>({
    name: '',
    description: '',
    order: 0,
    url: '',
    published: false,
  })

  const [errors, setErrors] = useState({
    nameError: '',
    descError: '',
    orderError: '',
    urlError: '',
  })

  const fetchDataAndOpenModal = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/video/${videoId}`,
      )
      const fetchedVideoData = await response.json()
      setVideo({
        name: fetchedVideoData.name,
        description: fetchedVideoData.description,
        order: fetchedVideoData.order,
        url: fetchedVideoData.url,
        published: fetchedVideoData.published,
      })
      onOpen()
    } catch (error) {
      console.error('Error fetching video data:', error)
    }
  }

  const handleEdit = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/video/edit/${video.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: video.id,
            name: video.name,
            description: video.description,
            order: video.order,
            url: video.url,
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
        mutate(`video${videoId}`)
      } else if (response.status === 400) {
        showErrorToast(result.message)
      }
    } catch (error) {
      showErrorToast('An error occurred while creating the video.')
    }
  }

  return (
    <>
      <Button colorScheme="green" onClick={fetchDataAndOpenModal}>
        編集
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
            <Button colorScheme="green" onClick={handleEdit}>
              更新
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
