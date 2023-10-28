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

import formatDate from '../../../utils/formatDate'
import { Loader } from '../../../components/admin/atoms/Loader'
import { useCustomToast } from '../../../hooks/useCustomToast'
import { CourseType } from '../../../types'
type CourseListProps = {
  courses: CourseType[]
}
export function CourseList({ courses }: CourseListProps) {
  const { showErrorToast } = useCustomToast()

  if (!courses) {
    showErrorToast('コースの取得に失敗しました。')
  }

  if (!courses) return <Loader />

  return (
    <Box minH={'100vh'} padding={'60px 96px'}>
      <VStack spacing={5} p={4} maxW="800px" mx="auto">
        <Heading size="lg">コース一覧</Heading>
        <SimpleGrid columns={2} spacing={5}>
          {courses.map((course: CourseType) => (
            <Box key={course.id} p="4" boxShadow="lg" rounded="md">
              <Text>
                <strong>コース名</strong>：{course.name}
              </Text>
              <Text>
                <strong>コースID</strong>：{course.id}
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
  )
}
