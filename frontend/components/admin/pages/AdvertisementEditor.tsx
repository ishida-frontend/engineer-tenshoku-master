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
  Textarea,
  Link,
  CheckboxGroup,
  HStack,
  Text,
} from '@chakra-ui/react'

import { useCustomToast } from '../../../hooks/useCustomToast'
import { AdvertisementType } from '../../../types/AdvertisementType'
import { Loader } from '../atoms/Loader'

type AdvertisementEditorProps = {
  advertisement: AdvertisementType
}
export const AdverrisementEditor = ({
  advertisement,
}: AdvertisementEditorProps) => {
  const { showSuccessToast, showErrorToast } = useCustomToast()

  const selectedAdvertisement: AdvertisementType = {
    id: advertisement.id,
    name: advertisement.name,
    url: advertisement.url,
    imageUrl: advertisement.imageUrl,
    author: advertisement.author,
    startFrom: advertisement.startFrom,
    endAt: advertisement.endAt,
  }
  const [advertisementData, setAdvertisementData] = useState<
    AdvertisementType[]
  >([selectedAdvertisement])
  const [errors, setErrors] = useState({
    nameError: '',
    urlError: '',
    imageUrlError: '',
    authorError: '',
  })
  const [isSubmitting, SetIsSubmitting] = useState(false)
  const [advertisementIds, setAdvertisementIds] = useState<string[]>([])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!advertisementData) {
        showSuccessToast('広告情報の取得に失敗しました')
      }
    }, 10000)
    return () => clearTimeout(timeout)
  }, [advertisementData, showSuccessToast])

  const hasChanges = () => {
    return (
      JSON.stringify(selectedAdvertisement) !== JSON.stringify(advertisement)
    )
  }
  const handleAdvertisementIds = (advertisementId: string) => () => {
    // idが選択されていたら
    if (advertisementId.includes(advertisementId)) {
      // idを取り除く
      setAdvertisementIds(
        advertisementIds.filter((id) => id !== advertisementId),
      )
    } else {
      // idを追加する
      setAdvertisementIds([...advertisementIds, advertisementId])
    }
  }
  const isButtonDisabled = () => {
    return !hasChanges()
  }

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
          body: JSON.stringify(advertisementData[0]),
        },
      )
      const validResults = await response.json()

      if (response.ok) {
        showSuccessToast(validResults.message)
        setErrors({
          nameError: '',
          urlError: '',
          imageUrlError: '',
          authorError: '',
        })
      } else {
        showErrorToast('広告情報の更新に失敗しました')
      }
    } catch (error) {
      showErrorToast('広告情報の更新に失敗しました')
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
          <Text>広告ID：{advertisement.id}</Text>
        </Box>
        <FormControl>
          <FormLabel>広告タイトル</FormLabel>
          <Input
            type="text"
            value={advertisementData[0].name}
            onChange={(e) =>
              setAdvertisementData([{
                ...advertisementData[0],
                name: e.target.value,
              }])
            }
            aria-required={true}
            border="1px"
            borderColor="gray.400"
          />
          <FormErrorMessage>{errors.nameError}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>リンク</FormLabel>
          <Textarea
            value={advertisementData[0].url}
            onChange={(e) =>
              setAdvertisementData([{
                ...advertisementData[0],
                url: e.target.value,
              }])
            }
            size="lg"
            rows={10}
            aria-required={true}
            border="1px"
            borderColor="gray.400"
          ></Textarea>
          <FormErrorMessage>{errors.urlError}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>広告画像URL</FormLabel>
          <Input
            type="text"
            value={advertisementData[0].imageUrl}
            onChange={(e) =>
              setAdvertisementData([{
                ...advertisementData[0],
                imageUrl: e.target.value,
              }])
            }
            aria-required={true}
            border="1px"
            borderColor="gray.400"
          />
          <FormErrorMessage>{errors.imageUrlError}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>企業名</FormLabel>
          <HStack>
            <Input
              value={advertisementData[0].author}
              onChange={(e) =>
                setAdvertisementData([{
                  ...advertisementData[0],
                  author: e.target.value,
                }])
              }
              aria-required={true}
              border="1px"
              borderColor="gray.400"
            ></Input>
            <Text>(h)</Text>
          </HStack>
          <FormErrorMessage>{errors.nameError}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>開始日</FormLabel>
          <Select
            value={advertisementData[0].startFrom.toString()}
            onChange={(e) =>
              setAdvertisementData([{
                ...advertisementData[0],
                startFrom: new Date(e.target.value),
              }])
            }
            aria-required={true}
            border="1px"
            borderColor="gray.400"
          ></Select>
        </FormControl>
        <CheckboxGroup colorScheme="primary">
          <Stack spacing={[5]} direction={['row']} flexWrap={'wrap'}>
            {advertisementData.map((advertisement) => (
              <HStack cursor={'pointer'} key={advertisement.id}>
                <input
                  id={advertisement.id}
                  type="checkbox"
                  checked={advertisementIds.includes(advertisement.id)}
                  onChange={handleAdvertisementIds(advertisement.id)}
                />
                <Text>{advertisement.name}</Text>
              </HStack>
            ))}
          </Stack>
        </CheckboxGroup>
        <Button
          onClick={updateAdvertisement}
          isLoading={isSubmitting}
          isDisabled={isButtonDisabled()}
          colorScheme="green"
          variant="solid"
        >
          変更を保存
        </Button>
      </Stack>
    </Box>
  )
}
