import React from 'react'
import { Tab, Tabs, TabList, TabPanel, TabPanels, Box } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import { QuestionList } from './QuestionList'
import { QuestionDetail } from './QuestionDetail'
import { QuestionType } from 'types/QuestionType'
import { SelectedVideo } from '../pages/CourseDetail'
import { QuestionForm } from './QuestionForm'
import { QuestionPageType, CreateQuestionErrorType } from 'types/QuestionType'
import { AnswerType } from 'types/AnswerType'
import { Session } from 'next-auth'

export function VideoDetailAndQAndA({
  selectedVideo,
  userId,
  questionPage,
  questions,
  createQuestionErrors,
  createQuestion,
  changeQuestionPage,
  answers,
  session,
  questionId,
}: {
  selectedVideo: SelectedVideo | null
  userId: string | undefined
  questionPage: QuestionPageType
  questions?: QuestionType[]
  createQuestionErrors: CreateQuestionErrorType
  createQuestion: (createQuestionParams: {
    title: string
    content: string
  }) => Promise<void>
  changeQuestionPage: (value: QuestionPageType) => Promise<void>
  answers: AnswerType[]
  session: Session | null
  questionId?: string
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
        {questionPage === 'QuestionList' && (
          <QuestionList
            questions={questions}
            changeQuestionPage={changeQuestionPage}
            courseId={selectedVideo?.id}
            videoId={selectedVideo?.sections.videos.id}
          />
        )}
        {questionPage === 'QuestionForm' && (
          <QuestionForm
            userId={userId}
            createQuestionErrors={createQuestionErrors}
            createQuestion={createQuestion}
            changeQuestionPage={changeQuestionPage}
          />
        )}
        {questionPage === 'QuestionDetail' && (
          <QuestionDetail
            userId={userId}
            courseId={selectedVideo?.id}
            videoId={selectedVideo?.sections.videos.id}
            answers={answers}
            changeQuestionPage={changeQuestionPage}
            session={session}
            questionId={questionId}
            questions={questions}
          />
        )}
      </TabPanels>
    </Tabs>
  )
}
