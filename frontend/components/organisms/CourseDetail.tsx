'use client'
import React, { useEffect, useState } from 'react'
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
  Stack,
  StackDivider,
  VStack,
} from '@chakra-ui/react'
import { SelectedVideo } from '../../types/CourseDetail'
import { CourseType } from '../../types/CourseType'
import { SectionType } from '../../types/SectionType'
import { VideoType } from '../../types/VideoType'

type CourseDetailPropsType = CourseType & {
  sections: (SectionType & { videos: VideoType[] })[]
}

export function CourseDetail({
  courseData,
}: {
  courseData: CourseDetailPropsType
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
                    <AccordionItem borderTopWidth={'1px'}>
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
                                  boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 3px;'}
                                  cursor={'pointer'}
                                  _hover={{
                                    bg: 'transparent',
                                  }}
                                  onClick={(e: any) =>
                                    handleChangeVideo(sectionIndex, videoIndex)
                                  }
                                >
                                  <CardHeader>
                                    <Text size="sm">
                                      {video.order}. {video.name}
                                    </Text>
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
                  </HStack>
                </CardHeader>
              </Card>
            </Box>
          </Box>
        </Container>
      </Container>
    </VStack>
  )
}
