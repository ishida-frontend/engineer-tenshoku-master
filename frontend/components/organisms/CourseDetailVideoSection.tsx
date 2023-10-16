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
import { CreateQuestionErrorType } from '../pages/CourseDetail'

export function CourseDetailVideoSection({
  userId,
  selectedVideo,
  questionPage,
  questions,
  createQuestionErrors,
  isWatched,
  isFavorited,
  isLoading,
  handleViewingStatus,
  handleFavIconToggle,
  createQuestion,
  changeQuestionPage,
}: {
  userId: string | undefined
  selectedVideo: SelectedVideo
  questionPage: string
  questions?: QuestionType[]
  createQuestionErrors: CreateQuestionErrorType
  isWatched: { [videoId: string]: boolean }
  isFavorited: boolean
  isLoading: boolean
  handleViewingStatus: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleFavIconToggle: (event: React.MouseEvent<HTMLButtonElement>) => void
  createQuestion: (createQuestionParams: {
    title: string
    content: string
  }) => Promise<void>
  changeQuestionPage: (value: string) => Promise<void>
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
              userId={userId}
              questionPage={questionPage}
              questions={questions}
              createQuestionErrors={createQuestionErrors}
              createQuestion={createQuestion}
              changeQuestionPage={changeQuestionPage}
            />
          </CardBody>
        </Card>
      </Box>
    </Box>
  )
}
