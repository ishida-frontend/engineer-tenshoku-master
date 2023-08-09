'use client'
import React, { useEffect, useState } from 'react'
import { z, ZodError } from 'zod'
import {
  Container,
  Button,
  Flex,
  Text,
  Link,
  FormControl,
  Wrap,
  Heading,
  FormHelperText,
  FormErrorMessage,
  Center,
  Box,
  VStack,
  HStack,
  Input,
  Textarea,
} from '@chakra-ui/react'

type Errors = {
  name: string[]
  email: string[]
  subject: string[]
  message: string[]
}

export function UserContactForm() {
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

  const ContactSchema = z.object({
    name: z
      .string()
      .min(2, { message: '2文字以上入力してください' })
      .max(50, { message: '50文字以下で入力してください' }),
    email: z
      .string()
      .email({ message: 'メールアドレスの形式ではありません。' }),
    subject: z.string().min(5, { message: '5文字以上入力してください' }),
    message: z.string().min(5, { message: '5文字以上入力してください' }),
  })
  type Contact = z.infer<typeof ContactSchema>
  const contact: Contact = {
    name: state.name,
    email: state.email,
    subject: state.subject,
    message: state.message,
  }

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

  const fetcher = async () =>
    (
      await fetch('http://localhost:8000/contact/create', {
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
      })
    ).json()

  const handleSubmit = async (event: Event) => {
    event.preventDefault()
    try {
      const result = ContactSchema.parse(contact)
      if (isChecked) {
        const res = await fetcher()
      } else {
        alert('利用規約に同意してください')
      }
    } catch (e) {
      if (e instanceof ZodError) {
        setErrors(e.flatten().fieldErrors as Errors)
      } else {
        console.log(e)
      }
    }
  }
  console.log('errors.name', errors.name[0])
  return (
    <>
      <Container bg="gray.100" maxW={'1512px'}>
        <Container bg="white" maxW={'1024px'} centerContent>
          <Heading fontSize={'2xl'} fontWeight={'bold'} mt={'80px'}>
            お問い合わせ
          </Heading>
          <FormControl onSubmit={handleSubmit} maxW={'904px'}>
            <Container mt="109px" maxW={'100%'} bg={'white'} p={'0px'}>
              <FormControl
                isInvalid={!!errors.name[0]}
                mt={'80px'}
                mb={'40px'}
                bg={'white'}
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
                <div>
                  {errors.name && (
                    <FormErrorMessage>{errors.name[0]}</FormErrorMessage>
                  )}
                </div>
              </FormControl>

              <FormControl
                isInvalid={!!errors.email[0]}
                mb={'40px'}
                bg={'white'}
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
                {errors.email && (
                  <FormErrorMessage>{errors.email[0]}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                isInvalid={!!errors.subject[0]}
                mb={'40px'}
                bg={'white'}
              >
                <Container ml={'0px'} pb={'10px'} pl={'0px'}>
                  <Flex>
                    <Text>お問い合わせタイトル</Text>
                    <Text color="teal">(必須)</Text>
                  </Flex>
                </Container>
                <Input
                  type="text"
                  name="subject"
                  value={state.subject}
                  onChange={handleInputChange}
                  placeholder={'動画名または質問タイトルを記入してください'}
                />
                {errors.subject && (
                  <FormErrorMessage>{errors.subject[0]}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                isInvalid={!!errors.message[0]}
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
                  placeholder={'こちらお問い合わせ内容を記入してください'}
                />
                {errors.message && (
                  <FormErrorMessage>{errors.message[0]}</FormErrorMessage>
                )}
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
                type="submit"
                disabled={!isChecked}
                onClick={handleSubmit}
                mt={'20'}
                colorScheme="teal"
              >
                送信する
              </Button>
            </VStack>
          </FormControl>
        </Container>
      </Container>
    </>
  )
}
