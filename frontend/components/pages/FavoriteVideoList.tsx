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

import { FavoriteVideoType, VideoType } from '../../types'
import { PRIMARY_FONT_COLOR } from '../../constants/colors'

type FavoriteVideoListProps = {
  favoriteVideos: FavoriteVideoType[]
}

export function FavoriteVideoList({ favoriteVideos }: FavoriteVideoListProps) {
  console.log('favoriteVideos', favoriteVideos)

  const filteredVideos = []
  for (let i = 0; i < favoriteVideos.length; i++) {
    const videoItem = favoriteVideos[i]
    if (videoItem.status === true) {
      filteredVideos.push(videoItem)
    }
  }

  console.log('filteredVideos', filteredVideos)
  filteredVideos.forEach((filteredVideo: FavoriteVideoType) => {
    console.log('filteredVideo.video_id', filteredVideo.video_id)
    console.log('filteredVideo.video', filteredVideo.video)
    if (filteredVideo.video && filteredVideo.video.name) {
      console.log('filteredVideo.video.name', filteredVideo.video.name)
    }
  })

  return (
    <Center bg={'gray.200'}>
      <VStack mx="auto" padding={'60px 96px'}>
        <Heading my={5} color={PRIMARY_FONT_COLOR} fontSize="36px">
          お気に入り動画一覧
        </Heading>
        <Box mb={10} minW={'1024px'}>
          {filteredVideos.length > 0 ? (
            filteredVideos.map((filteredVideo: FavoriteVideoType) => (
              <Fragment>
                <Flex
                  alignItems="center"
                  mt={6}
                  pb={2}
                  borderBottom="1px"
                  borderColor={'blackAlpha.500'}
                ></Flex>
                {filteredVideo.video.map((video: VideoType) => (
                  <Heading size="lg" mt={4}>
                    {video.name}
                  </Heading>
                ))}
                {/* {filteredVideo?.sections?.map((section, sectionIndex) => (
                  <Fragment key={sectionIndex}>
                    <Heading size="md" mt={6} ml="28px">
                      {section.title}
                    </Heading>
                    <SimpleGrid
                      columns={3}
                      mt="16px"
                      spacingX="auto"
                      spacingY="10"
                      minW={'100%'}
                    >
                      {section.videos
                        .filter((video) => video.FavoriteVideo.length > 0)
                        .map((video, videoIndex) => (
                          <Card
                            key={videoIndex}
                            w="288px"
                            boxShadow="md"
                            borderRadius="8px"
                            margin={'auto'}
                          >
                            <CardHeader p={0}>
                              <Image
                                src={`/images/${section.course.image}`}
                                alt={`${video.name}の画像`}
                                fallbackSrc="/images/img_no_image.png"
                                width="100%"
                                height="150px"
                                objectFit={'cover'}
                              />
                            </CardHeader>
                            <CardBody px={3} py={4}>
                              <Heading fontSize="16px">{video.name}</Heading>
                              <Text
                                h="34px"
                                mt={3}
                                lineHeight="16.94px"
                                fontSize="14px"
                                color={'blackAlpha.700'}
                                overflowWrap="break-word"
                                noOfLines={2}
                              >
                                {video.description}
                              </Text>
                              <Flex justify="flex-end">
                                <Link
                                  href={`/course/${video.section.course.id}?videoId=${video.id}`}
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
                  </Fragment> */}
                {/* ))} */}
              </Fragment>
            ))
          ) : (
            <Center>
              <Text fontSize="30px" mt="10">
                お気に入りの動画はありません
              </Text>
            </Center>
          )}
        </Box>
      </VStack>
    </Center>
  )
}
