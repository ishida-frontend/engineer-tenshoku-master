import React, { useState } from 'react'
import {
  Box,
  Button,
  Card,
  HStack,
  Text,
  TabPanel,
  Heading,
  Stack,
  Avatar,
  VStack,
  FormControl,
  Container,
  Flex,
} from '@chakra-ui/react'
import { AiOutlineUser } from 'react-icons/ai'
import { QuestionType } from 'types/QuestionType'
import { PRIMARY_FONT_COLOR } from '../../constants/colors'
import { QuestionPageType } from 'types/QuestionType'
import { AnswerType } from 'types/AnswerType'
import Link from 'next/link'
import ReactMde from 'react-mde'
import ReactMarkdown from 'react-markdown'
import 'react-mde/lib/styles/css/react-mde-all.css'
import * as Showdown from 'showdown'
import '../../styles/answerMarkdown.css'
import { Session } from 'next-auth'

export function QuestionDetail({
  userId,
  courseId,
  videoId,
  answers,
  changeQuestionPage,
  session,
  questionId,
  questions,
} // createAnswer
: {
  userId: string | undefined
  courseId?: string
  videoId?: string
  answers?: AnswerType[]
  changeQuestionPage: (value: QuestionPageType) => Promise<void>
  session: Session | null
  questionId?: string
  questions?: QuestionType[]
  // createAnswer: (createAnswerParams: { comment: string }) => Promise<void>
}) {
  // const [newAnswer, setNewAnswer] = useState({
  //   comment: '',
  // })
  const [answerComment, setAnswerComment] = useState<string>()

  const commentChange = (value: string) => {
    setAnswerComment(value)
    // setNewAnswer({ ...newAnswer, comment: value })
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

  const submitAnswer = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()
    try {
      // await createAnswer({
      //   comment: answerComment,
      // })
    } catch (e) {
      throw e
    }
  }

  // const questionData = questions?.find((question) => {
  //   question.id === questionId
  // })
  // console.log('questions:', questions)
  // console.log('questionId:', questionId)
  // console.log('questionData:', questionData)
  return (
    <>
      <TabPanel
        ml={'20px'}
        mr={'20px'}
        mt={'20px'}
        borderTop={'1px solid gray'}
      >
        {/* {questionData && (
          <Card
            key={questionData.id}
            boxShadow={'rgba(0, 0, 0, 0.24) 3px 3px 3px;'}
          >
            <HStack pl={'20px'}>
              <Avatar
                bg="blue.300"
                color="black"
                icon={<AiOutlineUser fontSize="2rem" />}
                justifyContent={'center'}
              />
              <Box overflow={'hidden'} pl={'15px'} pt={'10px'} pb={'10px'}>
                <Heading pb={'10px'} size="md" isTruncated>
                  {questionData.title}
                </Heading>
                <Text fontSize="md" isTruncated>
                  {questionData.content}
                </Text>
              </Box>
            </HStack>
          </Card>
        )} */}
        {(userId === undefined || userId.length === 0) && (
          <VStack>
            <Heading py={10} color={PRIMARY_FONT_COLOR} fontSize="36px">
              この質問の回答を見るにはログインをしてください。
            </Heading>
            <Button
              mt={'20px'}
              onClick={() => changeQuestionPage('QuestionList')}
            >
              全ての質問へ戻る
            </Button>
          </VStack>
        )}
        {userId !== undefined &&
          userId.length !== 0 &&
          (answers === undefined || answers.length === 0) && (
            <VStack>
              <Heading py={10} color={PRIMARY_FONT_COLOR} fontSize="36px">
                まだ回答はありません。
              </Heading>
              <Button
                mt={'20px'}
                onClick={() => changeQuestionPage('QuestionList')}
              >
                全ての質問へ戻る
              </Button>
            </VStack>
          )}
        {userId !== undefined &&
          userId.length !== 0 &&
          answers !== undefined &&
          answers.length !== 0 && (
            <Stack spacing="4">
              {answers.map((answer: AnswerType) => (
                <Card
                  key={answer.id}
                  boxShadow={'rgba(0, 0, 0, 0.24) 3px 3px 3px;'}
                >
                  <HStack>
                    <VStack>
                      <Box
                        minHeight={'100%'}
                        bg={'rgba(0, 0, 0, 0.04)'}
                        pt={'10px'}
                        pb={'10px'}
                        pl={'9px'}
                        pr={'9px'}
                      >
                        <Avatar
                          bg="gray.400"
                          color="white"
                          icon={<AiOutlineUser fontSize="22px" />}
                          justifyContent={'center'}
                          size={'sm'}
                        />
                        {session?.user.id !== answer.user_id &&
                          session?.user.isAdmin === true && (
                            <Text color={PRIMARY_FONT_COLOR} fontSize={'14px'}>
                              講師
                            </Text>
                          )}
                      </Box>
                    </VStack>
                    <Box
                      pl={'15px'}
                      pt={'10px'}
                      pb={'10px'}
                      className="markdown"
                    >
                      <ReactMarkdown>{answer.comment}</ReactMarkdown>
                    </Box>
                  </HStack>
                </Card>
              ))}
              <Link href={`/course/${courseId}/?videoId=${videoId}`}>
                <Button
                  mt={'20px'}
                  onClick={() => changeQuestionPage('QuestionList')}
                >
                  全ての質問へ戻る
                </Button>
              </Link>
              <FormControl mt={'40px'}>
                <FormControl
                  isInvalid={!!answerComment}
                  mb={'20px'}
                  bg={'white'}
                >
                  <Container ml={'0px'} pb={'10px'} pl={'0px'}>
                    <Text fontWeight={'bold'}>コメント内容</Text>
                  </Container>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Box w={'50%'} mr={'5'}>
                      <ReactMde
                        maxEditorHeight={250}
                        value={answerComment}
                        onChange={commentChange}
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
                      <ReactMarkdown>{answerComment}</ReactMarkdown>
                    </Box>
                  </Box>
                </FormControl>

                <VStack>
                  <Button
                    onClick={submitAnswer}
                    m={'10px 0'}
                    w={'100%'}
                    colorScheme="teal"
                  >
                    コメントする
                  </Button>
                </VStack>
              </FormControl>
            </Stack>
          )}
      </TabPanel>
    </>
  )
}
