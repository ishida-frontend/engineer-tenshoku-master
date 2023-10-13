import React, { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Text,
  Stack,
  VStack,
  Button,
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
import { useCustomToast } from '../../hooks/useCustomToast'

type Errors = {
  title?: string
  content?: string
}

type CreateQuestionErrorType = { title: string; content: string }

export function QuestionForm({
  videoId,
  userId,
  createQuestionErrors,
  createQuestion,
  changeQuestionPage,
}: {
  videoId: string
  userId: string | undefined
  createQuestionErrors: CreateQuestionErrorType
  createQuestion: (createQuestionParams: {
    title: string
    content: string
  }) => Promise<void>
  changeQuestionPage: (value: string) => Promise<void>
}) {
  const [question, setQuestion] = useState({
    title: '',
    content: '',
  })

  const [errors, setErrors] = useState<Errors>({
    title: '',
    content: '',
  })

  const [questionContent, setQuestionContent] = useState<string>()

  const { showSuccessToast, showErrorToast } = useCustomToast()

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

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()
    try {
      if (question.title && question.title.length >= 15) {
        setErrors((prevErrors) => ({ ...prevErrors, title: '' }))
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          title: '※15文字以上入力してください',
        }))
      }

      if (question.content && question.content.length >= 15) {
        setErrors((prevErrors) => ({ ...prevErrors, content: '' }))
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          content: '※15文字以上入力してください',
        }))
      }

      if (question.title.length >= 15 && question.content.length >= 15) {
        await createQuestion({
          title: question.title,
          content: question.content,
        })
      }
    } catch (e) {
      throw e
    }
  }

  useEffect(() => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      title: createQuestionErrors.title[0],
      content: createQuestionErrors.content[0],
    }))
  }, [createQuestionErrors])

  return (
    <TabPanel>
      <Stack mt={'20px'}>
        <FormControl>
          <Container bg={'white'} p={'0px'} minW={'90%'}>
            <Button onClick={() => changeQuestionPage('QuestionList')}>
              全ての質問に戻る
            </Button>
            <FormControl
              isInvalid={!!errors.title}
              mt={'20px'}
              mb={'40px'}
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
              <FormErrorMessage>{errors && errors.title}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.content} mb={'20px'} bg={'white'}>
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
                {errors.content && errors.content}
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
