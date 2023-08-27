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
  Center,
} from '@chakra-ui/react'

type SectionType = {
  courseId: number
  order: number
  title: string
  published: boolean
}[]

export function SectionManage() {
  const defaultCourseValues = {
    courseId: 1,
    order: 0,
    title: '',
    published: false,
  }
  const [sections, setSections] = useState<SectionType>([
    {
      courseId: 1,
      order: 0,
      title: '',
      published: false,
    },
  ])

  const [count, setCount] = useState(0)
  const countUp = () => setCount(count + 1)
  const reduce = () => {
    if (count > 0) {
      remove(count)
      setCount(count - 1)
    }
  }

  const { register, reset, control } = useForm({
    defaultValues: {
      sections: [{ sectionTitle: '' }],
    },
  })

  const { fields, prepend, append, remove } = useFieldArray({
    control,
    name: 'sections',
  })

  const handleInputChange = (value: string, index: number) => {
    const newSection = { ...defaultCourseValues, order: index, title: value }
    const newSections = sections.filter((t) => {
      return t.order !== index
    })
    setSections([...newSections, newSection])
  }

  const createSection = async (sections: SectionType) => {
    sections.map(async (sectionData) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/section/create`,
        {
          method: 'POST',
          body: JSON.stringify(sectionData),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      return res.json()
    })
  }

  const onSubmit = async (event: Event) => {
    event.preventDefault()
    try {
      const res = await createSection(sections)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Center minH={'100vh'} bg={'gray.200'}>
      <Container bg="white" minW={'100vh'} centerContent>
        <Heading fontSize={'2xl'} fontWeight={'bold'} mt={'80px'}>
          コース内容
        </Heading>
        <Container mt="109px" maxW={'100%'} bg={'white'} p={'0px'}>
          <VStack>
            <FormControl maxW={'904px'}>
              {fields.map((field, index) => (
                <Box
                  key={index}
                  border={'2px solid gray'}
                  borderRadius={'2xl'}
                  p={'8px'}
                  mb={'10px'}
                >
                  <label>
                    セクション No.{index}
                    <Input
                      type="text"
                      value={field.title}
                      onChange={(e) => handleInputChange(e.target.value, index)}
                      placeholder={'セクション名'}
                    />
                  </label>
                </Box>
              ))}

              <HStack>
                <Button
                  type="button"
                  onClick={() => [append({ sectionTitle: '' }), countUp()]}
                >
                  セクションを追加
                </Button>

                <Button type="button" onClick={reduce}>
                  セクションを削除
                </Button>
              </HStack>
              <VStack>
                <Button
                  mt={'20'}
                  colorScheme="teal"
                  type="submit"
                  onClick={(e) => onSubmit(e)}
                >
                  送信する
                </Button>
              </VStack>
            </FormControl>
          </VStack>
        </Container>
      </Container>
    </Center>
  )
}
