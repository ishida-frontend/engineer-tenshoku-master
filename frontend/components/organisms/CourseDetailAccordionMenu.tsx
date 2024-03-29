import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Card,
  CardHeader,
  Center,
  Heading,
  HStack,
  Text,
  Stack,
  StackDivider,
} from '@chakra-ui/react'

import { CourseProgressBar } from '../../components/atoms/CourseProgressBar'
import { WatchedCheckCircle } from '../../components/atoms/WatchedCheckCircle'
import { CourseWithSectionsType } from '../../types/CourseType'
import { HandleChangeVideo } from '../pages/CourseDetail'
import Link from 'next/link'
import { Session } from 'next-auth'

export function CourseDetailAccordionMenu({
  session,
  completePercentage,
  checkedStatus,
  courseData,
  handleChangeVideo,
}: {
  session: Session | null
  completePercentage: number
  courseData: CourseWithSectionsType
  checkedStatus: { [videoId: string]: boolean }
  handleChangeVideo: HandleChangeVideo
}) {
  const getSectionCompletionPercentage = (
    sectionIndex: number,
    userId: string,
  ) => {
    if (sectionIndex < 0 || sectionIndex >= courseData.sections.length) {
      return 0
    }
    const section = courseData.sections[sectionIndex]
    const totalVideoCount = section.videos.length
    let watchedVideos = 0
    section.videos.forEach((video) => {
      if (
        video.ViewingStatus.some(
          (viewingStatus) =>
            viewingStatus.status === true && viewingStatus.user_id === userId,
        )
      ) {
        watchedVideos++
      }
    })
    return totalVideoCount > 0 ? (watchedVideos / totalVideoCount) * 100 : 0
  }

  return (
    <Box w={'427px'} float={'right'} bg={'white'}>
      {session?.user?.id && (
        <Center
          minH="60px"
          bg="gray.100"
          justifyContent="center"
          alignItems="center"
        >
          <Box w="403px" bg="white" borderRadius="30px">
            <CourseProgressBar completePercentage={completePercentage} />
          </Box>
        </Center>
      )}
      <Accordion allowToggle>
        {courseData.sections &&
          courseData.sections.map((section, sectionIndex) => {
            const sectionProgress = getSectionCompletionPercentage(
              sectionIndex,

              session?.user.id,

     

            )
            return (
              <AccordionItem key={section.id} borderTopWidth={'1px'}>
                <h2>
                  <AccordionButton borderBottomWidth={'2px'}>
                    <Box as="span" flex="1" textAlign="left" p={'18px 0px'}>
                      <Heading size={'sm'} mb={'12px'}>
                        <HStack>
                          <Text color={'teal.400'}>
                            SECTION {section.order}
                          </Text>
                          <Text>{section.title}</Text>
                        </HStack>
                      </Heading>
                      {session?.user?.id && (
                        <Box>
                          <Text>進捗率{sectionProgress.toFixed(0)}%</Text>
                        </Box>
                      )}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} bg={'gray.100'} padding={'18px 3px'}>
                  <Stack divider={<StackDivider />} spacing="1">
                    {section.videos &&
                      section.videos.map((video, videoIndex) => {
                        return (
                          <Link
                            key={video.id}
                            href={`/course/${courseData.id}/${video.id}`}
                          >
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
                                  {session?.user?.id && (
                                    <WatchedCheckCircle
                                      checkedStatus={
                                        checkedStatus?.[video.id] || false
                                      }
                                    />
                                  )}
                                  <Text size="sm">
                                    {video.order}. {video.name}
                                  </Text>
                                </HStack>
                              </CardHeader>
                            </Card>
                          </Link>
                        )
                      })}
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
            )
          })}
      </Accordion>
    </Box>
  )
}
