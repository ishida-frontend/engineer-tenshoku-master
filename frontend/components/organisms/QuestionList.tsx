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
import { QuestionType } from '../../types/QuestionType'
import { PRIMARY_FONT_COLOR } from '../../constants/colors'
import { QUESTION_PAGES } from '../../constants/index'
import { QuestionPageType } from '../../types/QuestionType'
import Link from 'next/link'
import { UserProfileType } from '../../types'
import { AnotherUserProfileModal } from '../pages/AnotherUserProfileModal'

export function QuestionList({
  questions,
  courseId,
  videoId,
  changeQuestionPage,
  getAnotherUserProfile,
  anotherUserProfile,
  isProfileOpen,
  closeProfileModal,
}: {
  questions?: QuestionType[]
  courseId?: string
  videoId?: string
  changeQuestionPage: (value: QuestionPageType) => void
  getAnotherUserProfile?: (value: string) => void
  anotherUserProfile?: UserProfileType
  isProfileOpen?: boolean
  closeProfileModal?: () => void
}) {
  const changeToQuestionDetail = () => {
    try {
      changeQuestionPage(QUESTION_PAGES.QuestionDetail)
    } catch (e) {
      throw new Error('質問詳細ページへの遷移に失敗しました')
    }
  }
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
            onClick={() => changeQuestionPage(QUESTION_PAGES.QuestionForm)}
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
                boxShadow={'rgba(0, 0, 0, 0.24) 3px 3px 3px 3px;'}
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
                    onClick={() => getAnotherUserProfile(question.user_id)}
                    _hover={{
                      opacity: '0.7',
                    }}
                  />
                  {anotherUserProfile && (
                    <AnotherUserProfileModal
                      anotherUserProfile={anotherUserProfile}
                      isProfileOpen={isProfileOpen}
                      closeProfileModal={() => closeProfileModal()}
                    />
                  )}
                  <Link
                    key={question.id}
                    href={`/course/${courseId}/${videoId}?questionId=${question.id}`}
                    scroll={false}
                    onClick={changeToQuestionDetail}
                  >
                    <Box overflow={'hidden'} p={'10px 0px 15px'}>
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
            onClick={() => changeQuestionPage(QUESTION_PAGES.QuestionForm)}
          >
            新しく質問する
          </Button>
        </TabPanel>
      )}
    </>
  )
}
