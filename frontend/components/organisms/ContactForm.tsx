'use client'
import React, { useEffect, useState } from 'react'
import TextareaItem from '../atoms/TextareaItem'
import FormLabel from '../atoms/FormLabel'
import TextInput from '../atoms/TextInput'
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
} from '@chakra-ui/react'

export function UserContactForm() {
  const [state, setState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState(null)

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

  const result = ContactSchema.safeParse(contact)
  const errorMessage = result.error.format()
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('result', result)
    console.log('contact', contact)
    console.log('a')
    if (result.success) {
      console.log('b')
      const res = await fetcher()
    } else if (!result.success) {
      console.log('c')
      setErrors(errorMessage)
      console.log('result.error.format()', result.error.format())
      console.log('errorMessage.name._errors[0]', errorMessage.name._errors[0])
      console.log(
        'errorMessage.email._errors[0]',
        errorMessage.email._errors[0],
      )
      setErrors(e.flatten().fieldErrors)
      console.log('setErrors', setErrors)
    } else {
      console.log('d')
    }
  }

  return (
    <>
      <Container bg="gray.100">
        <Container bg="white" centerContent>
          <Heading mt={'80px'}>お問い合わせ</Heading>
          <FormControl onSubmit={handleSubmit} ml={'0px'} pl={'0px'}>
            <Container m={'109px 0px 0px 60px'} bg={'white'} p={'0px'}>
              <FormControl m={'80px 0px 40px 0px'} p={'0px'} bg={'white'}>
                <Container m={'0px'} pb={'10px'} pl={'0px'}>
                  <FormLabel title="お名前" required={true}></FormLabel>
                </Container>
                <TextInput
                  type="text"
                  name="name"
                  value={state.name}
                  onChange={handleInputChange}
                  placeholder={'田中　太郎'}
                />
                <div>
                  {errorMessage?.name && (
                    <FormErrorMessage>
                      {errorMessage.name._errors[0]}
                    </FormErrorMessage>
                  )}
                </div>
              </FormControl>

              <FormControl m={'0px 0px 45px 0px'} p={'0px'} bg={'white'}>
                <Container m={'0px'} pb={'10px'} pl={'0px'}>
                  <FormLabel title="メールアドレス" required={true}></FormLabel>
                </Container>
                <TextInput
                  type="email"
                  name="email"
                  value={state.email}
                  onChange={handleInputChange}
                  placeholder={'sample@hoge.com'}
                />
                {errorMessage?.email && (
                  <FormErrorMessage>
                    {errorMessage.email._errors[0]}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl m={'0px 0px 45px 0px'} p={'0px'} bg={'white'}>
                <Container m={'0px'} pb={'10px'} pl={'0px'}>
                  <FormLabel
                    title="お問い合わせタイトル"
                    required={true}
                  ></FormLabel>
                </Container>
                <TextInput
                  type="text"
                  name="subject"
                  value={state.subject}
                  onChange={handleInputChange}
                  placeholder={'動画名または質問タイトルを記入してください'}
                />
                {errorMessage?.subject && (
                  <FormErrorMessage>
                    {errorMessage.subject._errors[0]}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl m={'0px 0px 45px 0px'} p={'0px'} bg={'white'}>
                <Container m={'0px'} pb={'10px'} pl={'0px'}>
                  <FormLabel
                    title="お問い合わせ内容"
                    required={true}
                  ></FormLabel>
                </Container>
                <TextareaItem
                  name="お問い合わせ内容"
                  value={state.message}
                  onChange={onChangeHandler}
                  placeholder={'こちらお問い合わせ内容を記入してください'}
                />
                {errorMessage?.message && (
                  <FormErrorMessage>
                    {errorMessage.message._errors[0]}
                  </FormErrorMessage>
                )}
              </FormControl>
            </Container>

            <Container m={'0px 0px 0px 60px'} p={'0px'}>
              <Flex>
                <input
                  type="checkbox"
                  name="agree"
                  id="agreeCheck"
                  onChange={() => toggleCheckbox()}
                />
                <Wrap pl={'8px'}>
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
              </Flex>
            </Container>
            <Button
              type="submit"
              disabled={!isChecked}
              onClick={handleSubmit}
              mt={'20'}
              display="flex"
              alignItems="center"
              colorScheme="teal"
            >
              送信する
            </Button>
          </FormControl>
        </Container>
      </Container>
    </>
  )
}
