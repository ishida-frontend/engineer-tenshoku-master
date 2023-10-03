import React from 'react'
import {
  AspectRatio,
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
  Spacer,
  Stack,
  StackDivider,
} from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'

import { WatchedCheckCircle } from 'components/atoms/WatchedCheckCircle'
import { CourseDetailPropsType } from '../pages/CourseDetail'
import { SelectedVideo } from '../pages/CourseDetail'
import { HandleChangeVideo } from '../pages/CourseDetail'

export function CourseDetailVideoSection({
  isWatched,
  setIsWatched,
  selectedVideo,
  setSelectedVideo,
}: {
  isWatched: boolean
  setIsWatched: React.Dispatch<React.SetStateAction<boolean>>
  selectedVideo: SelectedVideo
  setSelectedVideo: React.Dispatch<React.SetStateAction<SelectedVideo>>
}) {
  return (
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
              <Text pl={'40px'}>{selectedVideo.sections.videos.order}.</Text>
              <Text pl={'3px'}>{selectedVideo.sections.videos.name}</Text>
              <Spacer />
              {/* {status.isAuthenticated &&
                        <WatchedButton
                          viewingStatus={viewingStatus}
                          toggleViewingStatus={toggleViewingStatus}
                        />,
                      )} */}
            </HStack>
          </CardHeader>
        </Card>
      </Box>
      <Box className="markdown" paddingLeft={'30px'} paddingRight={'30px'}>
        <ReactMarkdown>
          {selectedVideo.sections.videos.description}
        </ReactMarkdown>
      </Box>
    </Box>
  )
}
