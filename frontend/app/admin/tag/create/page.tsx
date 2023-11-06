'use client'
import React, { useState, FormEvent } from 'react'
import {
  Button,
  FormLabel,
  Input,
  useToast,
  Box,
  FormControl,
  Stack,
  Select,
  Heading,
} from '@chakra-ui/react'

export default function CreateTagPage() {
  const toast = useToast()
  const [name, setName] = useState<string>('')
  const [color, setColor] = useState<string>('')
  const [backgroundColor, setBackgroundColor] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const isDisabled = name === '' || color === '' || backgroundColor === ''
  const handleSubmit = async (event: FormEvent) => {
    setIsSubmitting(true)

    event.preventDefault()

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tag`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        color,
        backgroundColor,
      }),
    })

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

    setIsSubmitting(false)
  }

  return (
    <>
      <Box w="full" maxW="600px" mx="auto" p={6}>
        <Stack spacing={4}>
          <Heading size="lg">タグ作成</Heading>
          <FormControl id="courseName" isRequired>
            <FormLabel htmlFor="courseName">タグ名（必須）</FormLabel>
            <Input
              id="courseName"
              type="text"
              value={name}
              onChange={(e: Event) => setName(e.target?.value)}
              aria-required={true}
              border="1px"
              borderColor="gray.400"
            />
          </FormControl>

          <FormControl id="courseName" isRequired>
            <FormLabel htmlFor="courseName">背景色（必須）</FormLabel>
            <Input
              id="backgroundColor"
              type="color"
              value={name}
              onChange={(e) => setBackgroundColor(e.target.value)}
              aria-required={true}
              border="1px"
              borderColor="gray.400"
            />
          </FormControl>

          <FormControl id="coursePublished" isRequired>
            <FormLabel htmlFor="CoursePublished">文字色</FormLabel>
            <Select
              id="coursePublished"
              value={color ? '#000000' : '#fff'}
              onChange={() => setColor('#000000')}
              border="1px"
              borderColor="gray.400"
            >
              <option value="#000000">黒</option>
              <option value="#fff">白</option>
            </Select>
          </FormControl>
          <Button
            isDisabled={isDisabled}
            onClick={handleSubmit}
            isLoading={isSubmitting}
            colorScheme="teal"
            variant="solid"
          >
            タグ作成
          </Button>
        </Stack>
      </Box>
    </>
  )
}
