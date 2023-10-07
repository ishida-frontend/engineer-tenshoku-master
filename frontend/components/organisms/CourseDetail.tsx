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
  Stack,
  StackDivider,
  VStack,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tabs,
  CardBody,
  Avatar,
  Button,
} from '@chakra-ui/react'
import { CourseType } from '../../types/CourseType'
import { SectionType } from '../../types/SectionType'
import { VideoType } from '../../types/VideoType'
import { QuestionType } from 'types/QuestionType'
import ReactMarkdown from 'react-markdown'
import '../../styles/markdown.css'
import { AiOutlineUser } from 'react-icons/ai'
import { QuestionForm } from './QuestionForm'

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
        description: courseData.sections[0].videos[0].description,
        url: courseData.sections[0].videos[0].url,
      },
    },
  })

  const [questions, setQuestions] = useState<QuestionType[]>()

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

  const handleGetQuestions = async (videoId: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/question/${videoId}`,
      {
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const getQuestions: QuestionType[] = await res.json()
    setQuestions(getQuestions)
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
              <Card>
                <CardHeader bg={'gray.100'}>
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
                <CardBody bg={'white'} pl={'0px'} pr={'0px'}>
                  <Tabs isFitted colorScheme={'green'}>
                    <TabList>
                      <Tab>レッスン内容</Tab>
                      <Tab
                        onClick={() =>
                          handleGetQuestions(selectedVideo.sections.videos.id)
                        }
                      >
                        質問と回答
                      </Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <Box
                          className="markdown"
                          paddingLeft={'30px'}
                          paddingRight={'30px'}
                        >
                          <ReactMarkdown>
                            {selectedVideo.sections.videos.description}
                          </ReactMarkdown>
                        </Box>
                      </TabPanel>
                      <TabPanel
                        ml={'20px'}
                        mr={'20px'}
                        mt={'20px'}
                        borderTop={'1px solid gray'}
                      >
                        <QuestionForm />
                        {/* <Heading size="md" pb={'15px'}>
                          この動画の全ての質問
                        </Heading>
                        <Stack divider={<StackDivider />} spacing="4">
                          {questions &&
                            questions.map((question) => {
                              return (
                                <Card
                                  key={question.id}
                                  boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 3px;'}
                                  cursor={'pointer'}
                                  _hover={{
                                    bg: 'transparent',
                                  }}
                                >
                                  <HStack pl={'20px'}>
                                    <Avatar
                                      bg="blue.300"
                                      color="black"
                                      icon={<AiOutlineUser fontSize="2rem" />}
                                    />
                                    <Box overflow={'hidden'}>
                                      <CardHeader pb={'10px'}>
                                        <Box>
                                          <Heading
                                            size="md"
                                            textTransform="uppercase"
                                            isTruncated
                                          >
                                            {question.title}
                                          </Heading>
                                        </Box>
                                      </CardHeader>
                                      <CardBody pt={'0px'}>
                                        <Box>
                                          <Text fontSize="md" isTruncated>
                                            {question.content}
                                          </Text>
                                        </Box>
                                      </CardBody>
                                    </Box>
                                  </HStack>
                                </Card>
                              )
                            })}
                        </Stack> */}
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </CardBody>
              </Card>
            </Box>
          </Box>
        </Container>
      </Container>
    </VStack>
  )
}
