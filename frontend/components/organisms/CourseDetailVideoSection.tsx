import React from 'react'
import {
  AspectRatio,
  Box,
  Card,
  CardHeader,
  HStack,
  Text,
  Spacer,
} from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'

import { WatchedButton } from 'components/atoms/WatchedButton'
import { SelectedVideo } from '../pages/CourseDetail'

export function CourseDetailVideoSection({
  userId,
  isWatched,
  setIsWatched,
  selectedVideo,
  handleViewingStatus,
}: {
  userId: string | undefined
  isWatched: boolean
  setIsWatched: React.Dispatch<React.SetStateAction<boolean>>
  selectedVideo: SelectedVideo
  handleViewingStatus: (event: React.MouseEvent<HTMLButtonElement>) => void
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
              {userId && (
                <WatchedButton
                  isWatched={isWatched}
                  setIsWatched={setIsWatched}
                  handleViewingStatus={handleViewingStatus}
                />
              )}
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
