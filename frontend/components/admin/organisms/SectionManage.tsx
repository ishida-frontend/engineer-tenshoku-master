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
  const [state, setState] = useState({
    course_id: 1,
    title: '',
    published: '',
  })
  // React Hook Form を使うための基本設定
  const { register, handleSubmit, reset, control } = useForm({
    // input の value の 初期値を設置
    defaultValues: {
      sections: [{ sectionTitle: '' }],
    },
  })

  // input を動的に増減させるための設定
  const { fields, prepend, append, remove } = useFieldArray({
    control,
    sections: 'sections',
  })

  // submitボタンを押した時に行う処理
  const onSubmit = (data) => {
    const list = []
    data.sections.forEach((item, index) =>
      list.push(`\nセクジョンNo.${index}:${item.sectionTitle}`),
    )
    // 送信後 input の入力欄を初期化
    reset()
  }

  // input をいくつ追加したカウント
  const [count, setCount] = useState(0)
  const countUp = () => setCount(count + 1)
  console.log('count', count)

  // input を減らすボタンを押した時の処理
  const reduce = () => {
    if (count > 0) {
      remove(count)
      setCount(count - 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    const target = e.target
    const name = target.name
    setState(() => {
      return { ...state, [name]: target.value }
    })
  }

  return (
    <Container bg="gray.100" maxW={'1512px'}>
      <Container bg="white" maxW={'1024px'} centerContent>
        <Heading fontSize={'2xl'} fontWeight={'bold'} mt={'80px'}>
          コース内容
        </Heading>
        <Container mt="109px" maxW={'100%'} bg={'white'} p={'0px'}>
          <FormControl onSubmit={handleSubmit(onSubmit)} maxW={'904px'}>
            {fields.map((field, index) => (
              <div key={field.id}>
                <label htmlFor={`sections.${index}.sectionTitle`}>
                  セクションNo.{index}：
                  <Input
                    {...register(`sections.${index}.sectionTitle`)}
                    type="text"
                    name="title"
                    value={state.title}
                    onChange={handleInputChange}
                    placeholder={'JavaScript環境設定'}
                  />
                </label>
              </div>
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
              <Button mt={'20'} colorScheme="teal">
                送信する
              </Button>
            </VStack>
          </FormControl>
        </Container>
      </Container>
    </Container>
  )
}
