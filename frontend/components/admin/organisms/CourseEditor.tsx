import React, { useState, FormEvent, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import useSWR from 'swr'
import { format } from 'date-fns'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select,
  Text,
  Textarea,
  Link,
} from '@chakra-ui/react'

import Loader from '../../../components/admin/atoms/Loader'
import { useCustomToast } from '../../../hooks/useCustomToast'

type CourseEditorType = {
  id: number
  name: string
  description: string
  published: boolean
  created_at: string
  updated_at: string
  isLoading: boolean
  isSubmitting: boolean
}

export function CourseEditor() {
  // カスタムフック準備
  const { showSuccessToast, showErrorToast } = useCustomToast()

  // URLパラメータからコースIDを取得し、int型に変換
  const router = useRouter()
  const params = useParams()
  const courseid = params.courseid
  const id = typeof courseid === 'string' ? parseInt(courseid, 10) : NaN

  // コースデータ取得
  const fetcher = async () =>
    (await fetch(`http://localhost:8000/admin/course/${courseid}`)).json()
  const { data: course, error } = useSWR<CourseEditorType>('course', fetcher)

  // 初期状態を定義し、useStateで初期化
  const initialState: CourseEditorType = {
    id: id,
    name: '',
    description: '',
    published: false,
    created_at: '',
    updated_at: '',
    isLoading: false,
    isSubmitting: false,
  }
  const [state, setState] = useState<CourseEditorType>(initialState)

  // 日時フォーマット関数
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, 'yyy-MM-dd HH:mm')
  }

  // ページを開いて１０秒でデータ取得ができなかった場合のエラートースト
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!course) {
        showErrorToast('データの取得に失敗しました')
      }
    }, 10000)
    return () => clearTimeout(timeout)
  }, [course])

  // 取得したコースデータを適用
  useEffect(() => {
    if (course) {
      setState(course)
    }
  }, [course])

  // PUTリクエストイベントハンドラ
  const updateCourse = async (event: FormEvent) => {
    setState({ ...state, isSubmitting: true })

    event.preventDefault()

    try {
      const response = await fetch(
        `http://localhost:8000/admin/course/edit/${courseid}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id,
            name: state.name,
            description: state.description,
            published: state.published,
          }),
        },
      )

      const data = await response.json()

      if (response.ok) {
        showSuccessToast(data.message)
      } else {
        showErrorToast(data.message)
      }
    } catch (error) {
      showErrorToast('データの取得に失敗しました')
    } finally {
      setState({ ...state, isSubmitting: false })
    }
  }

  // コースデータ読み込みメッセージ
  if (!course) return <Loader />

  return (
    <>
      <Box w="full" maxW="600px" mx="auto" p={6}>
        <Stack spacing={4}>
          <Link href="/admin/course">
            <Button colorScheme="teal">一覧へ戻る</Button>
          </Link>
          <Box p={4} border="1px" borderColor="gray.400" borderRadius={9}>
            <Text>コースID：{course.id}</Text>
            <Text>作成日時：{formatDate(course.created_at)}</Text>
            <Text>更新日時：{formatDate(course.updated_at)}</Text>
          </Box>
          <FormControl id="courseName" isRequired>
            <FormLabel htmlFor="courseName">コース名（必須）</FormLabel>
            <Input
              id="courseName"
              type="text"
              value={state.name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
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
              value={state.description}
              onChange={(e) =>
                setState({ ...state, description: e.target.value })
              }
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
              value={state.published ? 'public' : 'hidden'}
              onChange={(e) =>
                setState({ ...state, published: e.target.value === 'public' })
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
            isLoading={state.isSubmitting}
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
