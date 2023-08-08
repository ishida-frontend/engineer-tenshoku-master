'use client'
import React, { useEffect, useState } from 'react'
import TextareaItem from './molecules/TextareaItem'
import FormItem from './molecules/FormItem'
import InputItem from './molecules/InputItem'
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
} from '@chakra-ui/react'

export function UserContactForm() {
  const [state, setState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  function errorMessage() {
    const [input, setInput] = useState()
    const handleInputChange = (e) => setInput(e.target.value)

    const isError = input === ''
    return (
      <FormControl isInvalid={isError}>
        {!isError ? (
          <FormHelperText>
            Enter the email you'd like to receive the newsletter on.
          </FormHelperText>
        ) : (
          <FormErrorMessage>Email is required.</FormErrorMessage>
        )}
      </FormControl>
    )
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

  const submitAlert = async (e: React.MouseEvent) => {
    e.persist()
    e.preventDefault()
    const stateError = Object.values(state).some((value) => {
      console.log('state', state)
      return value.length === 0
    })

    if (stateError) {
      alert('未入力があります')
    } else {
      const res = await fetcher()
      alert('送信しましました')
    }
  }

  return (
    <>
      <Container bg="gray.100">
        <Container bg="white" centerContent>
          <Heading mt={'80px'}>お問い合わせ</Heading>
          <FormControl ml={'0px'} pl={'0px'}>
            <Container m={'109px 0px 0px 60px'} bg={'white'} p={'0px'}>
              <FormControl m={'80px 0px 40px 0px'} p={'0px'} bg={'white'}>
                <Container m={'0px'} pb={'10px'} pl={'0px'}>
                  <FormItem title="お名前" required={true}></FormItem>
                </Container>
                <InputItem
                  type="text"
                  name="name"
                  value={state.name}
                  onChange={handleInputChange}
                  placeholder={'田中　太郎'}
                />
                {/* {nameError && (
                  <FormErrorMessage>項目が空です。</FormErrorMessage>
                )} */}
              </FormControl>

              <FormControl m={'0px 0px 45px 0px'} p={'0px'} bg={'white'}>
                <Container m={'0px'} pb={'10px'} pl={'0px'}>
                  <FormItem title="メールアドレス" required={true}></FormItem>
                </Container>
                <InputItem
                  type="email"
                  name="email"
                  value={state.email}
                  onChange={handleInputChange}
                  placeholder={'sample@hoge.com'}
                />
                {/* {!emailError ? (
                  <FormHelperText></FormHelperText>
                ) : (
                  <FormErrorMessage>項目が空です。</FormErrorMessage>
                )} */}
              </FormControl>

              <FormControl m={'0px 0px 45px 0px'} p={'0px'} bg={'white'}>
                <Container m={'0px'} pb={'10px'} pl={'0px'}>
                  <FormItem
                    title="お問い合わせタイトル"
                    required={true}
                  ></FormItem>
                </Container>
                <InputItem
                  type="text"
                  name="subject"
                  value={state.subject}
                  onChange={handleInputChange}
                  placeholder={'動画名または質問タイトルを記入してください'}
                />
                {/* {!subjectError ? (
                  <FormHelperText></FormHelperText>
                ) : (
                  <FormErrorMessage>項目が空です。</FormErrorMessage>
                )} */}
              </FormControl>

              <FormControl m={'0px 0px 45px 0px'} p={'0px'} bg={'white'}>
                <Container m={'0px'} pb={'10px'} pl={'0px'}>
                  <FormItem title="お問い合わせ内容" required={true}></FormItem>
                </Container>
                <TextareaItem
                  name="お問い合わせ内容"
                  value={state.message}
                  onChange={onChangeHandler}
                  placeholder={'こちらお問い合わせ内容を記入してください'}
                />
                {/* {!messageError ? (
                  <FormHelperText></FormHelperText>
                ) : (
                  <FormErrorMessage>項目が空です。</FormErrorMessage>
                )} */}
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
          </FormControl>
          <Button
            disabled={!isChecked}
            onClick={submitAlert}
            mt={'20'}
            colorScheme="teal"
          >
            送信する
          </Button>
        </Container>
      </Container>
    </>
  )
}
