import React from 'react'
import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardHeader,
  HStack,
  Text,
  Spacer,
  CardBody,
} from '@chakra-ui/react'

import { FavIcon } from 'components/atoms/FavIcon'
import { WatchedButton } from 'components/atoms/WatchedButton'
import { SelectedVideo } from '../pages/CourseDetail'
import { QuestionType } from 'types/QuestionType'
import { VideoDetailAndQAndA } from './VideoDetailAndQAndA'

export type handleGetQuestions = (videoId: string) => void

export function CourseDetailVideoSection({
  userId,
  selectedVideo,
  questions,
  isWatched,
  isFavorited,
  isLoading,
  handleViewingStatus,
  handleFavIconToggle,
  handleGetQuestions,
}: {
  userId: string | undefined
  selectedVideo: SelectedVideo
  questions: QuestionType[] | undefined
  isWatched: { [videoId: string]: boolean }
  isFavorited: boolean
  isLoading: boolean
  handleViewingStatus: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleFavIconToggle: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleGetQuestions: handleGetQuestions
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
                <>
                  <WatchedButton
                    isWatched={
                      isWatched?.[selectedVideo.sections.videos.id] || false
                    }
                    isLoading={isLoading}
                    handleViewingStatus={handleViewingStatus}
                  />
                  <Button
                    onClick={handleFavIconToggle}
                    size="24px"
                    variant="unstyled"
                  >
                    <FavIcon isFavorited={isFavorited} />
                  </Button>
                </>
              )}
            </HStack>
          </CardHeader>
          <CardBody bg={'white'} pl={'0px'} pr={'0px'}>
            <VideoDetailAndQAndA
              selectedVideo={selectedVideo}
              questions={questions}
              handleGetQuestions={handleGetQuestions}
            />
          </CardBody>
        </Card>
      </Box>
    </Box>
  )
}
