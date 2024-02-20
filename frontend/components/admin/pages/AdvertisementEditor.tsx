'use client'
import React, { useState, FormEvent, useEffect, useCallback } from 'react'

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

import { AdvertisementType } from '../../../types/AdvertisementType'
import { advertisementSchema } from '../../../zod'
import { ZodIssue } from 'zod'
import { Loader } from '../atoms/Loader'

type AdvertisementEditorProps = {
  advertisement: AdvertisementType
}
export function AdverrisementEditor({ advertisement }: AdvertisementEditorProps){
  const selectedAdvertisement: AdvertisementType = {
    id: advertisement.id,
    name: advertisement.name,
    url: advertisement.url,
    imageUrl: advertisement.imageUrl,
    author: advertisement.author,
    startFrom: advertisement.startFrom,
    endAt: advertisement.endAt,
  }
  const toast = useToast()
  const [advertisementData, setAdvertisementData] = useState<AdvertisementType>(
    selectedAdvertisement,
  )
  const [errors, setErrors] = useState<ZodIssue[]>([])
  const [isSubmitting, SetIsSubmitting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!advertisementData) {
        toast({
          title: '広告情報の取得に失敗しました',
          status: 'error',
          position: 'top',
          duration: 3000,
        })
      }
    }, 10000)
    return () => clearTimeout(timeout)
  }, [advertisementData, clearTimeout])

  const hasChanges = () => {
    return (
      JSON.stringify(selectedAdvertisement) !== JSON.stringify(advertisement)
    )
  }
  const isNotChanged = useCallback(() => {
    return !hasChanges()
  }, [hasChanges])

  const updateAdvertisement = async (event: FormEvent) => {
    event.preventDefault()

    SetIsSubmitting(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/advrttisement/edit/${advertisement.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ advertisementData }),
        },
      )
      console.log('advertisementData', advertisementData)
      advertisementSchema.safeParse(advertisementData)
      const data = await response.json()

      if (!response.ok) {
        setErrors(data)
        toast({
          title: '入力に誤りがあります',
          status: 'error',
          position: 'top',
          duration: 3000,
        })
      } else {
        toast({
          title: '広告情報の更新に成功しました',
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

  if (!advertisementData) return <Loader />

  return (
    <Box w="full" maxW="600px" mx="auto" p={6}>
      <Stack spacing={4}>
        <Link href="/admin/advertisement">
          <Button colorScheme="green">一覧へ戻る</Button>
        </Link>
        <Box p={4} border="1px" borderColor="gray.400" borderRadius={9}>
          <Text>広告ID：{advertisementData.id}</Text>
        </Box>
        <FormControl
          isInvalid={
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
            border="1px"
            borderColor="gray.400"
          />
          <FormErrorMessage>
            {
              errors.find((e) => {
                return e.path[0] === 'name'
              })?.message
            }
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={
            !!errors.find((e) => {
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
              errors.find((e) => {
                return e.path[0] === 'imageUrl'
              })?.message
            }
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={
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
              border="1px"
              borderColor="gray.400"
            ></Input>
          </HStack>
          <FormErrorMessage>
            {
              errors.find((e) => {
                return e.path[0] === 'author'
              })?.message
            }
          </FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={
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
            border="1px"
            borderColor="gray.400"
          ></Input>
          <FormErrorMessage>
            {
              errors.find((e) => {
                return e.path[0] === 'url'
              })?.message
            }
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={
            !!errors.find((e) => {
              return e.path[0] === 'startFrom'
            })
          }
        >
          <FormLabel>開始日</FormLabel>
          <Input
            value={advertisementData.startFrom.toString()}
            onChange={(e) =>
              setAdvertisementData({
                ...advertisementData,
                startFrom: new Date(e.target.value),
              })
            }
            border="1px"
            borderColor="gray.400"
          ></Input>
          <FormErrorMessage>
            {
              errors.find((e) => {
                return e.path[0] === 'srartFrom'
              })?.message
            }
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={
            !!errors.find((e) => {
              return e.path[0] === 'endAt'
            })
          }
        >
          <FormLabel>終了日</FormLabel>
          <Input
            value={advertisementData.endAt.toString()}
            onChange={(e) =>
              setAdvertisementData({
                ...advertisementData,
                endAt: new Date(e.target.value),
              })
            }
            aria-required={true}
            border="1px"
            borderColor="gray.400"
          ></Input>
          <FormErrorMessage>
            {
              errors.find((e) => {
                return e.path[0] === 'endAt'
              })?.message
            }
          </FormErrorMessage>
        </FormControl>
        <Button
          onClick={updateAdvertisement}
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
