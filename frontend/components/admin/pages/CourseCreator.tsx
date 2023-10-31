'use client'
import React, { useState, FormEvent } from 'react'
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
  CheckboxGroup,
  Text,
  useCheckboxGroup,
  HStack,
} from '@chakra-ui/react'
import { TagType } from '../../../types'
import { THEME_COLOR } from '../../../constants/colors'

type CourseCreatePageProps = {
  tags: TagType[]
}

export default function CourseCreatePage({ tags }: CourseCreatePageProps) {
  const toast = useToast()
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [published, setPublished] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tagIds, setTagIds] = useState<string[]>([])

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

  const handleSubmit = async (event: FormEvent) => {
    setIsSubmitting(true)

    event.preventDefault()

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/course/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          image,
          published,
          tagIds,
        }),
      },
    )

    const data = await response.json()

    if (response.ok) {
      toast({
        title: data.message,
        status: 'success',
        position: 'top',
        duration: 3000,
      })
    } else {
      toast({
        title: data.message,
        status: 'error',
        position: 'top',
        duration: 3000,
      })
    }

    setIsSubmitting(false)
  }

  return (
    <>
      <Box w="full" maxW="600px" mx="auto" p={6}>
        <Stack spacing={4}>
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
          <FormControl id="courseImage">
            <FormLabel htmlFor="courseImage">コース画像URL</FormLabel>
            <Input
              id="courseImage"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              aria-required={true}
              border="1px"
              borderColor="gray.400"
            />
          </FormControl>
          <FormControl id="coursePublished">
            <FormLabel htmlFor="CoursePublished">コース公開設定</FormLabel>
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
          <CheckboxGroup
            colorScheme={THEME_COLOR.PRIMARY_FONT_COLOR}
            defaultValue={[]}
          >
            <Stack spacing={[5]} direction={['row']} flexWrap={'wrap'}>
              {tags.map((tag) => (
                <HStack as="label" htmlFor={tag.id} cursor={'pointer'}>
                  <input
                    id={tag.id}
                    type="checkbox"
                    onChange={handleTagIds(tag.id)}
                  />
                  <Text>{tag.name}</Text>
                </HStack>
              ))}
            </Stack>
          </CheckboxGroup>

          <Button
            isDisabled={name === '' || description === ''}
            onClick={handleSubmit}
            isLoading={isSubmitting}
            colorScheme="teal"
            variant="solid"
          >
            コース作成
          </Button>
        </Stack>
      </Box>
    </>
  )
}
