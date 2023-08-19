'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import { useForm, useFieldArray } from 'react-hook-form'
import { z, ZodError } from 'zod'
import {
  Container,
  Button,
  Flex,
  Text,
  FormControl,
  Heading,
  VStack,
  Input,
  Box,
} from '@chakra-ui/react'

export function CourseManage() {
  const [state, setState] = useState({
    course_id: 1,
    title: '',
    published: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    const target = e.target
    const name = target.name
    setState(() => {
      return { ...state, [name]: target.value }
    })
  }

  const createSection = async () => {
    const res = await fetch('http://localhost:8000/section/create', {
      method: 'POST',
      body: JSON.stringify({
        course: state.course_id,
        title: state.title,
        published: state.published,
        order: 1,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res.json()
  }

  // sectionBox を動的に増減させるための設定
  // const { fields, prepend, append, remove } = useFieldArray({
  //   control,
  //   name: 'tasks',
  // })

  const handleAddSection = async () => {
    return (
      <Box border={'1px solid black'}>
        <FormControl mb={'40px'} bg={'white'} h={'80px'}>
          <Container ml={'0px'} pb={'10px'} pl={'0px'}>
            {/* <Flex> */}
            <Text>セクションタイトル</Text>
            {/* <Text color="teal">(必須)</Text>
            </Flex> */}
          </Container>
          <Input
            type="text"
            name="title"
            value={state.title}
            onChange={handleInputChange}
            placeholder={'JavaScript環境設定'}
          />
        </FormControl>
      </Box>
    )
  }

  const handleSubmit = async (event: Event) => {
    event.preventDefault()
    try {
      const res = await createSection()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Container bg="gray.100" maxW={'1512px'}>
      <Container bg="white" maxW={'1024px'} centerContent>
        <Heading fontSize={'2xl'} fontWeight={'bold'} mt={'80px'}>
          コース内容
        </Heading>
        <FormControl onSubmit={handleSubmit} maxW={'904px'}>
          <Container mt="109px" maxW={'100%'} bg={'white'} p={'0px'}>
            {/* {fields.map((field, index) => ( */}
            <Box border={'1px solid black'}>
              <FormControl mb={'40px'} bg={'white'} h={'80px'}>
                <Container ml={'0px'} pb={'10px'} pl={'0px'}>
                  {/* <Flex> */}
                  <Text>セクションタイトル</Text>
                  {/* <Text color="teal">(必須)</Text>
                  </Flex> */}
                </Container>
                <Input
                  type="text"
                  name="title"
                  value={state.title}
                  onChange={handleInputChange}
                  placeholder={'JavaScript環境設定'}
                />
              </FormControl>
            </Box>
            {/* ))} */}
          </Container>

          <FormControl id="addSection">
            <Button
              type="button"
              onClick={() => [append({ taskValue: '' }), countUp()]}
            >
              セクションを追加する
            </Button>
          </FormControl>

          <VStack>
            <Button onClick={handleSubmit} mt={'20'} colorScheme="teal">
              送信する
            </Button>
          </VStack>
        </FormControl>
      </Container>
    </Container>
  )
}
