'use client'
import {
  Box,
  SimpleGrid,
  VStack,
  Image,
  Text,
  CloseButton,
} from '@chakra-ui/react'

import { useCustomToast } from '../../../hooks/useCustomToast'
import { AdvertisementType } from '../../../types/AdvertisementType'

type AdvertisementTypeProps = {
  advertisements: AdvertisementType[]
}
export function AdvertisementTest({ advertisements }: AdvertisementTypeProps) {
  const { showErrorToast } = useCustomToast()

  if (!Array.isArray(advertisements)) {
    showErrorToast('広告の取得に失敗しました')
    return null
  }

  const handleAdClick = (advertisement: AdvertisementType) => {
    window.open(advertisement.url, '_blank')
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      borderRadius="lg"
      boxShadow="lg"
      p={4}
      cursor="pointer"
    >
      <VStack spacing={5} p={4} maxW="800px" mx="auto">
        <SimpleGrid columns={1} spacing={5}>
          {advertisements.map((advertisement: AdvertisementType) => (
            <Box
              position="relative"
              key={advertisement.id}
              p="4"
              boxShadow="lg"
              rounded="md"
              onClick={() => handleAdClick(advertisement)}
            >
              <CloseButton position="absolute" top={2} right={2} />

              <Image src={`${advertisement.imageUrl}`} />
              <Text>
                <strong>{advertisement.imageUrl}</strong>
              </Text>
              <Text>
                <strong>{advertisement.url}</strong>
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  )
}
