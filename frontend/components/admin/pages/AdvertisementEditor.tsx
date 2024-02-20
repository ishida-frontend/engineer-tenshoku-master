'use client'
import React, { useState, FormEvent } from 'react'

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Link,
  useToast,
  HStack,
  Text,
} from '@chakra-ui/react'
import { THEME_COLOR } from '../../../constants'

import { AdvertisementType } from '../../../types/AdvertisementType'
import { advertisementSchema } from '../../../zod'
import { ZodIssue } from 'zod'

type AdvertisementEditorProps = {
  advertisement: AdvertisementType
}
export function AdverrisementEditor({
  advertisement,
}: AdvertisementEditorProps) {
  const selectedAdvertisement: AdvertisementType = {
    id: advertisement.id,
    name: advertisement.name,
    url: advertisement.url,
    imageUrl: advertisement.imageUrl,
    author: advertisement.author,
    startFrom: new Date(advertisement.startFrom),
    endAt: new Date(advertisement.endAt),
  }
  const toast = useToast()
  const [advertisementData, setAdvertisementData] = useState<AdvertisementType>(
    selectedAdvertisement,
  )
  const [errors, setErrors] = useState<ZodIssue[]>([])
  const [isSubmitting, SetIsSubmitting] = useState(false)
  const updateAdvertisement = async (event: FormEvent) => {
    try {
      event.preventDefault()

      const formData = {
        name: advertisementData.name,
        url: advertisementData.url,
        author: advertisementData.author,
        imageUrl: advertisementData.imageUrl,
        startFrom: advertisementData.startFrom.toISOString(),
        endAt: advertisementData.endAt.toISOString(),
      }
      
      const advertisementValidationResult =
        advertisementSchema.safeParse(formData)
      if (advertisementValidationResult.success === false) {
        setErrors(advertisementValidationResult.error.issues)
        toast({
          title: 'フォームの入力に誤りがあります',
          status: 'error',
          position: 'top',
          duration: 3000,
        })
        return
      }

      event.preventDefault()

      SetIsSubmitting(true)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/advertisement`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: advertisementData.id,
            name: advertisementData.name,
            url: advertisementData.url,
            imageUrl: advertisementData.imageUrl,
            author: advertisementData.author,
            startFrom: advertisementData.startFrom,
            endAt: advertisementData.endAt,
          }),
        },
      )
      const responseData = await response.json()

      if (!response.ok) {
        setErrors(responseData)
        toast({
          title: '入力に誤りがあります',
          status: 'error',
          position: 'top',
          duration: 3000,
        })
      } else {
        toast({
          title: responseData.message,
          status: 'success',
          position: 'top',
          duration: 3000,
        })
      }
    } catch (e) {
      toast({
        title: '広告情報の更新に失敗しました',
        status: 'error',
        position: 'top',
        duration: 3000,
      })
    } finally {
      SetIsSubmitting(false)
    }
  }
  return (
    <Box w="full" maxW="600px" mx="auto" p={6}>
      <Stack spacing={4}>
        <Link href="/admin/advertisement">
          <Button colorScheme="green">一覧へ戻る</Button>
        </Link>
        <Box
          p={4}
          border="1px"
          borderColor="gray.400"
          borderRadius={9}
          bg={THEME_COLOR.SECONDARY_WHITE}
        >
          <Text>広告ID：{advertisementData.id}</Text>
        </Box>
        <FormControl
          isInvalid={
            !!errors &&
            errors.find &&
            !!errors.find((e) => {
              return e.path[0] === 'name'
            })
          }
        >
          <FormLabel>広告のタイトル</FormLabel>
          <Input
            type="text"
            value={advertisementData.name}
            onChange={(e) =>
              setAdvertisementData({
                ...advertisementData,
                name: e.target.value,
              })
            }
            aria-required={true}
            bg={THEME_COLOR.SECONDARY_WHITE}
            border="1px"
            borderColor="gray.400"
          />
          <FormErrorMessage>
            {errors &&
              errors.find &&
              errors.find((e) => {
                return e.path[0] === 'name'
              })?.message}
          </FormErrorMessage>
        </FormControl>
        {/* <FormControl
          isInvalid={
            !!errors && errors.find && !!errors.find((e) => {
              return e.path[0] === 'imageUrl'
            })
          }
        >
          <FormLabel>広告画像</FormLabel>
          <Input
            type="text"
            value={advertisementData.imageUrl}
            onChange={(e) =>
              setAdvertisementData({
                ...advertisementData,
                imageUrl: e.target.value,
              })
            }
            aria-required={true}
            border="1px"
            borderColor="gray.400"
          />
          <FormErrorMessage>
            {
              errors && errors.find && errors.find((e) => {
                return e.path[0] === 'imageUrl'
              })?.message
            }
          </FormErrorMessage>
        </FormControl> */}
        <FormControl
          isInvalid={
            !!errors &&
            errors.find &&
            !!errors.find((e) => {
              return e.path[0] === 'author'
            })
          }
        >
          <FormLabel>企業名</FormLabel>
          <HStack>
            <Input
              value={advertisementData.author}
              onChange={(e) =>
                setAdvertisementData({
                  ...advertisementData,
                  author: e.target.value,
                })
              }
              bg={THEME_COLOR.SECONDARY_WHITE}
              border="1px"
              borderColor="gray.400"
            ></Input>
          </HStack>
          <FormErrorMessage>
            {errors &&
              errors.find &&
              errors.find((e) => {
                return e.path[0] === 'author'
              })?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={
            !!errors &&
            errors.find &&
            !!errors.find((e) => {
              return e.path[0] === 'url'
            })
          }
        >
          <FormLabel>リンク</FormLabel>
          <Input
            value={advertisementData.url}
            onChange={(e) =>
              setAdvertisementData({
                ...advertisementData,
                url: e.target.value,
              })
            }
            bg={THEME_COLOR.SECONDARY_WHITE}
            border="1px"
            borderColor="gray.400"
          ></Input>
          <FormErrorMessage>
            {errors &&
              errors.find &&
              errors.find((e) => {
                return e.path[0] === 'url'
              })?.message}
          </FormErrorMessage>
        </FormControl>
        <Stack direction={'row'}>
          <FormControl
            isInvalid={
              !!errors &&
              errors.find &&
              !!errors.find((e) => {
                return e.path[0] === 'startFrom'
              })
            }
          >
            <FormLabel>開始</FormLabel>
            <Input
              value={
                new Date(advertisementData.startFrom)
                  .toISOString()
                  .split('T')[0]
              }
              onChange={(e) =>
                setAdvertisementData({
                  ...advertisementData,
                  startFrom: new Date(e.target.value),
                })
              }
              type="date"
              bg={THEME_COLOR.SECONDARY_WHITE}
              border="1px"
              borderColor="gray.400"
            ></Input>
            <FormErrorMessage>
              {errors &&
                errors.find &&
                errors.find((e) => {
                  return e.path[0] === 'srartFrom'
                })?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={
              !!errors &&
              errors.find &&
              !!errors.find((e) => {
                return e.path[0] === 'endAt'
              })
            }
          >
            <FormLabel>終了</FormLabel>
            <Input
              value={
                new Date(advertisementData.endAt).toISOString().split('T')[0]
              }
              onChange={(e) =>
                setAdvertisementData({
                  ...advertisementData,
                  endAt: new Date(e.target.value),
                })
              }
              type="date"
              bg={THEME_COLOR.SECONDARY_WHITE}
              border="1px"
              borderColor="gray.400"
            ></Input>
            <FormErrorMessage>
              {errors &&
                errors.find &&
                errors.find((e) => {
                  return e.path[0] === 'endAt'
                })?.message}
            </FormErrorMessage>
          </FormControl>
        </Stack>
        <Button
          onClick={updateAdvertisement}
          isLoading={isSubmitting}
          colorScheme="green"
          variant="solid"
        >
          変更を保存
        </Button>
      </Stack>
    </Box>
  )
}
