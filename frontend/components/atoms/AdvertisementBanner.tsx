'use client'
import {
  Box,
  SimpleGrid,
  VStack,
  Image,
  CloseButton,
  Link,
} from '@chakra-ui/react'

import { AdvertisementType } from '../../types/AdvertisementType'
import { useState } from 'react'

type AdvertisementTypeProps = {
  advertisements: AdvertisementType[] | null | undefined
}

export function AdvertisementBanner({
  advertisements,
}: AdvertisementTypeProps) {
  if (!advertisements || !Array.isArray(advertisements)) {
    return <ErrorMessage message="広告の取得に失敗しました" />
  }

  const [showAdBanners, setShowAdBanners] = useState(
    advertisements ? Array(advertisements.length).fill(true) : [],
  )

  const handleCloseAdBanner = (index: number) => {
    setShowAdBanners((prevState) => {
      const newState = [...prevState]
      newState[index] = false
      return newState
    })
  }

  return (
    <VStack spacing={5} p={4} maxW="800px" mx="auto">
      <SimpleGrid columns={1} spacing={5}>
        {advertisements.map(
          (advertisement: AdvertisementType, index: number) =>
            showAdBanners[index] && (
              <Advertisement
                key={index}
                advertisement={advertisement}
                onClose={() => handleCloseAdBanner(index)}
              />
            ),
        )}
      </SimpleGrid>
    </VStack>
  )
}
type AdvertisementProps = {
  advertisement: AdvertisementType
  onClose: () => void
}
function Advertisement({ advertisement, onClose }: AdvertisementProps) {
  if (!advertisement) {
    return null
  }
  return (
    <Box position="relative" p="4" rounded="md">
      <CloseButton position="absolute" top={2} right={2} onClick={onClose} />
      <Link href={advertisement.url} target="_blank">
        <Image src={`${advertisement.imageUrl}`} />
      </Link>
    </Box>
  )
}
// AdvertisementBanner内で使われるエラーメッセージ表示用コンポーネント
function ErrorMessage({ message }: { message: string }) {
  return <div>{message}</div>
}
