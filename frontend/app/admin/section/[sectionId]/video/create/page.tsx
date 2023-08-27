'use client'
import React, { FormEvent, useState } from 'react'
import { useParams } from 'next/navigation'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Select,
  Textarea,
  Heading,
  Flex,
  Text,
} from '@chakra-ui/react'

import { useCustomToast } from '../../../../../../hooks/useCustomToast'

export default function CreateVideoPage() {
  const { showSuccessToast, showErrorToast } = useCustomToast()

  // TODO:あとでこのページのパスをだいさんと相談して決める
  // URLパラメータからセクションIDを取得し、int型に変換
  const params = useParams()
  const sectionId =
    typeof params.sectionId === 'string' ? parseInt(params.sectionId, 10) : NaN

  const [video, setVideo] = useState({
    name: '',
    description: '',
    url: '',
    order: 1,
    published: false,
  })
  const [errors, setErrors] = useState({
    nameError: '',
    descError: '',
    urlError: '',
  })
  const [charCount, setCharCount] = useState({
    nameCharCount: 0,
    descCharCount: 0,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCreated, setIsCreated] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    setIsSubmitting(true)

    event.preventDefault()
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
            url: video.url,
            order: video.order,
            published: video.published,
            sectionId,
          }),
        },
      )

      const validResults = await response.json()
      const urlRegx =
        /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/

      if (response.ok) {
        showSuccessToast(validResults.message)
        setErrors({
          nameError: '',
          descError: '',
          urlError: '',
        })
        setIsCreated(true)
      } else if (response.status === 400) {
        if (!video.name || video.name.length >= 5) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            nameError: validResults.errors.name,
          }))
        }

        if (!video.description || video.description.length >= 15) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            descError: validResults.errors.description,
          }))
        }

        if (!video.url || !urlRegx.test(video.url)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            urlError: validResults.errors.url,
          }))
        }
      }
    } catch (error) {
      showErrorToast('入力に誤りがあります。入力内容を確認してください')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box w="full" maxW="600px" mx="auto" p={6}>
      <Stack spacing={4}>
        <Link href={`/admin/section/${sectionId}`}>
          <Button colorScheme="green">戻る</Button>
        </Link>
        <Flex justify="center">
          <Heading size="md">動画登録</Heading>
        </Flex>

        <Text fontWeight="700">セクションID：{sectionId}</Text>

        <FormControl id="videoName" isInvalid={!!errors.nameError} isRequired>
          <FormLabel htmlFor="videoName">動画名（5文字以上）</FormLabel>
          <Input
            id="videoName"
            type="text"
            value={video.name}
            onChange={(e) => {
              setVideo({ ...video, name: e.target.value })
              setCharCount({
                ...charCount,
                nameCharCount: e.target.value.length,
              })
            }}
            aria-required={true}
            border="1px"
            borderColor="gray.400"
          />
          <Text fontSize="sm" mt={2}>
            {charCount.nameCharCount}/5
          </Text>
          <FormErrorMessage>{errors.nameError}</FormErrorMessage>
        </FormControl>
        <FormControl
          id="videoDescription"
          isInvalid={!!errors.descError}
          isRequired
        >
          <FormLabel htmlFor="videoDescription">
            動画概要（15文字以上）
          </FormLabel>
          <Textarea
            id="videoDescription"
            value={video.description}
            onChange={(e) => {
              setVideo({ ...video, description: e.target.value })
              setCharCount({
                ...charCount,
                descCharCount: e.target.value.length,
              })
            }}
            size="lg"
            rows={10}
            aria-required={true}
            border="1px"
            borderColor="gray.400"
          ></Textarea>
          <Text fontSize="sm" mt={2}>
            {charCount.descCharCount}/15
          </Text>
          <FormErrorMessage>{errors.descError}</FormErrorMessage>
        </FormControl>
        <FormControl id="videoUrl" isInvalid={!!errors.urlError} isRequired>
          <FormLabel htmlFor="videoUrl">動画URL</FormLabel>
          <Input
            id="videoUrl"
            type="text"
            value={video.url}
            onChange={(e) => setVideo({ ...video, url: e.target.value })}
            aria-required={true}
            border="1px"
            borderColor="gray.400"
          ></Input>
          <FormErrorMessage>{errors.urlError}</FormErrorMessage>
        </FormControl>
        <FormControl id="videoOrder" isRequired>
          <FormLabel htmlFor="videoUrl">動画の順番</FormLabel>
          <NumberInput
            value={video.order}
            onChange={(valueString) =>
              setVideo({ ...video, order: Number(valueString) })
            }
            min={1}
            max={100}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl id="videoPublished" isRequired>
          <FormLabel htmlFor="videoPublished">動画の公開設定</FormLabel>
          <Select
            id="videoPublished"
            value={video.published ? 'public' : 'hidden'}
            onChange={(e) =>
              setVideo({ ...video, published: e.target.value === 'public' })
            }
            border="1px"
            borderColor="gray.400"
          >
            <option value="hidden">非公開</option>
            <option value="public">公開</option>
          </Select>
        </FormControl>
        <Button
          isDisabled={
            video.name === '' ||
            video.description === '' ||
            video.url === '' ||
            isCreated
          }
          onClick={handleSubmit}
          isLoading={isSubmitting}
          colorScheme="green"
          variant="solid"
        >
          登録
        </Button>
      </Stack>
    </Box>
  )
}
