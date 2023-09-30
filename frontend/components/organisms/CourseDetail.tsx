'use client'
import React, { useState } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  AspectRatio,
  Box,
  Card,
  CardHeader,
  Container,
  Heading,
  HStack,
  Text,
  Spacer,
  Stack,
  StackDivider,
  VStack,
} from '@chakra-ui/react'
import { GoCheckCircleFill, GoCircle } from 'react-icons/go'

import { CourseType } from '../../types/CourseType'
import { SectionType } from '../../types/SectionType'
import { VideoType } from '../../types/VideoType'
import { WatchedButton } from 'components/atoms/WatchedButton'
import { WatchedCheckCircle } from 'components/atoms/WatchedCheckCircle'
import { VideoDetailAndQAndA } from './VideoDetailAndQAndA'

type CourseDetailPropsType = CourseType & {
  sections: (SectionType & { videos: VideoType[] })[]
}

type SelectedVideo = {
  id: string
  sections: {
    id: string
    order: number
    videos: {
      id: string
      order: number
      name: string
      description: string
      url: string
    }
  }
}

export function CourseDetail({
  isLogin,
  courseData,
  userId,
}: {
  isLogin: boolean
  courseData: CourseDetailPropsType
  userId: string
}) {
  const [selectedVideo, setSelectedVideo] = useState<SelectedVideo>({
    id: courseData.id,
    sections: {
      id: courseData.sections[0].id,
      order: courseData.sections[0].order,
      videos: {
        id: courseData.sections[0].videos[0].id,
        order: courseData.sections[0].videos[0].order,
        name: courseData.sections[0].videos[0].name,
        description: courseData.sections[0].videos[0].description,
        url: courseData.sections[0].videos[0].url,
      },
    },
  })

  const handleChangeVideo = (sectionIndex: number, videoIndex: number) => {
    setSelectedVideo({
      id: courseData.id,
      sections: {
        id: courseData.sections[sectionIndex].id,
        order: courseData.sections[sectionIndex].order,
        videos: {
          id: courseData.sections[sectionIndex].videos[videoIndex].id,
          order: courseData.sections[sectionIndex].videos[videoIndex].order,
          name: courseData.sections[sectionIndex].videos[videoIndex].name,
          description:
            courseData.sections[sectionIndex].videos[videoIndex].description,
          url: courseData.sections[sectionIndex].videos[videoIndex].url,
        },
      },
    })
  }

  return (
    <VStack minH={'100vh'} bg={'gray.100'}>
      <Container minWidth={'100%'} padding={'0px'} bg={'white'}>
        <Container
          minWidth={'100%'}
          padding={'0px'}
          overflow={'hidden'}
          bg={'gray.100'}
        >
          <Box w={'427px'} float={'right'} bg={'white'}>
            <Accordion allowToggle>
              {courseData.sections &&
                courseData.sections.map((section, sectionIndex) => {
                  return (
                    <AccordionItem key={section.id} borderTopWidth={'1px'}>
                      <h2>
                        <AccordionButton borderBottomWidth={'2px'}>
                          <Box
                            as="span"
                            flex="1"
                            textAlign="left"
                            p={'18px 0px'}
                          >
                            <Heading size={'sm'}>
                              <HStack>
                                <Text color={'teal.400'}>
                                  SECTION {section.order}
                                </Text>
                                <Text>{section.title}</Text>
                              </HStack>
                            </Heading>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel
                        pb={4}
                        bg={'gray.100'}
                        padding={'18px 3px'}
                      >
                        <Stack divider={<StackDivider />} spacing="1">
                          {section.videos &&
                            section.videos.map((video, videoIndex) => {
                              return (
                                <Card
                                  key={video.id}
                                  boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 3px;'}
                                  cursor={'pointer'}
                                  _hover={{
                                    bg: 'transparent',
                                  }}
                                  onClick={() =>
                                    handleChangeVideo(sectionIndex, videoIndex)
                                  }
                                >
                                  <CardHeader>
                                    <HStack>
                                      {isLogin && (
                                        <WatchedCheckCircle
                                          userId={userId}
                                          videoId={
                                            selectedVideo.sections.videos.id
                                          }
                                        />
                                      )}
                                      <Text size="sm">
                                        {video.order}. {video.name}
                                      </Text>
                                    </HStack>
                                  </CardHeader>
                                </Card>
                              )
                            })}
                        </Stack>
                      </AccordionPanel>
                    </AccordionItem>
                  )
                })}
            </Accordion>
          </Box>
          <Box bg={'white'} mr={'430px'} overflow={'hidden'}>
            <AspectRatio ratio={16 / 9}>
              <iframe
                title="selectedVideo"
                src={selectedVideo.sections.videos.url}
                allowFullScreen
              />
            </AspectRatio>
            <Box bg={'white'} padding={'20px'}>
              <Card bg={'gray.100'}>
                <CardHeader>
                  <HStack fontSize={'xl'}>
                    <Text color={'teal.400'} fontWeight={'bold'}>
                      SECTION {selectedVideo.sections.order}
                    </Text>
                    <Text pl={'40px'}>
                      {selectedVideo.sections.videos.order}.
                    </Text>
                    <Text pl={'3px'}>{selectedVideo.sections.videos.name}</Text>
                    <Spacer />
                    {/* {console.log('isLogin:', isLogin)}
                    {console.log('userId:', userId)}
                    {console.log('videoId:', selectedVideo.sections.videos.id)} */}
                    {isLogin && (
                      <WatchedButton
                        userId={userId}
                        videoId={selectedVideo.sections.videos.id}
                      />
                    )}
                  </HStack>
                </CardHeader>
              </Card>
            </Box>
            <VideoDetailAndQAndA
              videoDescription={selectedVideo.sections.videos.description}
            />
          </Box>
        </Container>
      </Container>
    </VStack>
  )
}
