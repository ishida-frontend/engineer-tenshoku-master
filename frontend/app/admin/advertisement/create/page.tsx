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
  Flex,
  Text,
  FormErrorMessage,
  RadioGroup,
  Radio,
  HStack,
} from '@chakra-ui/react'
import React, { useState, FormEvent } from 'react'
import { THEME_COLOR } from '../../../../constants'
// import { AdvertisementType, AdvertisementErrorType } from '../../../../types/AdvertisementType'
import { advertisementSchema } from '../../../../../common/zod'
export default function CreateAdvertisementPage() {
  const toast = useToast()
  const [name, setName] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [isShow, setIsShow] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [startFrom, setStartFrom] = useState<Date>(new Date())
  const [endAt, setEndAt] = useState<Date>(new Date())
  const [errors, setErrors] = useState<
    {
      message: string
      path: string[]
      type: string
    }[]
  >([])
  const handleSubmit = async (event: FormEvent) => {
    try {
      const formData = {
        name,
        url,
        author,
        isShow,
        imageUrl,
        startFrom,
        endAt,
      }

      const validation = advertisementSchema.parse(formData)
      console.log('validation', validation)

      setIsShow(true)

      event.preventDefault()

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/advertisement`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            url,
            author,
            isShow,
            imageUrl,
            startFrom,
            endAt,
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
      setIsShow(false)
    } catch (e) {
      if (e.issues) {
        console.log('e', e.issues)
        setErrors(e.issues)
        return
      }
      toast({
        title: 'エラーが発生しました',
        status: 'error',
        position: 'top',
        duration: 3000,
      })
    }
  }

  return (
    <>
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
              <FormErrorMessage>{}</FormErrorMessage>
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
          <FormControl>
            <FormLabel>
              <Text>画像</Text>
              <FormErrorMessage>{}</FormErrorMessage>
            </FormLabel>
            <Input
              bg={THEME_COLOR.SECONDARY_WHITE}
              type="file"
              accept="image/*"
              value={imageUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setImageUrl(e.target?.value)
              }
            />
            <>
              <img src="" />
            </>
          </FormControl>
          <FormControl>
            <FormLabel>企業名</FormLabel>
            <Input
              bg={THEME_COLOR.SECONDARY_WHITE}
              type="text"
              value={author}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAuthor(e.target?.value)
              }
              aria-required={true}
              border="1px"
              borderColor="gray.400"
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              <Text>リンク</Text>
              <FormErrorMessage>{}</FormErrorMessage>
            </FormLabel>
            <Input
              bg={THEME_COLOR.SECONDARY_WHITE}
              type="text"
              value={url}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUrl(e.target?.value)
              }
              border="1px"
              borderColor="gray.400"
            ></Input>
          </FormControl>
          <Flex justify="center" align="center">
            <FormControl>
              <FormLabel>
                <Text>開始</Text>
                <FormErrorMessage>{}</FormErrorMessage>
              </FormLabel>
              <Input
                bg={THEME_COLOR.SECONDARY_WHITE}
                type="date"
                value={startFrom.toISOString().slice(0, 10)}
                onChange={(e) =>
                  setStartFrom(new Date(Date.parse(e.target.value)))
                }
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel>
                <Text>終了</Text>
                <FormErrorMessage>{}</FormErrorMessage>
              </FormLabel>
              <Input
                bg={THEME_COLOR.SECONDARY_WHITE}
                type="date"
                value={endAt.toISOString().slice(0, 10)}
                onChange={(e) => setEndAt(new Date(Date.parse(e.target.value)))}
              ></Input>
            </FormControl>
          </Flex>
          <FormControl>
            <FormLabel>
              <Text>表示設定</Text>
            </FormLabel>
            <RadioGroup
              onChange={setIsShow}
              value={isShow}
              defaultValue="private"
            >
              <HStack spacing="24px">
                <Radio value="release">表示する</Radio>
                <Radio value="private">表示しない</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          <Button onClick={handleSubmit} colorScheme="teal" variant="solid">
            登録
          </Button>
        </Stack>
      </Box>
    </>
  )
}
