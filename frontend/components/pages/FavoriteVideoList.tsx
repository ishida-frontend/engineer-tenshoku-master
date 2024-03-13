'use client'
import React, { Fragment } from 'react'
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { BsChevronRight } from 'react-icons/bs'

import { FavoriteVideoType } from '../../types'
import { Loader } from '../atoms/Loader'
import { PRIMARY_FONT_COLOR } from '../../constants/colors'

type FavoriteVideoListProps = {
  favoriteVideos: FavoriteVideoType[]
}

export function FavoriteVideoList({ favoriteVideos }: FavoriteVideoListProps) {
  if (!Array.isArray(favoriteVideos)) {
    return <Loader />
  }
  console.log('favoriteVideos', favoriteVideos)

  return (
    <Center>
      <VStack>
        <Flex gap={10}>
          <Box mb={10} minW={'880px'}>
            <Heading
              py={10}
              color={PRIMARY_FONT_COLOR}
              fontSize="36px"
              textAlign="center"
            >
              お気に入り動画一覧
            </Heading>
            <Flex
              alignItems="center"
              pb={2}
              borderBottom="1px"
              borderColor={'blackAlpha.500'}
            ></Flex>
            {favoriteVideos.length === 0 && (
              <VStack mt="40px">
                <Heading color={PRIMARY_FONT_COLOR} fontSize="36px">
                  お気に入り動画はありません
                </Heading>
              </VStack>
            )}
            {favoriteVideos && (
              <SimpleGrid
                columns={3}
                mt="40px"
                spacingX="auto"
                spacingY="10"
                minW={'100%'}
              >
                {favoriteVideos.map((favoriteVideo: FavoriteVideoType) => (
                  <Text>{favoriteVideo.user_id?.[0]}</Text>
                ))}
              </SimpleGrid>
            )}
          </Box>
          <VStack mt={40} gap={10}></VStack>
        </Flex>
      </VStack>
    </Center>
  )
}
