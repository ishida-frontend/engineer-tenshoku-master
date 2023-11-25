import React from 'react'
import { Tab, Tabs, TabList, TabPanel, TabPanels, Box } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import { QuestionList } from './QuestionList'
import { QuestionDetail } from './QuestionDetail'
import { QuestionType } from '../../types/QuestionType'
import { SelectedVideo } from '../pages/CourseDetail'
import { QuestionForm } from './QuestionForm'
import { CreateQuestionErrorType } from '../../types/QuestionType'
import { QUESTION_PAGES } from '../../constants/index'
import { QuestionPageType } from '../../types/QuestionType'
import { AnswerType } from '../../types/AnswerType'
import { Session } from 'next-auth'
import { UserProfileType } from '../../types'

export function VideoDetailAndQAndA({
  selectedVideo,
  questionPage,
  questions,
  createQuestionErrors,
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
  questions?: QuestionType[]
  createQuestionErrors: CreateQuestionErrorType
  createQuestion: (createQuestionParams: {
    title: string
    content: string
  }) => Promise<void>
  changeQuestionPage: (value: QuestionPageType) => void
  answers: AnswerType[]
  session: Session | null
  selectedQuestion?: QuestionType
  createAnswer: (createAnswerParams: { comment: string }) => Promise<void>
  getAnotherUserProfile?: (value: string) => void
  anotherUserProfile?: UserProfileType
  isProfileOpen?: boolean
  closeProfileModal?: () => void
}) {
  return (
    <Tabs isFitted colorScheme={'green'}>
      <TabList>
        <Tab>レッスン内容</Tab>
        <Tab>質問と回答</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Box className="markdown" paddingLeft={'30px'} paddingRight={'30px'}>
            <ReactMarkdown>
              {selectedVideo?.sections.videos.description}
            </ReactMarkdown>
          </Box>
        </TabPanel>
        {questionPage === QUESTION_PAGES.QuestionList && (
          <QuestionList
            questions={questions}
            changeQuestionPage={changeQuestionPage}
            courseId={selectedVideo?.id}
            videoId={selectedVideo?.sections.videos.id}
            getAnotherUserProfile={getAnotherUserProfile}
            anotherUserProfile={anotherUserProfile}
            isProfileOpen={isProfileOpen}
            closeProfileModal={closeProfileModal}
          />
        )}
        {questionPage === QUESTION_PAGES.QuestionForm && (
          <QuestionForm
            session={session}
            createQuestionErrors={createQuestionErrors}
            createQuestion={createQuestion}
            changeQuestionPage={changeQuestionPage}
          />
        )}
        {questionPage === QUESTION_PAGES.QuestionDetail && (
          <QuestionDetail
            courseId={selectedVideo?.id}
            videoId={selectedVideo?.sections.videos.id}
            answers={answers}
            changeQuestionPage={changeQuestionPage}
            session={session}
            selectedQuestion={selectedQuestion}
            createAnswer={createAnswer}
          />
        )}
      </TabPanels>
    </Tabs>
  )
}
