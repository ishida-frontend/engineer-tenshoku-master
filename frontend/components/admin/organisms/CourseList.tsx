'use client'
import {
  Box,
  Button,
  Heading,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import useSWR from 'swr'

import formatDate from '../../../utils/formatDate'
import { Loader } from '../../../components/admin/atoms/Loader'
import { useCustomToast } from '../../../hooks/useCustomToast'

type CourseType = {
  id: number
  name: string
  description: string
  published: boolean
  created_at: string
  updated_at: string
  deleted_at?: string
}

export function CourseList() {
  const { showErrorToast } = useCustomToast()

  const fetcher = async () =>
    (await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/course`)).json()

  const { data: courses, error } = useSWR('courseList', fetcher)

  if (error) {
    showErrorToast('コースの取得に失敗しました。')
  }

  if (!courses) return <Loader />

  return (
    <>
      <Box minH={'100vh'} padding={'60px 96px'}>
        <VStack spacing={5} p={4} maxW="800px" mx="auto">
          <Heading size="lg">コース一覧</Heading>
          <SimpleGrid columns={2} spacing={5}>
            {courses.map((course: CourseType) => (
              <Box key={course.id} p="4" boxShadow="lg" rounded="md">
                <Text>
                  <strong>コースID</strong>：{course.id}
                </Text>
                <Text>
                  <strong>コース名</strong>：{course.name}
                </Text>
                <Text isTruncated>
                  <strong>概要</strong>：{course.description}
                </Text>
                <Text>
                  <strong>状態</strong>：{course.published ? '公開' : '非公開'}
                </Text>
                <Text>
                  <strong>作成日</strong>：{formatDate(course.created_at)}
                </Text>
                <Text>
                  <strong>更新日</strong>：{formatDate(course.updated_at)}
                </Text>
                <Link href={`/admin/course/edit/${course.id}`}>
                  <Button mt="2" colorScheme="green" variant="solid">
                    編集
                  </Button>
                </Link>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Box>
    </>
  )
}
