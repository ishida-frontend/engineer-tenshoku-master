import React from 'react'
import {
  Box,
  Button,
  Card,
  CardHeader,
  HStack,
  Text,
  CardBody,
  TabPanel,
  Heading,
  Stack,
  StackDivider,
  Avatar,
  VStack,
} from '@chakra-ui/react'
import { AiOutlineUser } from 'react-icons/ai'
import { QuestionType } from 'types/QuestionType'
import { PRIMARY_FONT_COLOR } from '../../constants/colors'

export function QuestionList({
  questions,
}: {
  questions: QuestionType[] | undefined
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
              この動画に質問はありません。
            </Heading>
          </VStack>
          <Button mt={'20px'}>新しく質問する</Button>
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
          <Stack divider={<StackDivider />} spacing="4">
            {questions.map((question: QuestionType) => (
              <Card
                key={question.id}
                boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 3px;'}
                cursor={'pointer'}
                _hover={{
                  bg: 'transparent',
                }}
              >
                <HStack pl={'20px'}>
                  <Avatar
                    bg="blue.300"
                    color="black"
                    icon={<AiOutlineUser fontSize="2rem" />}
                  />
                  <Box overflow={'hidden'}>
                    <CardHeader pb={'10px'}>
                      <Box>
                        <Heading
                          size="md"
                          textTransform="uppercase"
                          isTruncated
                        >
                          {question.title}
                        </Heading>
                      </Box>
                    </CardHeader>
                    <CardBody pt={'0px'}>
                      <Box>
                        <Text fontSize="md" isTruncated>
                          {question.content}
                        </Text>
                      </Box>
                    </CardBody>
                  </Box>
                </HStack>
              </Card>
            ))}
          </Stack>
          <Button mt={'20px'}>新しく質問する</Button>
        </TabPanel>
      )}
    </>
  )
}
