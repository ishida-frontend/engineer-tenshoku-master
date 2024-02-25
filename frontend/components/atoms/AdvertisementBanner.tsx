'use client'
import {
  Box,
  SimpleGrid,
  VStack,
  Image,
  CloseButton,
  FormControl,
  Link,
} from '@chakra-ui/react'

import { useCustomToast } from '../../hooks/useCustomToast'
import { AdvertisementType } from '../../types/AdvertisementType'
import { useState } from 'react'

type AdvertisementTypeProps = {
  advertisements: AdvertisementType[]
}
export function AdvertisementBanner({ advertisements }: AdvertisementTypeProps) {
  const { showErrorToast } = useCustomToast()
  const [showAdBanners, setShowAdBanners] = useState(
    Array(advertisements.length).fill(true),
  )

  if (!Array.isArray(advertisements)) {
    showErrorToast('広告の取得に失敗しました')
    return null
  }

  const handleCloseAdBanner = (index: number) => {
    setShowAdBanners((prevState) => {
      const newState = [...prevState]
      newState[index] = false
      return newState
    })
  }

    return (
      <FormControl>
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
      </FormControl>
    )
  }
  type AdvertisementProps = {
    advertisement: AdvertisementType
    onClose: () => void
  }
  function Advertisement({ advertisement, onClose }: AdvertisementProps) {
    return (
      <Box position="relative" p="4" rounded="md">
        <CloseButton position="absolute" top={2} right={2} onClick={onClose} />
        <Link href={advertisement.url} target="_blank">
          <Image src={`${advertisement.imageUrl}`} />
        </Link>
      </Box>
    )
  }

