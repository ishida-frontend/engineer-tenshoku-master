import React, { useState, FormEvent, useEffect } from 'react'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Select,
  Text,
  Textarea,
  Link,
} from '@chakra-ui/react'

import { CourseRemover } from './CourseRemover'
import { CourseType } from '../../../types'
import formatDate from '../../../utils/formatDate'
import { Loader } from '../../../components/admin/atoms/Loader'
import { useCustomToast } from '../../../hooks/useCustomToast'

// コースの汎用型定義＋このコンポーネントでのみ使う型定義
type CourseEditorType = CourseType & {
  isLoading: boolean
  isSubmitting: boolean
  nameError: ''
  descError: ''
}

export function CourseEditor() {
  // カスタムフック準備
  const { showSuccessToast, showErrorToast } = useCustomToast()

  // URLパラメータからコースIDを取得し、int型に変換
  const params = useParams()
  const courseId = params.courseid
  const id = typeof courseId === 'string' ? parseInt(courseId, 10) : NaN

  // コースデータ取得
  const fetcher = async () =>
    (
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/course/${courseId}`,
      )
    ).json()
  const { data: courseData, error } = useSWR<CourseEditorType>(
    'courseData',
    fetcher,
  )

  // 初期状態を定義し、useStateで初期化
  const initialCourseState: CourseEditorType = {
    id,
    name: '',
    description: '',
    published: false,
    created_at: '',
    updated_at: '',
    deleted_at: '',
    isLoading: false,
    isSubmitting: false,
    nameError: '',
    descError: '',
  }
  const [course, setCourse] = useState<CourseEditorType>(initialCourseState)

  // ページを開いて１０秒でデータ取得ができなかった場合のエラートースト
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!courseData) {
        showErrorToast('データの取得に失敗しました。')
      }
    }, 10000)
    return () => clearTimeout(timeout)
  }, [courseData])

  // 取得したコースデータを適用
  useEffect(() => {
    if (courseData) {
      setCourse(courseData)
    }
  }, [courseData])

  // PUTリクエストイベントハンドラ
  const updateCourse = async (event: FormEvent) => {
    event.preventDefault()

    setCourse((prevCourse) => ({ ...prevCourse, isSubmitting: true }))

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/course/edit/${courseId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id,
            name: course.name,
            description: course.description,
            published: course.published,
          }),
        },
      )

      const validResults = await response.json()

      if (response.ok) {
        showSuccessToast(validResults.message)
        setCourse((prevCourse) => ({ ...prevCourse, nameError: '' }))
        setCourse((prevCourse) => ({ ...prevCourse, descError: '' }))
      } else if (response.status === 400) {
        if (course.name && course.name.length >= 5) {
          setCourse((prevCourse) => ({ ...prevCourse, nameError: '' }))
        } else {
          setCourse((prevCourse) => ({
            ...prevCourse,
            nameError: validResults.errors.name,
          }))
        }

        if (course.description && course.description.length >= 15) {
          setCourse((prevCourse) => ({ ...prevCourse, descError: '' }))
        } else {
          setCourse((prevCourse) => ({
            ...prevCourse,
            descError: validResults.errors.description,
          }))
        }
      }
    } catch (error) {
      showErrorToast('データの更新に失敗しました。')
    } finally {
      setCourse((prevCourse) => ({ ...prevCourse, isSubmitting: false }))
    }
  }

  // コースデータ読み込みアニメーション
  if (!courseData) return <Loader />

  return (
    <>
      <Box w="full" maxW="600px" mx="auto" p={6}>
        <Stack spacing={4}>
          <Link href="/admin/course">
            <Button colorScheme="teal">一覧へ戻る</Button>
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
          <FormControl
            id="courseName"
            isRequired
            isInvalid={!!course.nameError}
          >
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
            <FormErrorMessage>{course.nameError}</FormErrorMessage>
          </FormControl>
          <FormControl
            id="courseDescription"
            isRequired
            isInvalid={!!course.descError}
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
            <FormErrorMessage>{course.descError}</FormErrorMessage>
          </FormControl>
          <FormControl id="coursePublished" isRequired>
            <FormLabel htmlFor="CoursePublished">コースの公開設定</FormLabel>
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
          <Button
            onClick={updateCourse}
            isLoading={course.isSubmitting}
            colorScheme="teal"
            variant="solid"
          >
            変更を保存
          </Button>
          <CourseRemover />
        </Stack>
      </Box>
    </>
  )
}
