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
import React from 'react'
import useSWR from 'swr'

import { CourseType } from '../../../types'
import formatDate from '../../../utils/formatDate'
import { Loader } from '../../../components/admin/atoms/Loader'
import { useCustomToast } from '../../../hooks/useCustomToast'

export function CourseList() {
  const { showErrorToast } = useCustomToast()

  const fetcher = async () =>
    (await fetch('http://localhost:8000/course/all')).json()

  const { data, error } = useSWR('courseList', fetcher)

  if (error) {
    showErrorToast('コースの取得に失敗しました。')
  }

  if (!data) return <Loader />

  return (
    <VStack spacing={5} p={4} maxW="800px" mx="auto">
      <Heading size="lg">コース一覧</Heading>
      <SimpleGrid columns={2} spacing={10}>
        {data.map((course: CourseType) => (
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
              <strong>作成日</strong>：{formatDate(course.created_at)}
            </Text>
            <Text>
              <strong>更新日</strong>：{formatDate(course.updated_at)}
            </Text>
            <Link href={`/admin/course/edit/${course.id}`}>
              <Button mt="2" colorScheme="teal" variant="solid">
                編集
              </Button>
            </Link>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  )
}
