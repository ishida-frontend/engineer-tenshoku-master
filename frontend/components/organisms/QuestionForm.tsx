import React, { useState } from 'react'
import {
  Box,
  Container,
  Text,
  Stack,
  VStack,
  Button,
  Link,
  FormControl,
  Flex,
  Input,
  FormErrorMessage,
  TabPanel,
} from '@chakra-ui/react'
import ReactMde from 'react-mde'
import ReactMarkdown from 'react-markdown'
import 'react-mde/lib/styles/css/react-mde-all.css'
import * as Showdown from 'showdown'
import '../../styles/markdown.css'

type Errors = {
  title?: string[]
  content?: string[]
}

export function QuestionForm({
  videoId,
  userId,
}: {
  videoId: string
  userId: string | undefined
}) {
  const [question, setQuestion] = useState({
    title: '',
    content: '',
  })

  const [errors, setErrors] = useState<Errors>({
    title: [''],
    content: [''],
  })

  const [questionContent, setQuestionContent] = useState<string>()

  const contentChange = (value: string) => {
    setQuestionContent(value)
    setQuestion({ ...question, content: value })
  }

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  })

  const [selectedEditorTab, setSelectedEditorTab] = useState<
    'write' | 'preview'
  >('write')

  const fetcher = async () => {
    console.log('question.title:', question.title)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/question/create`,
      {
        method: 'POST',
        body: JSON.stringify({
          title: question.title,
          content: question.content,
          video_id: videoId,
          user_id: userId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    return res.json()
  }

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()
    try {
      const res = await fetcher()
      return res.json()
    } catch (e) {
      throw e
    }
  }
  console.log('question:', question)
  console.log('videoId:', videoId)
  console.log('userId:', userId)
  return (
    <TabPanel>
      <Stack mt={'20px'}>
        <FormControl>
          <Container bg={'white'} p={'0px'} minW={'90%'}>
            <Link href="/course/${course_id}">
              <Button>全ての質問に戻る</Button>
            </Link>
            <FormControl
              isInvalid={!!errors.title?.[0]}
              mt={'20px'}
              mb={'20px'}
              bg={'white'}
              h={'80px'}
            >
              <Container ml={'0px'} pb={'10px'} pl={'0px'}>
                <Flex>
                  <Text fontWeight={'bold'}>質問タイトル</Text>
                  <Text color="teal">(必須)</Text>
                </Flex>
              </Container>
              <Input
                type="text"
                name="title"
                value={question.title}
                onChange={(e) =>
                  setQuestion({ ...question, title: e.target.value })
                }
                placeholder={
                  '動画の15:00のところで型に関するエラーが出ています。'
                }
              />
              <FormErrorMessage>
                {errors.title && errors.title[0]}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={!!errors.content?.[0]}
              mb={'20px'}
              bg={'white'}
            >
              <Container ml={'0px'} pb={'10px'} pl={'0px'}>
                <Flex>
                  <Text fontWeight={'bold'}>質問の内容</Text>
                  <Text color="teal">(必須)</Text>
                </Flex>
              </Container>
              <Box display={'flex'} justifyContent={'space-between'}>
                <Box w={'50%'} mr={'5'}>
                  <ReactMde
                    maxEditorHeight={250}
                    value={questionContent}
                    onChange={contentChange}
                    selectedTab={selectedEditorTab}
                    onTabChange={setSelectedEditorTab}
                    generateMarkdownPreview={(markdown) =>
                      Promise.resolve(converter.makeHtml(markdown))
                    }
                    toolbarCommands={[
                      ['header', 'bold', 'italic'],
                      ['link', 'quote', 'code'],
                      ['unordered-list', 'ordered-list'],
                    ]}
                  />
                </Box>
                <Box
                  w={'50%'}
                  maxH={'250px'}
                  overflow={'scroll'}
                  bg={'white'}
                  border={'1px solid gray'}
                  borderRadius={'4px'}
                  paddingLeft={'28px'}
                  paddingRight={'20px'}
                  className="markdown"
                >
                  <ReactMarkdown>{questionContent}</ReactMarkdown>
                </Box>
              </Box>
              <FormErrorMessage>
                {errors.content && errors.content[0]}
              </FormErrorMessage>
            </FormControl>

            <VStack>
              <Button
                onClick={handleSubmit}
                m={'20px 0'}
                w={'100%'}
                colorScheme="teal"
              >
                公開
              </Button>
            </VStack>
          </Container>
        </FormControl>
      </Stack>
    </TabPanel>
  )
}
