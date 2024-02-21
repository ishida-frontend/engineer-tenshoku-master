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

import { format } from 'date-fns'
function formatDate(date: Date): string {
  try {
    return format(date, 'yyyy/MM/dd')
  } catch (error) {
    console.error('Error formatting date:', error)
    return 'Invalid Date'
  }
}

import { useCustomToast } from '../../../hooks/useCustomToast'
import { AdvertisementType } from '../../../types/AdvertisementType'

type AdvertisementTypeProps = {
  advertisements: AdvertisementType[]
}
export function AdvertisementList({ advertisements }: AdvertisementTypeProps) {
  const { showErrorToast } = useCustomToast()

  if (!Array.isArray(advertisements)) {
    showErrorToast('広告情報の取得に失敗しました')
    return null
  }

  return (
    <Box minH={'100vh'} padding={'60px 96px'}>
      <VStack spacing={5} p={4} maxW="800px" mx="auto">
        <Heading size="lg">広告一覧</Heading>
        <SimpleGrid columns={2} spacing={5}>
          {advertisements.map((advertisement: AdvertisementType) => (
            <Box key={advertisement.id} p="4" boxShadow="lg" rounded="md">
              <Text>
                <strong>広告名</strong>：{advertisement.name}
              </Text>
              {/* <Text>
                <strong>画像</strong>：{advertisement.imageUrl}
              </Text> */}
              <Text>
                <strong>企業名</strong>：{advertisement.author}
              </Text>
              <Text>
                <strong>リンク</strong>：{advertisement.url}
              </Text>
              <Text>
                <strong>開始日</strong>：
                {formatDate(new Date(advertisement.startFrom))}
              </Text>
              <Text>
                <strong>終了日</strong>：
                {formatDate(new Date(advertisement.endAt))}
              </Text>

              <Link href={`/admin/advertisement/edit/${advertisement.id}`}>
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
