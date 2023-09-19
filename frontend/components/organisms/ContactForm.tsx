'use client'
import React, { useState } from 'react'
import { ZodError } from 'zod'
import {
  Container,
  Button,
  Flex,
  Text,
  Link,
  FormControl,
  Wrap,
  Heading,
  FormErrorMessage,
  VStack,
  HStack,
  Input,
  Textarea,
  Center,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

type Errors = {
  name?: string[]
  email?: string[]
  subject?: string[]
  message?: string[]
}

export function UserContactForm() {
  const router = useRouter()

  const [state, setState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<Errors>({
    name: [''],
    email: [''],
    subject: [''],
    message: [''],
  })

  const [isChecked, setIsChecked] = useState(false)
  const toggleCheckbox = () => {
    setIsChecked(!isChecked)
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.persist()
    setState((prevState) => {
      return { ...prevState, message: e.target.value }
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    const target = e.target
    const name = target.name
    setState(() => {
      return { ...state, [name]: target.value }
    })
  }

  const fetcher = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/contact/create`,
      {
        method: 'POST',
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          subject: state.subject,
          message: state.message,
          status: 0,
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
      if (isChecked) {
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
      } else {
        alert('利用規約に同意してください')
      }
    } catch (e) {
      if (e instanceof ZodError) {
        setErrors(e.flatten().fieldErrors as Errors)
      } else {
        router.push('/contact/done')
        console.log(e)
      }
    }
  }

  return (
    <Center padding="60px 96px" bg={'gray.100'}>
      <Container bg="white" maxW={'1024px'} centerContent>
        <Heading fontSize={'2xl'} fontWeight={'bold'} mt={'80px'}>
          お問い合わせ
        </Heading>
        <FormControl maxW={'904px'}>
          <Container mt="109px" maxW={'100%'} bg={'white'} p={'0px'}>
            <FormControl
              isInvalid={!!errors.name?.[0]}
              mt={'80px'}
              mb={'40px'}
              bg={'white'}
              h={'80px'}
            >
              <Container ml={'0px'} pb={'10px'} pl={'0px'}>
                <Flex>
                  <Text>お名前</Text>
                  <Text color="teal">(必須)</Text>
                </Flex>
              </Container>
              <Input
                type="text"
                name="name"
                value={state.name}
                onChange={handleInputChange}
                placeholder={'田中　太郎'}
              />
              <FormErrorMessage>
                {errors.name && errors.name[0]}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={!!errors.email?.[0]}
              mb={'40px'}
              bg={'white'}
              h={'80px'}
            >
              <Container ml={'0px'} pb={'10px'} pl={'0px'}>
                <Flex>
                  <Text>メールアドレス</Text>
                  <Text color="teal">(必須)</Text>
                </Flex>
              </Container>
              <Input
                type="email"
                name="email"
                value={state.email}
                onChange={handleInputChange}
                placeholder={'sample@hoge.com'}
              />
              <FormErrorMessage>
                {errors.email && errors.email[0]}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={!!errors.subject?.[0]}
              mb={'40px'}
              bg={'white'}
              h={'80px'}
            >
              <Container ml={'0px'} pb={'10px'} pl={'0px'}>
                <Flex>
                  <Text>お問い合わせ概要</Text>
                  <Text color="teal">(必須)</Text>
                </Flex>
              </Container>
              <Input
                type="text"
                name="subject"
                value={state.subject}
                onChange={handleInputChange}
                placeholder={'お問い合わせ概要を記入してください'}
              />
              <FormErrorMessage>
                {errors.subject && errors.subject[0]}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={!!errors.message?.[0]}
              mb={'40px'}
              bg={'white'}
            >
              <Container ml={'0px'} pb={'10px'} pl={'0px'}>
                <Flex>
                  <Text>お問い合わせ内容</Text>
                  <Text color="teal">(必須)</Text>
                </Flex>
              </Container>
              <Textarea
                name="お問い合わせ内容"
                value={state.message}
                onChange={onChangeHandler}
                pb={'229px'}
                placeholder={'こちらお問い合わせ内容を記入してください'}
              />
              <FormErrorMessage>
                {errors.message && errors.message[0]}
              </FormErrorMessage>
            </FormControl>
          </Container>

          <Container ml={'0px'} p={'0px'}>
            <HStack>
              <input
                type="checkbox"
                name="agree"
                id="agreeCheck"
                onChange={() => toggleCheckbox()}
              />
              <Wrap>
                <Text>
                  <Link color="teal.500" href="#">
                    利用規約
                  </Link>
                  および
                  <Link color="teal.500" href="#">
                    プライバシーポリシー
                  </Link>
                  に同意する
                </Text>
              </Wrap>
            </HStack>
          </Container>
          <VStack>
            <Button
              onClick={handleSubmit}
              disabled={!isChecked}
              m={'80px 0'}
              colorScheme="teal"
            >
              送信する
            </Button>
          </VStack>
        </FormControl>
      </Container>
    </Center>
  )
}
