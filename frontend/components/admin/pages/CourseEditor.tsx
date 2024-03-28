'use client'
import React, { useState, FormEvent, useEffect } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Select,
  Textarea,
  Link,
  CheckboxGroup,
  HStack,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

import { CourseRemover } from '../organisms/CourseRemover'
import { CourseType, TagType } from '../../../types'
import formatDate from '../../../utils/formatDate'
import { Loader } from '../atoms/Loader'
import { useCustomToast } from '../../../hooks/useCustomToast'
import { THEME_COLOR } from '../../../constants/colors'
type CourseWithTagsType = CourseType & {
  tags: {
    tag_id: string
  }[]
}
export function CourseEditor({
  courseId,
  courseData,
  tags,
}: {
  courseId: string
  courseData: CourseWithTagsType
  tags: TagType[]
}) {
  const { showSuccessToast, showErrorToast } = useCustomToast()

  const selectedCourseState: CourseWithTagsType = {
    id: courseData.id,
    name: courseData.name,
    description: courseData.description,
    image: courseData.image,
    icon: courseData.icon,
    published: courseData.published,
    created_at: courseData.created_at,
    updated_at: courseData.updated_at,
    deleted_at: courseData.deleted_at,
    tags: courseData.tags,
    requiredTime: courseData.requiredTime,
  }
  const [course, setCourse] = useState<CourseType>(selectedCourseState)
  const [tagIds, setTagIds] = useState<string[]>(
    courseData.tags.map((tag) => tag.tag_id),
  )

  const [errors, setErrors] = useState({
    nameError: '',
    descError: '',
  })

  const [isSubmitting, SetIsSubmitting] = useState(false)
  const initialRequiredTime = '15'
  const [requiredTime, setRequiredTime] = useState(
    selectedCourseState.requiredTime || initialRequiredTime,
  )

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!courseData) {
        showErrorToast('データの取得に失敗しました。')
      }
    }, 10000)
    return () => clearTimeout(timeout)
  }, [courseData, showErrorToast, clearTimeout])

  useEffect(() => {
    if (courseData) {
      setCourse(courseData)
    }
  }, [courseData])

  const hasChanges = () => {
    return JSON.stringify(selectedCourseState) !== JSON.stringify(course)
  }

  const handleTagIds = (tagId: string) => () => {
    // idが選択されていたら
    if (tagIds.includes(tagId)) {
      // idを取り除く
      setTagIds(tagIds.filter((id) => id !== tagId))
    } else {
      // idを追加する
      setTagIds([...tagIds, tagId])
    }
  }

  const isButtonDisabled = () => {
    return !hasChanges()
  }

  const updateCourse = async (event: FormEvent) => {
    event.preventDefault()

    SetIsSubmitting(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/course/edit/${courseId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: course.id,
            name: course.name,
            description: course.description,
            image: course.image,
            published: course.published,
            requiredTime: requiredTime,
            tagIds,
          }),
        },
      )

      const validResults = await response.json()

      if (response.ok) {
        showSuccessToast(validResults.message)
        setErrors({
          nameError: '',
          descError: '',
        })
      } else if (response.status === 400) {
        if (course.name && course.name.length >= 5) {
          setErrors((prevErrors) => ({ ...prevErrors, nameError: '' }))
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            nameError: validResults.errors.name,
          }))
        }

        if (course.description && course.description.length >= 15) {
          setErrors((prevErrors) => ({ ...prevErrors, descError: '' }))
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            descError: validResults.errors.description,
          }))
        }
      }
    } catch (error) {
      showErrorToast('データの更新に失敗しました。')
    } finally {
      SetIsSubmitting(false)
    }
  }

  if (!courseData) return <Loader />

  return (
    <Box w="full" maxW="600px" mx="auto" p={6}>
      <Stack spacing={4}>
        <Link href="/admin/course">
          <Button colorScheme="green">一覧へ戻る</Button>
        </Link>
        <Box p={4} border="1px" borderColor="gray.400" borderRadius={9}>
          <Text>コースID：{course.id}</Text>
          <Text>
            作成日時：
            {courseData.created_at && formatDate(courseData.created_at)}
          </Text>
          <Text>
            更新日時：
            {courseData.updated_at && formatDate(courseData.updated_at)}
          </Text>
        </Box>
        <FormControl id="courseName" isRequired isInvalid={!!errors.nameError}>
          <FormLabel htmlFor="courseName">コース名（5文字以上）</FormLabel>
          <Input
            id="courseName"
            type="text"
            value={course.name}
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            aria-required={true}
            border="1px"
            borderColor="gray.400"
          />
          <FormErrorMessage>{errors.nameError}</FormErrorMessage>
        </FormControl>
        <FormControl
          id="courseDescription"
          isRequired
          isInvalid={!!errors.descError}
        >
          <FormLabel htmlFor="courseDescription">
            コース概要（15文字以上）
          </FormLabel>
          <Textarea
            id="courseDescription"
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            size="lg"
            rows={10}
            aria-required={true}
            border="1px"
            borderColor="gray.400"
          ></Textarea>
          <FormErrorMessage>{errors.descError}</FormErrorMessage>
        </FormControl>
        <FormControl id="courseImage">
          <FormLabel htmlFor="courseImage">コース画像URL</FormLabel>
          <Input
            id="courseImage"
            type="text"
            value={course.image}
            onChange={(e) => setCourse({ ...course, image: e.target.value })}
            aria-required={true}
            border="1px"
            borderColor="gray.400"
          />
          <FormErrorMessage>{errors.nameError}</FormErrorMessage>
        </FormControl>
        <FormControl id="courseRequiredTime">
          <FormLabel htmlFor="courseRequiredTime">
            コース修了の目安時間
          </FormLabel>
          <HStack>
            <NumberInput
              id="courseRequiredTime"
              value={requiredTime}
              onChange={(timeValue) => setRequiredTime(timeValue)}
              min={0}
              max={1000}
              keepWithinRange={false}
              clampValueOnBlur={false}
              w={'100%'}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text>(h)</Text>
          </HStack>
          <FormErrorMessage>{errors.nameError}</FormErrorMessage>
        </FormControl>
        <FormControl id="coursePublished">
          <FormLabel htmlFor="CoursePublished">コース公開設定</FormLabel>
          <Select
            id="coursePublished"
            value={course.published ? 'public' : 'hidden'}
            onChange={(e) =>
              setCourse({ ...course, published: e.target.value === 'public' })
            }
            border="1px"
            borderColor="gray.400"
          >
            <option value="hidden">非公開</option>
            <option value="public">公開</option>
          </Select>
        </FormControl>
        <CheckboxGroup colorScheme={THEME_COLOR.PRIMARY_FONT_COLOR}>
          <Stack spacing={[5]} direction={['row']} flexWrap={'wrap'}>
            {tags.map((tag) => (
              <HStack as="label" htmlFor={tag.id} cursor={'pointer'}>
                <input
                  id={tag.id}
                  type="checkbox"
                  checked={tagIds.includes(tag.id)}
                  onChange={handleTagIds(tag.id)}
                />
                <Text>{tag.name}</Text>
              </HStack>
            ))}
          </Stack>
        </CheckboxGroup>
        <Button
          onClick={updateCourse}
          isLoading={isSubmitting}
          isDisabled={isButtonDisabled()}
          colorScheme="green"
          variant="solid"
        >
          変更を保存
        </Button>
        <CourseRemover />
        <Link href={`/admin/section/manage/${course.id}`}>
          <Button width="full">セクション編集</Button>
        </Link>
      </Stack>
    </Box>
  )
}
