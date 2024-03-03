'use client'
import React, { useState, FormEvent } from 'react'
import { useRouter, useParams } from 'next/navigation'

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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { THEME_COLOR } from '../../../constants'

import { AdvertisementType } from '../../../types'
import { advertisementSchema } from '../../../zod'
import { ZodIssue } from 'zod'
import { useCustomToast } from '../../../hooks/useCustomToast'
import { PATHS } from '../../../constants'

type AdvertisementEditorProps = {
  advertisement: AdvertisementType
}
export function AdvertisementEditor({
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

      const { name, url, author, imageUrl, startFrom, endAt } =
        advertisementData

      const formData = {
        name,
        url,
        author,
        imageUrl,
        startFrom: startFrom.toISOString(),
        endAt: endAt.toISOString(),
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
            url,
            imageUrl,
            author,
            startFrom,
            endAt,
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
  const { showSuccessToast, showErrorToast } = useCustomToast()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showModalContent, setShowModalContent] = useState(true)

  const router = useRouter()
  const params = useParams()
  const advertisementId = params.advertisementId

  const deleteAdvertisement = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/advertisement`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            advertisementId,
          }),
        },
      )

      const result = await response.json()
      if (response.ok) {
        showSuccessToast(result.message)
        setShowModalContent(false)
        setTimeout(() => {
          router.push(PATHS.ADMIN.ADVERTISEMENT.LIST.path)
        }, 4000)
      } else {
        showErrorToast(result.message)
      }
    } catch (error) {
      showErrorToast('広告の削除に失敗しました。')
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
          TODO 画像が保存できるようになったら修正
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
            <FormLabel>開始日</FormLabel>
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
                  return e.path[0] === 'startFrom'
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
            <FormLabel>終了日</FormLabel>
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
          isDisabled={
            !(
              JSON.stringify(selectedAdvertisement) !==
              JSON.stringify(advertisementData)
            )
          }
          colorScheme="green"
          variant="solid"
        >
          変更を保存
        </Button>
        <>
          <Button colorScheme="red" onClick={onOpen}>
            削除
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            {showModalContent && (
              <ModalContent>
                <ModalHeader>この広告を削除しますか？</ModalHeader>
                <ModalCloseButton />
                <ModalFooter>
                  <Button
                    colorScheme="red"
                    mr={3}
                    onClick={deleteAdvertisement}
                  >
                    はい
                  </Button>
                  <Button variant="ghost" onClick={onClose}>
                    いいえ
                  </Button>
                </ModalFooter>
              </ModalContent>
            )}
          </Modal>
        </>
      </Stack>
    </Box>
  )
}
