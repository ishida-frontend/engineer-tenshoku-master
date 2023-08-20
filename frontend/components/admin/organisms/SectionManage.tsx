'use client'
import React, { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
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
  HStack,
} from '@chakra-ui/react'

export function SectionManage() {
  const [state, setState] = useState([
    {
      course_id: 1,
      title: '',
      published: true,
    },
  ])

  const [count, setCount] = useState(0)

  //クリック時にitems配列に新しいitemを作る処理
  // input をいくつ追加したカウント
  const countUp = () => setCount(count + 1)
  console.log('count', count)

  // input を減らすボタンを押した時の処理
  const reduce = () => {
    if (count > 0) {
      remove(count)
      setCount(count - 1)
    }
  }

  // React Hook Form を使うための基本設定
  const { register, handleSubmit, reset, control } = useForm({
    // input の value の 初期値を設置
    defaultValues: {
      sections: [{ sectionTitle: '' }],
    },
  })

  // inputタグ を動的に増減させるための設定
  const { fields, prepend, append, remove } = useFieldArray({
    control,
    name: 'sections',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index) => {
    const name = e.target.name
    setState(() => {
      return { ...state, [name]: e.target.value }
    })
  }

  const fetcher = async (state, index) => {
    const res = await fetch('http://localhost:8000/section/create', {
      method: 'POST',
      body: JSON.stringify({
        order: index,
        course_id: state[index].course_id,
        title: state[index].title,
        publised: state[index].published,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res.json()
  }

  // submitボタンを押した時に行う処理
  const onSubmit = async (index) => {
    console.log('fetcher')
    await fetcher(state, index)
  }

  return (
    <Container bg="gray.100" maxW={'1512px'}>
      <Container bg="white" maxW={'1024px'} centerContent>
        <Heading fontSize={'2xl'} fontWeight={'bold'} mt={'80px'}>
          コース内容
        </Heading>
        <Container mt="109px" maxW={'100%'} bg={'white'} p={'0px'}>
          <VStack>
            <FormControl onSubmit={handleSubmit(onSubmit)} maxW={'904px'}>
              {fields.map((field, index) => (
                <Box
                  key={field.id}
                  border={'2px solid gray'}
                  borderRadius={'2xl'}
                  p={'8px'}
                  mb={'10px'}
                >
                  <label htmlFor={`sections.${index}.sectionTitle`}>
                    セクション No.{index}
                    <Input
                      {...register(`sections.${index}.sectionTitle`)}
                      type="text"
                      name={'title[' + index + ']'}
                      value={state[index + 1]?.title}
                      onChange={(e) => handleInputChange(e, index)}
                      placeholder={'セクション名'}
                    />
                  </label>
                </Box>
              ))}

              <button
                type="button"
                onClick={() => [append({ sectionTitle: '' }), countUp()]}
              >
                セクションを追加
              </button>
              <br />

              <button type="button" onClick={reduce}>
                セクションを削除
              </button>
              <br />
              <VStack>
                <Button
                  mt={'20'}
                  colorScheme="teal"
                  type="submit"
                  onClick={onSubmit}
                >
                  送信する
                </Button>
              </VStack>
            </FormControl>
          </VStack>
        </Container>
      </Container>
    </Container>
  )
}
