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
  Link
} from '@chakra-ui/react'

import { FavButton } from '../../components/atoms/FavButton'
import { WatchedButton } from '../../components/atoms/WatchedButton'
import { SelectedVideo } from '../pages/CourseDetail'
import { QuestionType } from '../../types/QuestionType'
import { VideoDetailAndQAndA } from './VideoDetailAndQAndA'
import { CreateQuestionErrorType } from '../../types/QuestionType'
import { QuestionPageType } from '../../types/QuestionType'
import { AnswerType } from '../../types/AnswerType'
import { Session } from 'next-auth'
import { UserProfileType } from '../../types'
import { FaSquareXTwitter } from "react-icons/fa6";
import { CiLink } from "react-icons/ci";
import { useCustomToast } from '../../hooks/useCustomToast'


export function CourseDetailVideoSection({
  selectedVideo,
  questionPage,
  questions,
  createQuestionErrors,
  watchedStatus,
  favoritedStatus,
  isWatchingLoading,
  isFavoriteLoading,
  handleViewingStatus,
  handleFavoriteVideoStatus,
  createQuestion,
  changeQuestionPage,
  answers,
  session,
  selectedQuestion,
  createAnswer,
  getAnotherUserProfile,
  anotherUserProfile,
  isProfileOpen,
  closeProfileModal,
}: {
  selectedVideo: SelectedVideo | null
  questionPage: QuestionPageType
  questions: QuestionType[] | undefined
  createQuestionErrors: CreateQuestionErrorType
  watchedStatus: { [videoId: string]: boolean }
  favoritedStatus: { [videoId: string]: boolean }
  isWatchingLoading: boolean
  isFavoriteLoading: boolean
  createQuestion: (createQuestionParams: {
    title: string
    content: string
  }) => Promise<void>
  changeQuestionPage: (value: QuestionPageType) => void
  handleViewingStatus: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleFavoriteVideoStatus: (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void
  answers: AnswerType[]
  session: Session | null
  selectedQuestion?: QuestionType
  createAnswer: (createAnswerParams: { comment: string }) => Promise<void>
  getAnotherUserProfile?: (value: string) => void
  anotherUserProfile?: UserProfileType
  isProfileOpen?: boolean
  closeProfileModal?: () => void
}) {

// 動画のURL、タイトル取得
const shareUrl = location.href;
const shareTitle = selectedVideo?.sections.videos.name;

// 動画のURLをクリップボードにコピー
const { showSuccessToast, showErrorToast } = useCustomToast()
function copyUrlToClipboard(shareUrl){
  navigator.clipboard.writeText(shareUrl)
  .then(function(){
    showSuccessToast('動画のURLをクリップボードにコピーしました!')
  }, function() {
  showErrorToast('動画のURLのコピーに失敗しました')
}
  )}

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
              {session?.user?.id && selectedVideo && (
                <>
                  <WatchedButton
                    watchedStatus={
                      watchedStatus?.[selectedVideo.sections.videos.id] || false
                    }
                    loadingState={isWatchingLoading}
                    handleViewingStatus={handleViewingStatus}
                  />

                  <FavButton
                    favoritedStatus={
                      favoritedStatus?.[selectedVideo.sections.videos.id] ||
                      false
                    }
                    loadingState={isFavoriteLoading}
                    handleFavoriteVideoStatus={handleFavoriteVideoStatus}
                  />
                </>
              )}

      {/* Twitterにシェア */}
      <>      
        <Link
        href={`http://twitter.com/share?url=${shareUrl}&text=エンジニア転職マスター講座で${shareTitle}を学習中です！&via=issiyrun`}
        target="_blank"
        _hover={{opacity:0.5}}
        >
          <FaSquareXTwitter size={36} />
        </Link>
      </>

      {/* URLコピー */}
      <Link _hover={{opacity:0.5}}>
        <CiLink size={36} onClick={() => copyUrlToClipboard(shareUrl)} />
      </Link>

            </HStack>
          </CardHeader>
          <CardBody bg={'white'} pl={'0px'} pr={'0px'}>
            <VideoDetailAndQAndA
              selectedVideo={selectedVideo}
              questionPage={questionPage}
              questions={questions}
              createQuestionErrors={createQuestionErrors}
              createQuestion={createQuestion}
              changeQuestionPage={changeQuestionPage}
              answers={answers}
              session={session}
              selectedQuestion={selectedQuestion}
              createAnswer={createAnswer}
              getAnotherUserProfile={getAnotherUserProfile}
              anotherUserProfile={anotherUserProfile}
              isProfileOpen={isProfileOpen}
              closeProfileModal={closeProfileModal}
            />
          </CardBody>
        </Card>
      </Box>
    </Box>
  )
}
