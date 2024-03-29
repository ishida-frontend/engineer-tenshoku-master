import React, { useState } from 'react'
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
  Heading,
} from '@chakra-ui/react'
import ReactMde from 'react-mde'
import ReactMarkdown from 'react-markdown'
import 'react-mde/lib/styles/css/react-mde-all.css'
import '../../styles/markdown.css'
import { PRIMARY_FONT_COLOR } from '../../constants/colors'
import { QUESTION_PAGES } from '../../constants/index'
import { QuestionPageType } from '../../types/QuestionType'
import { converter } from '../../utils/markdown'
import { useCustomToast } from '../../hooks/useCustomToast'
import { Session } from 'next-auth'

type CreateQuestionErrorType = { title: string; content: string }

export function QuestionForm({
  session,
  createQuestionErrors,
  createQuestion,
  changeQuestionPage,
}: {
  session: Session | null
  createQuestionErrors: CreateQuestionErrorType
  createQuestion: (createQuestionParams: {
    title: string
    content: string
  }) => Promise<void>
  changeQuestionPage: (value: QuestionPageType) => void
}) {
  const [question, setQuestion] = useState({
    title: '',
    content: '',
  })
  const { showErrorToast } = useCustomToast()

  const [questionContent, setQuestionContent] = useState<string>()

  const contentChange = (value: string) => {
    setQuestionContent(value)
    setQuestion({ ...question, content: value })
  }

  const [selectedEditorTab, setSelectedEditorTab] = useState<
    'write' | 'preview'
  >('write')

  const submitQuestion = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()
    try {
      await createQuestion({
        title: question.title,
        content: question.content,
      })
    } catch (e) {
      showErrorToast('質問の投稿に失敗しました')
    }
  }

  return (
    <TabPanel>
      <Stack mt={'20px'}>
        <FormControl>
          <Container bg={'white'} p={'0px'} minW={'90%'}>
            <Button
              onClick={() => changeQuestionPage(QUESTION_PAGES.QuestionList)}
            >
              全ての質問に戻る
            </Button>
            {session.user.id === undefined && (
              <VStack>
                <Heading py={10} color={PRIMARY_FONT_COLOR} fontSize="36px">
                  質問をするには ログインまたは新規会員登録を行なってください
                </Heading>
              </VStack>
            )}
            {session.user.id && (
              <Box>
                <FormControl
                  isInvalid={!!createQuestionErrors.title}
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
                  <FormErrorMessage>
                    {createQuestionErrors && createQuestionErrors.title}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!createQuestionErrors.content}
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
                    {createQuestionErrors.content &&
                      createQuestionErrors.content}
                  </FormErrorMessage>
                </FormControl>

                <VStack>
                  <Button
                    onClick={submitQuestion}
                    m={'20px 0'}
                    w={'100%'}
                    colorScheme="teal"
                  >
                    公開
                  </Button>
                </VStack>
              </Box>
            )}
          </Container>
        </FormControl>
      </Stack>
    </TabPanel>
  )
}
