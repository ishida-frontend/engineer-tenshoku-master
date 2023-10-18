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

export function QuestionDetail({
  answers,
  courseId,
  videoId,
  changeQuestionPage,
}: {
  answers?: AnswerType[]
  courseId: string
  videoId: string
  changeQuestionPage: (value: QuestionPageType) => Promise<void>
}) {
  return (
    <>
      {(answers === undefined || answers.length === 0) && (
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
      {answers !== undefined && answers.length !== 0 && (
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
            {answers.map((answer: AnswerType) => (
              <Card
                key={answer.id}
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
                  <Box pl={'15px'} pt={'10px'} pb={'10px'}>
                    <Text fontSize="md" isTruncated>
                      {answer.comment}
                    </Text>
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
