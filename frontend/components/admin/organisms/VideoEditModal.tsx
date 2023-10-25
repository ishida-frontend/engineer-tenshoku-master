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
  Select,
  Button,
  useDisclosure,
  Box,
  Container,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { mutate } from 'swr'
import { SectionType, VideoType } from '../../../types'
import { urlRegExp } from '../../../utils/regExp'
import { useCustomToast } from '../../../hooks/useCustomToast'
import ReactMde from 'react-mde'
import 'react-mde/lib/styles/css/react-mde-all.css'
import ReactMarkdown from 'react-markdown'
import * as Showdown from 'showdown'
import '../../../styles/markdown.css'

export function VideoEditModal({
  courseId,
  videoId,
  section,
  isOpen,
  onClose,
}: {
  courseId: string
  videoId: string | null
  section: SectionType | null
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
    requiredTime: 0,
  })

  const [errors, setErrors] = useState({
    nameError: '',
    descError: '',
    urlError: '',
    timeError: '',
  })

  const [initialVideoData, setInitialVideoData] = useState<Partial<VideoType>>(
    {},
  )

  const [descValue, setDescValue] = useState<string>()

  const [selectedEditorTab, setSelectedEditorTab] = useState<
    'write' | 'preview'
  >('write')

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
      setDescValue(videoData.description)
      onOpen()
    } catch (error) {
      showErrorToast('動画データの取得に失敗しました')
    }
  }

  useEffect(() => {
    if (isOpen && videoId !== null) {
      fetchVideoData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, videoId])

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  })

  const allOrders = section?.videos.map((v: VideoType) => v.order)

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

  const descChange = (value: string) => {
    setDescValue(value)
    setVideo({ ...video, description: value })
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

      if (response.status === 200) {
        mutate(`course${courseId}`)
        setErrors({
          nameError: '',
          descError: '',
          urlError: '',
          timeError: '',
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

        if (video.requiredTime && video.requiredTime >= 0) {
          setErrors((prevErrors) => ({ ...prevErrors, timeError: '' }))
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            timeError: result.errors.requiredTime,
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
      <ModalOverlay bg="rgba(0, 0, 0, 0.1)" />
      <ModalContent minW={'90%'} h={'70%'}>
        <ModalHeader alignContent={'center'}>動画詳細入力</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container minW={'90%'}>
            <Flex>
              <Box flex={'1'} mr={'18px'}>
                <FormControl
                  id="videoDescription"
                  isRequired
                  isInvalid={!!errors.descError}
                >
                  <FormLabel htmlFor="videoDescription">
                    説明文(15文字以上)
                  </FormLabel>
                  <FormErrorMessage>{errors.descError}</FormErrorMessage>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Box w={'50%'} mr={'5'} h={'350px'}>
                      <ReactMde
                        heightUnits="vh"
                        minEditorHeight={40}
                        value={descValue}
                        onChange={descChange}
                        selectedTab={selectedEditorTab}
                        onTabChange={setSelectedEditorTab}
                        generateMarkdownPreview={(markdown) =>
                          Promise.resolve(converter.makeHtml(markdown))
                        }
                      />
                    </Box>
                    <Box
                      w={'50%'}
                      h={'48vh'}
                      overflow={'scroll'}
                      bg={'white'}
                      border={'1px solid gray'}
                      borderRadius={'4px'}
                      paddingLeft={'28px'}
                      paddingRight={'20px'}
                      className="markdown"
                    >
                      <ReactMarkdown>{descValue}</ReactMarkdown>
                    </Box>
                  </Box>
                </FormControl>
              </Box>
              <Box w={'300px'}>
                <FormControl
                  id="videoName"
                  isRequired
                  isInvalid={!!errors.nameError}
                >
                  <FormLabel htmlFor="videoName">
                    タイトル (5文字以上)
                  </FormLabel>
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
                  id="videoUrl"
                  isRequired
                  isInvalid={!!errors.urlError}
                >
                  <FormLabel htmlFor="videoUrl">URL</FormLabel>
                  <FormErrorMessage>{errors.urlError}</FormErrorMessage>
                  <Input
                    type="text"
                    value={video.url}
                    onChange={(e) =>
                      setVideo({ ...video, url: e.target.value })
                    }
                    aria-required={true}
                    border="1px"
                    borderColor="gray.400"
                  />
                </FormControl>
                <FormControl id="videoOrder">
                  <FormLabel htmlFor="videoOrder">再生順</FormLabel>
                  <Select
                    value={video.order}
                    onChange={(e) =>
                      setVideo({ ...video, order: Number(e.target.value) })
                    }
                  >
                    {allOrders?.map((order) => (
                      <option key={order} value={order}>
                        {order}
                      </option>
                    ))}
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
                <FormControl
                  id="videoTime"
                  isRequired
                  isInvalid={!!errors.timeError}
                >
                  <FormLabel htmlFor="videoTime">学習目安時間</FormLabel>
                  <FormErrorMessage>{errors.timeError}</FormErrorMessage>
                  <NumberInput
                    defaultValue={5}
                    min={0}
                    max={60}
                    value={video.requiredTime}
                    onChange={(e) =>
                      setVideo({ ...video, requiredTime: video.requiredTime })
                    }
                    aria-required={true}
                    border="1px"
                    borderColor="gray.400"
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  {/* <Input
                    type="text"
                    value={video.requiredTime}
                    onChange={(e) =>
                      setVideo({ ...video, requiredTime: e.target.value })
                    }
                    aria-required={true}
                    border="1px"
                    borderColor="gray.400"
                  /> */}
                </FormControl>
              </Box>
            </Flex>
          </Container>
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
