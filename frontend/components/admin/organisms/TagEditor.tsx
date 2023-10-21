'use client'
import React, { FormEvent } from 'react'
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
  Link,
} from '@chakra-ui/react'

import { TagType } from '../../../types'
import formatDate from '../../../utils/formatDate'

export function TagEditor({
  tagData,
  setTagData,
  updateTag,
  isNotChanged,
  isSubmitting,
  errors,
}: {
  tagData: TagType
  setTagData: (tag: TagType) => void
  updateTag: (event: FormEvent) => void
  isNotChanged: () => boolean
  isSubmitting: boolean
  errors: {
    nameError: string
  }
}) {
  return (
    <Box w="full" maxW="600px" mx="auto" p={6}>
      <Stack spacing={4}>
        <Link href="/admin/tag">
          <Button colorScheme="green">一覧へ戻る</Button>
        </Link>
        <Box p={4} border="1px" borderColor="gray.400" borderRadius={9}>
          <Text>タグID{tagData.id}</Text>
          <Text>
            作成日時：
            {tagData.created_at && formatDate(tagData.created_at)}
          </Text>
          <Text>
            更新日時：
            {tagData.updated_at && formatDate(tagData.updated_at)}
          </Text>
        </Box>
        <FormControl id="tagName" isRequired isInvalid={!!errors.nameError}>
          <FormLabel htmlFor="tagName">タグ名（5文字以上）</FormLabel>
          <Input
            id="tagName"
            type="text"
            value={tagData.name}
            onChange={(e) => setTagData({ ...tagData, name: e.target.value })}
            aria-required={true}
            border="1px"
            borderColor="gray.400"
          />
          <FormErrorMessage>{errors.nameError}</FormErrorMessage>
        </FormControl>
        <FormControl id="courseName" isRequired>
          <FormLabel htmlFor="courseName">背景色（必須）</FormLabel>
          <Input
            id="backgroundColor"
            type="color"
            value={tagData.backgroundColor}
            onChange={(e) =>
              setTagData({ ...tagData, backgroundColor: e.target.value })
            }
            aria-required={true}
            border="1px"
            borderColor="gray.400"
          />
        </FormControl>

        <FormControl id="coursePublished" isRequired>
          <FormLabel htmlFor="CoursePublished">文字色</FormLabel>
          <Select
            id="coursePublished"
            value={tagData.color}
            onChange={(e) => setTagData({ ...tagData, color: e.target.value })}
            border="1px"
            borderColor="gray.400"
          >
            <option value="#000000">黒</option>
            <option value="#fff">白</option>
          </Select>
        </FormControl>
        <Button
          onClick={updateTag}
          isLoading={isSubmitting}
          isDisabled={isNotChanged()}
          colorScheme="green"
          variant="solid"
        >
          変更を保存
        </Button>
      </Stack>
    </Box>
  )
}
