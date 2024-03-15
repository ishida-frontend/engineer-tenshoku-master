'use client'
import React from 'react'
import {
  AspectRatio,
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { BsChevronRight } from 'react-icons/bs'
import { TimeIcon } from '@chakra-ui/icons'

import { FavoriteVideoType } from '../../types'
import { PRIMARY_FONT_COLOR } from '../../constants/colors'
import { useCustomToast } from '../../hooks/useCustomToast'

type FavoriteVideoListProps = {
  favoriteVideos: FavoriteVideoType[]
}

export function FavoriteVideoList({ favoriteVideos }: FavoriteVideoListProps) {
  const { showErrorToast } = useCustomToast()

  if (!Array.isArray(favoriteVideos)) {
    showErrorToast('広告情報の取得に失敗しました')
    return null
  }
  return (
    <Center bg={'gray.200'}>
      <VStack mx="auto" padding={'60px 96px'}>
        <Heading my={5} color={PRIMARY_FONT_COLOR} fontSize="36px">
          お気に入り動画一覧
        </Heading>
        <Box mb={10} minW={'1024px'}>
          <Flex
            alignItems="center"
            mt={6}
            pb={2}
            borderBottom="1px"
            borderColor={'blackAlpha.500'}
          />
          {favoriteVideos.length > 0 ? (
            <SimpleGrid
              columns={3}
              mt="16px"
              spacingX="auto"
              spacingY="10"
              minW={'100%'}
            >
              {favoriteVideos.map((favoriteVideo: FavoriteVideoType) => (
                <Card
                  key={favoriteVideo.video_id}
                  w="288px"
                  boxShadow="md"
                  borderRadius="8px"
                  margin={'auto'}
                >
                  <CardHeader p={0}>
                    <AspectRatio ratio={16 / 9}>
                      <iframe
                        title="favoritedVideo"
                        src={favoriteVideo?.video.url}
                      />
                    </AspectRatio>
                  </CardHeader>
                  <CardBody
                    px={3}
                    pt={4}
                    pb={3}
                    display={'flex'}
                    flexDirection={'column'}
                    flex={'1 1 auto'}
                    position={'relative'}
                  >
                    <Heading fontSize="16px">
                      {favoriteVideo.video.name}
                    </Heading>
                    <Text
                      h="34px"
                      mt={3}
                      lineHeight="16.94px"
                      fontSize="14px"
                      color={'blackAlpha.700'}
                      overflowWrap="break-word"
                      noOfLines={2}
                    >
                      {favoriteVideo.video.description}
                    </Text>

                    {favoriteVideo.video.section.course.requiredTime && (
                      <Flex
                        position={'absolute'}
                        bottom={'13px'}
                        height={'15px'}
                        color={'gray.500'}
                      >
                        <TimeIcon w={'15px'} lineHeight={'15px'} />
                        <Text pl={'5px'} lineHeight={'15px'}>
                          {favoriteVideo.video.section.course.requiredTime}h
                        </Text>
                      </Flex>
                    )}
                    <Flex
                      justify="flex-end"
                      position={'absolute'}
                      bottom={'8px'}
                      right={'12px'}
                    >
                      <Link
                        href={`/course/${favoriteVideo.video.section.course_id}/${favoriteVideo.video_id}`}
                        mt="2"
                        color={PRIMARY_FONT_COLOR}
                        _hover={{ textDecoration: 'none' }}
                      >
                        <Flex alignItems="center">
                          <BsChevronRight size="20" />
                          <Text pl={3}>視聴する</Text>
                        </Flex>
                      </Link>
                    </Flex>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          ) : (
            <Center>
              <Box>
                <Text fontSize="30px" mt="10">
                  お気に入りの動画はありません
                </Text>
              </Box>
            </Center>
          )}
        </Box>
      </VStack>
    </Center>
  )
}
