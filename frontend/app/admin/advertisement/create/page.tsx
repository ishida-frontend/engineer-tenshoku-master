'use client'

import {
  Box,
  FormControl,
  Heading,
  Stack,
  FormLabel,
  Input,
  useToast,
  Button,
  Flex,
} from '@chakra-ui/react'
import React, { useState, FormEvent } from 'react'
import { THEME_COLOR } from '../../../../constants'

export default function CreateAdvertisementPage() {
  const toast = useToast()
  const [name, setName] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [isShow, setIsShow] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [startFrom, setStartFrom] = useState<Date>(new Date())
  const [endAt, setEndAt] = useState<Date>(new Date())

  const isDisabled =
    name === '' || url === '' || author === '' || imageUrl === ''
  const handleSubmit = async (event: FormEvent) => {
    setIsShow(true)

    event.preventDefault()

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/advertisement`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          url,
          author,
          isShow,
          imageUrl,
          startFrom,
          endAt,
        }),
      },
    )

    const data = await response.json()

    if (response.ok) {
      toast({
        title: data.message,
        status: 'success',
        position: 'top',
        duration: 3000,
      })
    } else {
      toast({
        title: data.message,
        status: 'error',
        position: 'top',
        duration: 3000,
      })
    }
    setIsShow(false)
  }

  return (
    <>
      <Box w="full" maxW="600px" mx="auto" p={6}>
        <Stack spacing={4}>
          <Heading size="lg">広告登録</Heading>
          <FormControl isRequired>
            <FormLabel>広告名</FormLabel>
            <Input
              bg={THEME_COLOR.SECONDARY_WHITE}
              type="text"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target?.value)
              }
              aria-required={true}
              border="1px"
              borderColor="gray.400"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel> 画像 </FormLabel>
            <Input
              bg={THEME_COLOR.SECONDARY_WHITE}
              type="file"
              accept="image/*"
              value={imageUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setImageUrl(e.target?.value)
              }
            />
            <>
              <img src="" />
            </>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>企業名</FormLabel>
            <Input
              bg={THEME_COLOR.SECONDARY_WHITE}
              type="text"
              value={author}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAuthor(e.target?.value)
              }
              aria-required={true}
              border="1px"
              borderColor="gray.400"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>リンク</FormLabel>
            <Input
              bg={THEME_COLOR.SECONDARY_WHITE}
              type="text"
              value={url}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUrl(e.target?.value)
              }
              border="1px"
              borderColor="gray.400"
            ></Input>
          </FormControl>
          <Flex justify="center" align="center">
            <FormControl isRequired>
              <FormLabel> 開始 </FormLabel>
              <Input
                bg={THEME_COLOR.SECONDARY_WHITE}
                type="date"
                value={startFrom.toISOString().slice(0,10)}
                onChange={(e) => setStartFrom(new Date(Date.parse(e.target.value)))}
              >
              </Input>
            </FormControl>
            <FormControl isRequired>
              <FormLabel> 終了 </FormLabel>
              <Input
                bg={THEME_COLOR.SECONDARY_WHITE}
                type="date"
                value={endAt.toISOString().slice(0,10)}
                onChange={(e) => setEndAt(new Date(Date.parse(e.target.value)))}
              >
              </Input>
            </FormControl>
          </Flex>
          <Button
            isDisabled={isDisabled}
            onClick={handleSubmit}
            isLoading={isShow}
            colorScheme="teal"
            variant="solid"
          >
            登録
          </Button>
        </Stack>
      </Box>
    </>
  )
}
