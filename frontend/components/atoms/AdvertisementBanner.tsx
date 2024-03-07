'use client'
import { Box, SimpleGrid, VStack, Image, Link } from '@chakra-ui/react'

import { AdvertisementType } from '../../types/AdvertisementType'

type AdvertisementTypeProps = {
  advertisements: AdvertisementType[] | null | undefined
}

export function AdvertisementBanner({
  advertisements,
}: AdvertisementTypeProps) {
  if (!advertisements || !Array.isArray(advertisements)) {
    return null
  }

  return (
    <VStack spacing={5} p={4} maxW="800px" mx="auto">
      <SimpleGrid columns={1} spacing={5}>
        {advertisements.map(
          (advertisement: AdvertisementType, index: number) => (
            <Advertisement key={index} advertisement={advertisement} />
          ),
        )}
      </SimpleGrid>
    </VStack>
  )
}
type AdvertisementProps = {
  advertisement: AdvertisementType
}
function Advertisement({ advertisement }: AdvertisementProps) {
  if (!advertisement) {
    return null
  }
  return (
    <Box position="relative" p="4" rounded="md">
      <Link href={advertisement.url} target="_blank">
        <Image src={`${advertisement.imageUrl}`} />
      </Link>
    </Box>
  )
}
