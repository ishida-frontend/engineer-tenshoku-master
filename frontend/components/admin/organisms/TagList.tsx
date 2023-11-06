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
import { useCustomToast } from '../../../hooks/useCustomToast'
import { TagType } from '../../../types/TagType'
type TagListProps = {
  tags: TagType[]
}
export function TagList({ tags }: TagListProps) {
  const { showErrorToast } = useCustomToast()

  if (!tags) {
    showErrorToast('コースの取得に失敗しました。')
  }

  return (
    <Box minH={'100vh'} padding={'60px 96px'}>
      <VStack spacing={5} p={4} maxW="800px" mx="auto">
        <Heading size="lg">タグ一覧</Heading>
        <SimpleGrid columns={2} spacing={5}>
          {tags.map((tag: TagType) => (
            <Box key={tag.id} p="4" boxShadow="lg" rounded="md">
              <Text>
                <strong>タグ名</strong>：{tag.name}
              </Text>
              <Text>
                <strong>作成日</strong>：{formatDate(tag.created_at)}
              </Text>
              <Text>
                <strong>更新日</strong>：{formatDate(tag.updated_at)}
              </Text>
              <Link href={`/admin/tag/edit/${tag.id}`}>
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
