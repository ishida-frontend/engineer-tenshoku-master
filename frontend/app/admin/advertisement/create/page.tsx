'use client'

import {
  Box,
  FormControl,
  Heading,
  Stack,
  FormLabel,
  Input,
  useToast,
  Button,
  Text,
  FormErrorMessage,
} from '@chakra-ui/react'
import React, { useState, FormEvent } from 'react'
import { THEME_COLOR } from '../../../../constants'

import { advertisementSchema } from '../../../../zod'
import { ZodIssue } from 'zod'

export default function CreateAdvertisementPage() {
  const toast = useToast()
  const [name, setName] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  // TODO S3が入るようになってから広告画像保存できるように修正
  const [imageUrl] = useState<string>(
    'https://2.bp.blogspot.com/-irp34LY2m-Q/W-0g4E5_fMI/AAAAAAABQNU/GDXJYSCRDqkyPcj2YAoSdKqdYmti_8KVwCLcBGAs/s180-c/kaisya_computer_sports_woman.png',
  )
  const [startFrom, setStartFrom] = useState<Date>(new Date())
  const [endAt, setEndAt] = useState<Date>(new Date())
  const [errors, setErrors] = useState<ZodIssue[]>([])
  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault()

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

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/advertisement`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        setErrors(data)
        toast({
          title: '入力に誤りがあります',
          status: 'error',
          position: 'top',
          duration: 3000,
        })
      }
      toast({
        title: data.message,
        status: 'success',
        position: 'top',
        duration: 3000,
      })
    } catch (e) {
      if (e.issues) {
        setErrors(e.issues)
        return
      }
      toast({
        title: e.message,
        status: 'error',
        position: 'top',
        duration: 3000,
      })
    }
  }

  return (
    <Box w="full" maxW="600px" mx="auto" p={6}>
      <Stack spacing={4}>
        <Heading size="lg">広告登録</Heading>
        <FormControl
          isInvalid={
            !!errors.find((e) => {
              return e.path[0] === 'name'
            })
          }
        >
          <FormLabel>
            <Text>広告のタイトル</Text>
          </FormLabel>
          <Input
            bg={THEME_COLOR.SECONDARY_WHITE}
            type="text"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target?.value)
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
          <FormLabel>
            <Text>画像</Text>
          </FormLabel>
          {/* TODO: 画像をs3に渡せるように追加対応を行う */}
          {/* <Input
            bg={THEME_COLOR.SECONDARY_WHITE}
            type="file"
            accept="image/*"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setImageUrl(e.target.value)
            }
          />

          <img src={imageUrl} />
          <FormErrorMessage>
            {
              errors.find((e) => {
                return e.path[0] === 'imageUrl'
              })?.message
            }
          </FormErrorMessage> */}
        </FormControl>
        <FormControl
          isInvalid={
            !!errors.find((e) => {
              return e.path[0] === 'author'
            })
          }
        >
          <FormLabel>企業名</FormLabel>
          <Input
            bg={THEME_COLOR.SECONDARY_WHITE}
            type="text"
            value={author}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAuthor(e.target.value)
            }
            aria-required={true}
            border="1px"
            borderColor="gray.400"
          />
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
          <FormLabel>
            <Text>リンク</Text>
          </FormLabel>
          <Input
            bg={THEME_COLOR.SECONDARY_WHITE}
            type="text"
            value={url}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUrl(e.target.value)
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
        <Stack direction={'row'}>
          <FormControl
            isInvalid={
              !!errors.find((e) => {
                return e.path[0] === 'startFrom'
              })
            }
          >
            <FormLabel>
              <Text>開始</Text>
            </FormLabel>
            <Input
              bg={THEME_COLOR.SECONDARY_WHITE}
              border="1px"
              borderColor="gray.400"
              type="date"
              value={startFrom.toISOString().slice(0, 10)}
              onChange={(e) => setStartFrom(new Date(e.target.value))}
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
            <FormLabel>
              <Text>終了</Text>
            </FormLabel>
            <Input
              bg={THEME_COLOR.SECONDARY_WHITE}
              border="1px"
              borderColor="gray.400"
              type="date"
              value={endAt.toISOString().slice(0, 10)}
              onChange={(e) => setEndAt(new Date(e.target.value))}
            ></Input>
            <FormErrorMessage>
              {
                errors.find((e) => {
                  return e.path[0] === 'endAt'
                })?.message
              }
            </FormErrorMessage>
          </FormControl>
        </Stack>
        <Button
          onClick={(e) => handleSubmit(e)}
          colorScheme="teal"
          variant="solid"
        >
          登録
        </Button>
      </Stack>
    </Box>
  )
}
