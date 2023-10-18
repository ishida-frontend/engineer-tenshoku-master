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
import { AnswerType } from 'types/AnswerType'
import Link from 'next/link'
import ReactMde from 'react-mde'
import ReactMarkdown from 'react-markdown'
import 'react-mde/lib/styles/css/react-mde-all.css'
import * as Showdown from 'showdown'
import '../../styles/answerMarkdown.css'

export function QuestionDetail({
  userId,
  answers,
  changeQuestionPage,
}: {
  userId: string | undefined
  answers?: AnswerType[]
  changeQuestionPage: (value: QuestionPageType) => Promise<void>
}) {
  return (
    <>
      {(userId === undefined || userId.length === 0) && (
        <TabPanel
          ml={'20px'}
          mr={'20px'}
          mt={'20px'}
          borderTop={'1px solid gray'}
        >
          <VStack>
            <Heading py={10} color={PRIMARY_FONT_COLOR} fontSize="36px">
              この質問の回答を見るにはログインをしてください。
            </Heading>
          </VStack>
          <Button
            mt={'20px'}
            onClick={() => changeQuestionPage('QuestionList')}
          >
            全ての質問へ戻る
          </Button>
        </TabPanel>
      )}
      {userId !== undefined &&
        userId.length !== 0 &&
        (answers === undefined || answers.length === 0) && (
          <TabPanel
            ml={'20px'}
            mr={'20px'}
            mt={'20px'}
            borderTop={'1px solid gray'}
          >
            <VStack>
              <Heading py={10} color={PRIMARY_FONT_COLOR} fontSize="36px">
                まだ回答はありません。
              </Heading>
            </VStack>
            <Button
              mt={'20px'}
              onClick={() => changeQuestionPage('QuestionList')}
            >
              全ての質問へ戻る
            </Button>
          </TabPanel>
        )}
      {userId !== undefined &&
        userId.length !== 0 &&
        answers !== undefined &&
        answers.length !== 0 && (
          <TabPanel
            ml={'20px'}
            mr={'20px'}
            mt={'20px'}
            borderTop={'1px solid gray'}
          >
            <Stack spacing="4">
              {answers.map((answer: AnswerType) => (
                <Card
                  key={answer.id}
                  boxShadow={'rgba(0, 0, 0, 0.24) 3px 3px 3px;'}
                  pt={'10px'}
                  pb={'10px'}
                >
                  <HStack pl={'20px'}>
                    <Avatar
                      bg="gray.400"
                      color="white"
                      icon={<AiOutlineUser fontSize="22px" />}
                      justifyContent={'center'}
                      size={'sm'}
                    />
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
            </Stack>
            <Button
              mt={'20px'}
              onClick={() => changeQuestionPage('QuestionList')}
            >
              全ての質問へ戻る
            </Button>
          </TabPanel>
        )}
    </>
  )
}
