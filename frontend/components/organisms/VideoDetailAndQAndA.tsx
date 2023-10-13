import React from 'react'
import { Tab, Tabs, TabList, TabPanel, TabPanels, Box } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import { QuestionList } from './QuestionList'
import { QuestionType } from 'types/QuestionType'
import { SelectedVideo } from '../pages/CourseDetail'
import { QuestionForm } from './QuestionForm'

type CreateQuestionErrorType = { title: string; content: string }

export function VideoDetailAndQAndA({
  selectedVideo,
  userId,
  questions,
  createQuestionErrors,
  handleGetQuestions,
  createQuestion,
}: {
  selectedVideo: SelectedVideo
  userId: string | undefined
  questions?: QuestionType[]
  createQuestionErrors?: CreateQuestionErrorType
  handleGetQuestions: (videoId: string) => void
  createQuestion: (createQuestionParams: {
    title: string
    content: string
  }) => Promise<void>
}) {
  console.log('createQuestion:', createQuestion)
  console.log('createQuestionErrors:', createQuestionErrors)
  return (
    <Tabs isFitted colorScheme={'green'}>
      <TabList>
        <Tab>レッスン内容</Tab>
        <Tab
          onClick={() => handleGetQuestions(selectedVideo.sections.videos.id)}
        >
          質問と回答
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Box className="markdown" paddingLeft={'30px'} paddingRight={'30px'}>
            <ReactMarkdown>
              {selectedVideo.sections.videos.description}
            </ReactMarkdown>
          </Box>
        </TabPanel>
        {/* <QuestionList questions={questions} /> */}
        <QuestionForm
          videoId={selectedVideo.sections.videos.id}
          userId={userId}
          createQuestionErrors={createQuestionErrors}
          createQuestion={createQuestion}
        />
      </TabPanels>
    </Tabs>
  )
}
