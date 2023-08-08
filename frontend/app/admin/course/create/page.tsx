'use client'
import React, { useState, FormEvent } from 'react'
import {
  Button,
  FormLabel,
  Input,
  useToast,
  Textarea,
  Box,
  FormControl,
  Stack,
} from '@chakra-ui/react'

export default function CreateCoursePage() {
  const toast = useToast()
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    setIsSubmitting(true)

    event.preventDefault()

    const response = await fetch('http://localhost:8000/admin/course/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        description: description,
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
          <FormControl id="courseName" isRequired>
            <FormLabel htmlFor="courseName">コース名（必須）</FormLabel>
            <Input
              id="courseName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-required={true}
              border="1px"
              borderColor="gray.400"
            />
          </FormControl>
          <FormControl id="courseDescription" isRequired>
            <FormLabel htmlFor="courseDescription">
              コース概要（必須）
            </FormLabel>

            <Textarea
              id="courseDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              size="lg"
              rows={10}
              aria-required={true}
              border="1px"
              borderColor="gray.400"
            ></Textarea>
          </FormControl>
          <Button
            isDisabled={name === '' || description === ''}
            onClick={handleSubmit}
            isLoading={isSubmitting}
            colorScheme="teal"
            variant="solid"
          >
            コース作成
          </Button>
        </Stack>
      </Box>
    </>
  )
}
