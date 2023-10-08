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
import { useRouter } from 'next/navigation'
import { PATHS } from '../../constants/paths'
import { ZodError } from 'zod'
import ReactMde from 'react-mde'
import ReactMarkdown from 'react-markdown'
import 'react-mde/lib/styles/css/react-mde-all.css'
import * as Showdown from 'showdown'
import '../../styles/markdown.css'

type Errors = {
  title?: string[]
  content?: string[]
}

export function QuestionForm() {
  const router = useRouter()
  const [state, setState] = useState({
    title: '',
    content: '',
  })

  const [errors, setErrors] = useState<Errors>({
    title: [''],
    content: [''],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    const target = e.target
    const title = target.title
    setState(() => {
      return { ...state, [title]: target.value }
    })
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.persist()
    setState((prevState) => {
      return { ...prevState, message: e.target.value }
    })
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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/question/create`,
      {
        method: 'POST',
        body: JSON.stringify({
          title: state.title,
          content: state.content,
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
      const items = res.error.reduce(
        (accumulator: string[], value: { path: string; message: string }) => {
          return { ...accumulator, [value.path]: [value.message] }
        },
        {
          [res.error[0].path]: res.error[0].message,
        },
      )
      setErrors(items as Errors)
    } catch (e) {
      if (e instanceof ZodError) {
        setErrors(e.flatten().fieldErrors as Errors)
      } else {
        router.push(PATHS.CONTACT.DONE.path)
        console.log(e)
      }
    }
  }

  return (
    <TabPanel>
      <Stack>
        <Link href="/course/${course_id}">
          <Button>全ての質問に戻る</Button>
        </Link>

        <FormControl>
          <Container bg={'white'} p={'0px'}>
            <FormControl
              isInvalid={!!errors.title?.[0]}
              mb={'40px'}
              bg={'white'}
              h={'80px'}
            >
              <Container ml={'0px'} pb={'10px'} pl={'0px'}>
                <Flex>
                  <Text>質問タイトル</Text>
                  <Text color="teal">(必須)</Text>
                </Flex>
              </Container>
              <Input
                type="text"
                name="content"
                value={state.title}
                onChange={handleInputChange}
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
              mb={'40px'}
              bg={'white'}
            >
              <Container ml={'0px'} pb={'10px'} pl={'0px'}>
                <Flex>
                  <Text>質問の内容</Text>
                  <Text color="teal">(必須)</Text>
                </Flex>
              </Container>
              <Box display={'flex'} justifyContent={'space-between'}>
                <Box w={'50%'} mr={'5'} h={'350px'}>
                  <ReactMde
                    heightUnits="vh"
                    minEditorHeight={40}
                    value={state.content}
                    onChange={() => onChangeHandler}
                    selectedTab={selectedEditorTab}
                    onTabChange={setSelectedEditorTab}
                    generateMarkdownPreview={(markdown) =>
                      Promise.resolve(converter.makeHtml(markdown))
                    }
                  />
                </Box>
                <Box
                  w={'50%'}
                  h={'48vh'}
                  overflow={'scroll'}
                  bg={'white'}
                  border={'1px solid gray'}
                  borderRadius={'4px'}
                  paddingLeft={'28px'}
                  paddingRight={'20px'}
                  className="markdown"
                >
                  <ReactMarkdown>{state.content}</ReactMarkdown>
                </Box>
              </Box>
              <FormErrorMessage>
                {errors.content && errors.content[0]}
              </FormErrorMessage>
            </FormControl>
          </Container>

          <VStack>
            <Button onClick={handleSubmit} m={'80px 0'} colorScheme="teal">
              質問する
            </Button>
          </VStack>
        </FormControl>
      </Stack>
    </TabPanel>
  )
}
