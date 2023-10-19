import React from 'react'
import {
  AspectRatio,
  Box,
  Card,
  CardHeader,
  HStack,
  Text,
  Spacer,
  CardBody,
} from '@chakra-ui/react'

import { FavButton } from 'components/atoms/FavButton'
import { WatchedButton } from 'components/atoms/WatchedButton'
import { SelectedVideo } from '../pages/CourseDetail'
import { QuestionType } from 'types/QuestionType'
import { VideoDetailAndQAndA } from './VideoDetailAndQAndA'

export function CourseDetailVideoSection({
  userId,
  selectedVideo,
  questions,
  watchedStatus,
  favoritedStatus,
  loadingStates,
  handleViewingStatus,
  handleFavoriteVideoStatus,
  handleGetQuestions,
}: {
  userId: string | undefined
  selectedVideo: SelectedVideo | null
  questions: QuestionType[] | undefined
  watchedStatus: { [videoId: string]: boolean }
  favoritedStatus: { [videoId: string]: boolean }
  loadingStates: { [key: string]: boolean }
  handleViewingStatus: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleFavoriteVideoStatus: (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void
  handleGetQuestions: (videoId: string) => void
}) {
  return (
    <Box bg={'white'} mr={'430px'} overflow={'hidden'}>
      <AspectRatio ratio={16 / 9}>
        <iframe
          title="selectedVideo"
          src={selectedVideo?.sections.videos.url}
          allowFullScreen
        />
      </AspectRatio>
      <Box bg={'white'} padding={'20px'}>
        <Card bg={'gray.100'}>
          <CardHeader>
            <HStack fontSize={'xl'}>
              <Text color={'teal.400'} fontWeight={'bold'}>
                SECTION {selectedVideo?.sections.order}
              </Text>
              <Text pl={'40px'}>{selectedVideo?.sections.videos.order}.</Text>
              <Text pl={'3px'}>{selectedVideo?.sections.videos.name}</Text>
              <Spacer />
              {userId && selectedVideo && (
                <>
                  <WatchedButton
                    watchedStatus={
                      watchedStatus?.[selectedVideo.sections.videos.id] || false
                    }
                    loadingState={loadingStates.watching}
                    handleViewingStatus={handleViewingStatus}
                  />

                  <FavButton
                    favoritedStatus={
                      favoritedStatus?.[selectedVideo.sections.videos.id] ||
                      false
                    }
                    loadingState={loadingStates.favoriting}
                    handleFavoriteVideoStatus={handleFavoriteVideoStatus}
                  />
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
