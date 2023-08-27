'use client'
import React, { FormEvent, useState } from 'react'
import { useParams } from 'next/navigation'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
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

  // フロントエンドのパスを"./admin/section/[sectionId]/video/create"と仮定
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
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    setIsSubmitting(true)

    event.preventDefault()

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

    const validResult = await response.json()

    if (response.ok) {
      showSuccessToast(validResult.message)
    } else {
      showErrorToast(validResult.message)
    }

    setIsSubmitting(false)
  }

  return (
    <>
      <Box w="full" maxW="600px" mx="auto" p={6}>
        <Stack spacing={4}>
          <Flex justify="center">
            <Heading size="md">動画登録</Heading>
          </Flex>

          <Text fontWeight="700">セクションID：{sectionId}</Text>

          <FormControl id="videoName" isRequired>
            <FormLabel htmlFor="videoName">動画名（必須）</FormLabel>
            <Input
              id="videoName"
              type="text"
              value={video.name}
              onChange={(e) => setVideo({ ...video, name: e.target.value })}
              aria-required={true}
              border="1px"
              borderColor="gray.400"
            />
          </FormControl>
          <FormControl id="videoDescription" isRequired>
            <FormLabel htmlFor="videoDescription">動画概要（必須）</FormLabel>
            <Textarea
              id="videoDescription"
              value={video.description}
              onChange={(e) =>
                setVideo({ ...video, description: e.target.value })
              }
              size="lg"
              rows={10}
              aria-required={true}
              border="1px"
              borderColor="gray.400"
            ></Textarea>
          </FormControl>
          <FormControl id="videoUrl" isRequired>
            <FormLabel htmlFor="videoUrl">動画URL（必須）</FormLabel>
            <Input
              id="videoUrl"
              type="text"
              value={video.url}
              onChange={(e) => setVideo({ ...video, url: e.target.value })}
              aria-required={true}
              border="1px"
              borderColor="gray.400"
            ></Input>
          </FormControl>
          <FormControl id="videoOrder" isRequired>
            <FormLabel htmlFor="videoUrl">動画の順番（必須）</FormLabel>
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
              onChange={(e) => setVideo({ ...video, published: false })}
              border="1px"
              borderColor="gray.400"
            >
              <option value="hidden">非公開</option>
              <option value="public">公開</option>
            </Select>
          </FormControl>
          <Button
            isDisabled={
              video.name === '' || video.description === '' || video.url === ''
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
    </>
  )
}
