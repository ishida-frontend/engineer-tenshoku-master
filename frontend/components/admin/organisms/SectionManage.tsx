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
  course_id: number
  order: number
  title: string
  published: boolean
}

const course_id = 1

export function SectionManage() {
  const defaultCourseValues = {
    course_id: course_id,
    order: 0,
    title: '',
    published: false,
  }
  const [sections, setSections] = useState<SectionType[]>([
    {
      course_id: course_id,
      order: 0,
      title: '',
      published: false,
    },
  ])

  const handleAddInput = () => {
    const addSection: SectionType = {
      course_id: course_id,
      title: '',
      order: sections.length,
      published: false,
    }
    setSections((prev) => [...prev, addSection])
  }

  const handleRemoveInput = (e, index) => {
    e.preventDefault()
    setSections((prev) => prev.filter((item) => item !== prev[index]))
    const deletedSections = [...sections]
    deletedSections.splice(index, 1)
    const refleshedSections = deletedSections.map(
      (deletedSection: SectionType) => {
        return {
          course_id: deletedSection.course_id,
          order: deletedSection.order,
          title: deletedSection.title,
          published: deletedSection.published,
        }
      },
    )
    setSections(refleshedSections)
  }

  useEffect(() => {
    ;(async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/section/read/${course_id}`,
      )
      console.log('res.body', res.body)
      const data = await res.json()
      console.log('data', data)
      // setSections(...preSections)
      const newSections = data.map((newSection: SectionType) => {
        return {
          course_id: newSection.course_id,
          order: newSection.order,
          title: newSection.title,
          published: newSection.published,
        }
      })
      setSections(newSections)
    })()
  }, [])

  const handleInputChange = (value: string, index: number) => {
    const newSection = {
      ...defaultCourseValues,
      title: value,
      order: index,
    }
    const newSections = sections.filter((t) => {
      return t.order !== index
    })
    setSections([...newSections, newSection])
  }
  console.log('sections', sections)

  const createSection = async (sections: SectionType[]) => {
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
          {JSON.stringify(sections)}
          <VStack>
            <FormControl maxW={'904px'}>
              {sections.map((section, index) => (
                <Box
                  key={index}
                  border={'2px solid gray'}
                  borderRadius={'2xl'}
                  p={'8px'}
                  mb={'10px'}
                >
                  <label>
                    セクション No.{index}
                    <Flex>
                      <Input
                        type="text"
                        placeholder={'セクション名'}
                        value={section.title}
                        onChange={(e) =>
                          handleInputChange(e.target.value, index)
                        }
                      />
                      <Button
                        ml={'8px'}
                        onClick={(e) => handleRemoveInput(e, index)}
                      >
                        削除
                      </Button>
                    </Flex>
                  </label>
                </Box>
              ))}

              <HStack>
                <Button type="button" onClick={() => handleAddInput()}>
                  セクションを追加
                </Button>

                {/* <Button type="button" onClick={() => handleRemoveInput()}>
                  セクションを削除
                </Button> */}
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
