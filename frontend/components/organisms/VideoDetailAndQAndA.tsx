import React from 'react'
import { Tab, Tabs, TabList, TabPanel, TabPanels, Box } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import { QuestionList } from './QuestionList'
import { QuestionType } from 'types/QuestionType'
import { SelectedVideo } from '../pages/CourseDetail'
import { QuestionForm } from './QuestionForm'

export type handleGetQuestions = (videoId: string) => void

export function VideoDetailAndQAndA({
  selectedVideo,
  questions,
  handleGetQuestions,
}: {
  selectedVideo: SelectedVideo
  questions: QuestionType[] | undefined
  handleGetQuestions: handleGetQuestions
}) {
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
        <QuestionForm />
      </TabPanels>
    </Tabs>
  )
}
