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
  Heading,
  HStack,
  Text,
  Stack,
  StackDivider,
} from '@chakra-ui/react'

import { WatchedCheckCircle } from 'components/atoms/WatchedCheckCircle'
import { CourseDetailPropsType } from '../pages/CourseDetail'
import { HandleChangeVideo } from '../pages/CourseDetail'

export function CourseDetailAccordionMenu({
  isWatched,
  courseData,
  handleChangeVideo,
}: {
  isWatched: { [videoId: string]: boolean }
  courseData: CourseDetailPropsType
  handleChangeVideo: HandleChangeVideo
}) {
  return (
    <Box w={'427px'} float={'right'} bg={'white'}>
      <Accordion allowToggle>
        {courseData.sections &&
          courseData.sections.map((section, sectionIndex) => {
            return (
              <AccordionItem key={section.id} borderTopWidth={'1px'}>
                <h2>
                  <AccordionButton borderBottomWidth={'2px'}>
                    <Box as="span" flex="1" textAlign="left" p={'18px 0px'}>
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
                <AccordionPanel pb={4} bg={'gray.100'} padding={'18px 3px'}>
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
                                <WatchedCheckCircle
                                  isWatched={isWatched[video.id] || false}
                                />
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
  )
}
