import React, { useState, FormEvent, useEffect } from 'react'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import { format } from 'date-fns'
import {
  Button,
  FormLabel,
  Input,
  useToast,
  Textarea,
  Box,
  FormControl,
  Stack,
  Select,
  Text,
} from '@chakra-ui/react'

type CourseType = {
  id: number
  name: string
  description: string
  published: boolean
  created_at: string
  updated_at: string
}

export function CourseEditor() {
  const params = useParams()
  const courseid = params.courseid
  const fetcher = async () =>
    (await fetch(`http://localhost:8000/admin/course/${courseid}`)).json()
  const { data: course, error } = useSWR<CourseType>('course', fetcher)
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [published, setPublished] = useState(false)
  const [updated, setUpdated] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, 'yyy-MM-dd HH:mm')
  }

  useEffect(() => {
    if (course) {
      setName(course.name)
      setDescription(course.description)
      setPublished(course.published)
      setUpdated(course.updated_at)
    }
  }, [course])

  if (!course) return <div>Loading...</div>

  const updateCourse = async (event: FormEvent) => {
    setIsSubmitting(true)

    event.preventDefault()

    try {
      const id = typeof courseid === 'string' ? parseInt(courseid, 10) : NaN

      const response = await fetch(
        `http://localhost:8000/admin/course/edit/${courseid}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id,
            name,
            description,
            published,
          }),
        },
      )

      if (!response.ok) {
        const errorData = await response.json()
        const serverErrorMessage = errorData.message || 'Unknown server error'
        throw new Error(`変更に失敗しました: ${serverErrorMessage}`)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Box w="full" maxW="600px" mx="auto" p={6}>
        <Stack spacing={4}>
          <Text>コースID：{course.id}</Text>
          <Text>作成日時：{formatDate(course.created_at)}</Text>
          <Text>更新日時：{formatDate(course.updated_at)}</Text>
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
          <FormControl id="coursePublished" isRequired>
            <FormLabel htmlFor="CoursePublished">コースの公開設定</FormLabel>
            <Select
              id="coursePublished"
              value={published ? 'public' : 'hidden'}
              onChange={(e) => setPublished(e.target.value === 'public')}
              border="1px"
              borderColor="gray.400"
            >
              <option value="hidden">非公開</option>
              <option value="public">公開</option>
            </Select>
          </FormControl>

          <Button
            isDisabled={name === '' || description === ''}
            onClick={updateCourse}
            isLoading={isSubmitting}
            colorScheme="teal"
            variant="solid"
          >
            変更を保存
          </Button>
        </Stack>
      </Box>
    </>
  )
}
