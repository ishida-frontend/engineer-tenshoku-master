'use client'
import React, { useEffect, useState } from 'react'
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
type PreSectionType = {
  courseId: number
  order: number
  title: string
  published: boolean
  id?: number
  created_at?: string
  updated_at?: string
  delete_at?: string
}[]

type ItemsProps = {
  title: string
}[]

const course_id = 1

export function SectionManage() {
  const defaultCourseValues = {
    courseId: course_id,
    order: 0,
    title: '',
    published: false,
  }
  const [sections, setSections] = useState<SectionType>([
    {
      courseId: course_id,
      order: 0,
      title: '',
      published: false,
    },
  ])
  const [preSections, setPreSections] = useState<PreSectionType>([
    {
      courseId: course_id,
      order: 0,
      title: '',
      published: false,
      id: 1,
      created_at: '',
      updated_at: '',
      delete_at: '',
    },
  ])
  const [initialSections, setInitialSections] = useState<SectionType>([
    {
      courseId: course_id,
      order: 0,
      title: '',
      published: false,
    },
  ])

  const [count, setCount] = useState(0)
  const countUp = () => setCount((prevCount) => prevCount + 1)
  const reduce = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1)
    }
  }

  const [items, setItems] = useState<ItemsProps>([])
  const [inputValue, setInputValue] = useState('')
  const handleAddInput = () => {
    countUp()
    const newItem = {
      title: inputValue,
    }
    const newItems = [...items, newItem]
    setItems(newItems)
  }

  // const [preSections, setPreSections] = useState<preSectionType>([])
  useEffect(() => {
    const getSections = async () => {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/section/read/${course_id}`,
      )
        .then((res) => res.json())
        .then((json) => setPreSections(json))
        .catch(() => console.log('Error:No data in this course'))
    }
    getSections()
    // setSections(...preSections)
    preSections.map(async (preSection) => {
      delete preSection.id
      delete preSection.created_at
      delete preSection.updated_at
      delete preSection.delete_at
      console.log('preSection', preSection)
      countUp
      const initialSections = {
        courseId: preSection.courseId,
        title: preSection.title,
        order: preSection.order,
        published: preSection.published,
      }
      return setSections([initialSections])
    })
  }, [])
  console.log('initialSections', initialSections)
  console.log('preSections', preSections)

  const handleInputChange = (value: string, index: number) => {
    const newItems = [...items]
    newItems[index].title = value
    setItems(newItems)
    console.log('items', items)

    const newSection = {
      ...defaultCourseValues,
      title: items[index].title,
      order: index,
    }
    const newSections = sections.filter((t) => {
      return t.order !== index
    })
    setSections([...newSections, newSection])
  }
  console.log('sections', sections)

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
              {preSections.map((item, index) => (
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
                      value={item.title}
                      onChange={(e) => handleInputChange(e.target.value, index)}
                      placeholder={'セクション名'}
                    />
                  </label>
                </Box>
              ))}
              {items.map((item, index) => (
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
                      value={item.title}
                      onChange={(e) => handleInputChange(e.target.value, index)}
                      placeholder={'セクション名'}
                    />
                  </label>
                </Box>
              ))}

              <HStack>
                <Button type="button" onClick={() => handleAddInput()}>
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
                  保存する
                </Button>
              </VStack>
            </FormControl>
          </VStack>
        </Container>
      </Container>
    </Center>
  )
}
