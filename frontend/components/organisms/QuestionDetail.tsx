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
} from '@chakra-ui/react'
import { AiOutlineUser } from 'react-icons/ai'
import { QuestionType } from 'types/QuestionType'
import { PRIMARY_FONT_COLOR } from '../../constants/colors'
import { QUESTION_PAGES } from 'constants/index'
import { QuestionPageType } from 'types/QuestionType'
import { AnswerType } from 'types/AnswerType'
import Link from 'next/link'
import ReactMde from 'react-mde'
import ReactMarkdown from 'react-markdown'
import 'react-mde/lib/styles/css/react-mde-all.css'
import '../../styles/markdown.css'
import { Session } from 'next-auth'
import { converter } from 'utils/markdown'

export function QuestionDetail({
  userId,
  courseId,
  videoId,
  answers,
  changeQuestionPage,
  session,
  selectedQuestion,
  createAnswer,
}: {
  userId: string | undefined
  courseId?: string
  videoId?: string
  answers?: AnswerType[]
  changeQuestionPage: (value: QuestionPageType) => void
  session: Session | null
  selectedQuestion?: QuestionType
  createAnswer: (createAnswerParams: { comment: string }) => Promise<void>
}) {
  const [answerComment, setAnswerComment] = useState<string>('')

  const [selectedEditorTab, setSelectedEditorTab] = useState<
    'write' | 'preview'
  >('write')

  return (
    <TabPanel m={'20px'} borderTop={'1px solid gray'}>
      {selectedQuestion && (
        <Card
          key={selectedQuestion.id}
          boxShadow={'rgba(0, 0, 0, 0.24) 3px 3px 3px;'}
          mb={'15px'}
        >
          <HStack>
            <Box p={'10px 9px'}>
              <Avatar
                bg="gray.400"
                color="white"
                icon={<AiOutlineUser fontSize="22px" />}
                justifyContent={'center'}
                size={'sm'}
              />
            </Box>

            <Box p={'10px 15px'}>
              <Heading pb={'10px'} size="md">
                {selectedQuestion.title}
              </Heading>
              <Text fontSize="md">{selectedQuestion.content}</Text>
            </Box>
          </HStack>
        </Card>
      )}
      {!userId && (
        <VStack>
          <Heading py={10} color={PRIMARY_FONT_COLOR} fontSize="36px">
            この質問の回答を見るにはログインをしてください。
          </Heading>
          <Button
            mt={'20px'}
            onClick={() => changeQuestionPage(QUESTION_PAGES.QuestionList)}
          >
            全ての質問へ戻る
          </Button>
        </VStack>
      )}
      {userId && !answers && (
        <VStack>
          <Heading py={10} color={PRIMARY_FONT_COLOR} fontSize="36px">
            まだ回答はありません。
          </Heading>
          <Button
            mt={'20px'}
            onClick={() => changeQuestionPage(QUESTION_PAGES.QuestionList)}
          >
            全ての質問へ戻る
          </Button>
        </VStack>
      )}
      {userId && answers && (
        <Stack spacing="4">
          {answers.map((answer: AnswerType) => (
            <Card
              key={answer.id}
              boxShadow={'rgba(0, 0, 0, 0.24) 3px 3px 3px;'}
            >
              <HStack>
                <VStack>
                  {answer.user_id !== selectedQuestion?.user_id && (
                    <Stack
                      minHeight={'100%'}
                      bg={'rgba(0, 0, 0, 0.04)'}
                      p={'10px 9px'}
                    >
                      <Avatar
                        bg="gray.400"
                        color="white"
                        icon={<AiOutlineUser fontSize="22px" />}
                        justifyContent={'center'}
                        size={'sm'}
                      />
                      <Text color={PRIMARY_FONT_COLOR} fontSize={'14px'}>
                        講師
                      </Text>
                    </Stack>
                  )}
                  {answer.user_id === selectedQuestion?.user_id && (
                    <Box p={'10px 9px'}>
                      <Avatar
                        bg="gray.400"
                        color="white"
                        icon={<AiOutlineUser fontSize="22px" />}
                        justifyContent={'center'}
                        size={'sm'}
                      />
                    </Box>
                  )}
                </VStack>
                <Box p={'10px 15px'} className="markdown">
                  <ReactMarkdown>{answer.comment}</ReactMarkdown>
                </Box>
              </HStack>
            </Card>
          ))}
          <Link href={`/course/${courseId}/?videoId=${videoId}`} scroll={false}>
            <Button
              mt={'20px'}
              onClick={() => changeQuestionPage(QUESTION_PAGES.QuestionList)}
            >
              全ての質問へ戻る
            </Button>
          </Link>
          {(session?.user.isAdmin ||
            selectedQuestion?.user_id === session?.user.id) && (
            <FormControl mt={'40px'}>
              <FormControl isInvalid={!!answerComment} mb={'20px'} bg={'white'}>
                <Container ml={'0px'} pb={'10px'} pl={'0px'}>
                  <Text fontWeight={'bold'}>コメント内容</Text>
                </Container>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Box w={'50%'} mr={'5'}>
                    <ReactMde
                      maxEditorHeight={250}
                      value={answerComment}
                      onChange={(e) => setAnswerComment(e)}
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
                  onClick={() => createAnswer({ comment: answerComment })}
                  my={'10px'}
                  w={'100%'}
                  colorScheme="teal"
                >
                  コメントする
                </Button>
              </VStack>
            </FormControl>
          )}
        </Stack>
      )}
    </TabPanel>
  )
}
