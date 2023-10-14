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
  Text,
  Textarea,
  Link,
} from '@chakra-ui/react'

import { tagRemover } from './CourseRemover'
import { TagType } from '../../../types'
import formatDate from '../../../utils/formatDate'
import { Loader } from '../atoms/Loader'
import { useCustomToast } from '../../../hooks/useCustomToast'

export function tagEditor({
  tagId,
  tagData,
}: {
  tagId: string
  tagData: TagType
}) {
  const { showSuccessToast, showErrorToast } = useCustomToast()

  const selectedTag: TagType = {
    id: tagData.id,
    name: tagData.name,
    color: tagData.color,
    backgroundColor: tagData.backgroundColor,
    created_at: tagData.created_at,
    updated_at: tagData.updated_at,
    deleted_at: tagData.deleted_at,
  }
  const [tag, setTag] = useState<TagType>(selectedTag)

  const [errors, setErrors] = useState({
    nameError: '',
    descError: '',
  })

  const [isSubmitting, SetIsSubmitting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!tagData) {
        showErrorToast('データの取得に失敗しました。')
      }
    }, 10000)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagData])

  useEffect(() => {
    if (tagData) {
      setTag(tagData)
    }
  }, [tagData])

  const hasChanges = () => {
    return JSON.stringify(selectedTag) !== JSON.stringify(tag)
  }

  const isButtonDisabled = () => {
    return !hasChanges()
  }

  const updateCourse = async (event: FormEvent) => {
    event.preventDefault()

    SetIsSubmitting(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/course/edit/${course_id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: tag.id,
            name: tag.name,
            color: tag.color
            description: tag.description,
            published: tag.published,
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
        if (tag.name && tag.name.length >= 5) {
          setErrors((prevErrors) => ({ ...prevErrors, nameError: '' }))
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            nameError: validResults.errors.name,
          }))
        }

        if (tag.description && tag.description.length >= 15) {
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

  if (!tagData) return <Loader />

  return (
    <Box w="full" maxW="600px" mx="auto" p={6}>
      <Stack spacing={4}>
        <Link href="/admin/tag">
          <Button colorScheme="green">一覧へ戻る</Button>
        </Link>
        <Box p={4} border="1px" borderColor="gray.400" borderRadius={9}>
          <Text>コースID：{tag.id}</Text>
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
          <FormLabel htmlFor="tagName">コース名（5文字以上）</FormLabel>
          <Input
            id="tagName"
            type="text"
            value={tag.name}
            onChange={(e) => settag({ ...tag, name: e.target.value })}
            aria-required={true}
            border="1px"
            borderColor="gray.400"
          />
          <FormErrorMessage>{errors.nameError}</FormErrorMessage>
        </FormControl>
        <FormControl
          id="tagDescription"
          isRequired
          isInvalid={!!errors.descError}
        >
          <FormLabel htmlFor="tagDescription">
            コース概要（15文字以上）
          </FormLabel>
          <Textarea
            id="tagDescription"
            value={tag.description}
            onChange={(e) =>
              settag({ ...tag, description: e.target.value })
            }
            size="lg"
            rows={10}
            aria-required={true}
            border="1px"
            borderColor="gray.400"
          ></Textarea>
          <FormErrorMessage>{errors.descError}</FormErrorMessage>
        </FormControl>
        <FormControl id="tagPublished" isRequired>
          <FormLabel htmlFor="tagPublished">コースの公開設定</FormLabel>
          <Select
            id="tagPublished"
            value={tag.published ? 'public' : 'hidden'}
            onChange={(e) =>
              settag({ ...tag, published: e.target.value === 'public' })
            }
            border="1px"
            borderColor="gray.400"
          >
            <option value="hidden">非公開</option>
            <option value="public">公開</option>
          </Select>
        </FormControl>
        <Button
          onClick={updatetag}
          isLoading={isSubmitting}
          isDisabled={isButtonDisabled()}
          colorScheme="green"
          variant="solid"
        >
          変更を保存
        </Button>
        <tagRemover />
      </Stack>
    </Box>
  )
}
