import React from 'react'
import { Tab, Tabs, TabList, TabPanel, TabPanels, Box } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import { QuestionList } from './QuestionList'
import { QuestionType } from 'types/QuestionType'
import { SelectedVideo } from '../pages/CourseDetail'

export function VideoDetailAndQAndA({
  selectedVideo,
  questions,
  handleGetQuestions,
}: {
  selectedVideo: SelectedVideo | null
  questions: QuestionType[] | undefined
  handleGetQuestions: (videoId: string) => void
}) {
  return (
    <Tabs isFitted colorScheme={'green'}>
      <TabList>
        <Tab>レッスン内容</Tab>
        <Tab
          onClick={() => {
            if (selectedVideo) {
              handleGetQuestions(selectedVideo.sections.videos.id)
            }
          }}
        >
          質問と回答
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Box className="markdown" paddingLeft={'30px'} paddingRight={'30px'}>
            <ReactMarkdown>
              {selectedVideo?.sections.videos.description}
            </ReactMarkdown>
          </Box>
        </TabPanel>
        <QuestionList questions={questions} />
      </TabPanels>
    </Tabs>
  )
}
