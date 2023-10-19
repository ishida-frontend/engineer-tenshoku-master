import React from 'react'
import { Tab, Tabs, TabList, TabPanel, TabPanels, Box } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import { QuestionList } from './QuestionList'
import { QuestionType } from 'types/QuestionType'
import { SelectedVideo } from '../pages/CourseDetail'
import { QuestionForm } from './QuestionForm'
import { QuestionPageType, CreateQuestionErrorType } from 'types/QuestionType'

export function VideoDetailAndQAndA({
  selectedVideo,
  userId,
  questionPage,
  questions,
  createQuestionErrors,
  createQuestion,
  changeQuestionPage,
}: {
  selectedVideo: SelectedVideo
  userId: string | undefined
  questionPage: QuestionPageType
  questions?: QuestionType[]
  createQuestionErrors: CreateQuestionErrorType
  createQuestion: (createQuestionParams: {
    title: string
    content: string
  }) => Promise<void>
  changeQuestionPage: (value: QuestionPageType) => Promise<void>
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
      </TabPanels>
    </Tabs>
  )
}
