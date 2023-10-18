import React from 'react'
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
} from '@chakra-ui/react'
import { AiOutlineUser } from 'react-icons/ai'
import { QuestionType } from 'types/QuestionType'
import { PRIMARY_FONT_COLOR } from '../../constants/colors'
import { QuestionPageType } from 'types/QuestionType'
import Link from 'next/link'

export function QuestionList({
  questions,
  courseId,
  videoId,
  changeQuestionPage,
  getAnswers,
}: {
  questions?: QuestionType[]
  courseId: string
  videoId: string
  changeQuestionPage: (value: QuestionPageType) => Promise<void>
  getAnswers: (value: string) => Promise<string>
}) {
  return (
    <>
      {(questions === undefined || questions.length === 0) && (
        <TabPanel
          ml={'20px'}
          mr={'20px'}
          mt={'20px'}
          borderTop={'1px solid gray'}
        >
          <VStack>
            <Heading py={10} color={PRIMARY_FONT_COLOR} fontSize="36px">
              まだ質問はありません。
            </Heading>
          </VStack>
          <Button
            mt={'20px'}
            onClick={() => changeQuestionPage('QuestionForm')}
          >
            新しく質問する
          </Button>
        </TabPanel>
      )}
      {questions !== undefined && questions.length !== 0 && (
        <TabPanel
          ml={'20px'}
          mr={'20px'}
          mt={'20px'}
          borderTop={'1px solid gray'}
        >
          <Heading size="md" pb={'15px'}>
            この動画の全ての質問
          </Heading>
          <Stack spacing="4">
            {questions.map((question: QuestionType) => (
              <Card
                key={question.id}
                boxShadow={'rgba(0, 0, 0, 0.24) 3px 3px 3px;'}
                cursor={'pointer'}
                _hover={{
                  bg: 'gray.100',
                }}
              >
                <HStack pl={'20px'}>
                  <Avatar
                    bg="blue.300"
                    color="black"
                    icon={<AiOutlineUser fontSize="2rem" />}
                    justifyContent={'center'}
                  />
                  <Link
                    href={`/course/${courseId}/?videoId=${videoId}&questionId=${question.id}`}
                  >
                    <Box
                      overflow={'hidden'}
                      pl={'15px'}
                      pt={'10px'}
                      pb={'10px'}
                      onClick={changenswers(question.id)}
                    >
                      <Heading pb={'10px'} size="md" isTruncated>
                        {question.title}
                      </Heading>
                      <Text fontSize="md" isTruncated>
                        {question.content}
                      </Text>
                    </Box>
                  </Link>
                </HStack>
              </Card>
            ))}
          </Stack>
          <Button
            mt={'20px'}
            onClick={() => changeQuestionPage('QuestionForm')}
          >
            新しく質問する
          </Button>
        </TabPanel>
      )}
    </>
  )
}
