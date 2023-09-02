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
  useDisclosure,
} from '@chakra-ui/react'
import { useCustomToast } from '../../../hooks/useCustomToast'

type SectionType = {
  course_id: string
  order: number
  title: string
  published: boolean
}

type InitialSectionType = {
  id: number
  course_id: string
  order: number
  title: string
  published: boolean
}

type SectionManageProps = {
  course_id: string
  initialSections: InitialSectionType[]
}

export function SectionManage({
  course_id,
  initialSections,
}: SectionManageProps) {
  const defaultCourseValues = {
    course_id,
    order: 0,
    title: '',
    published: false,
  }
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [sections, setSections] = useState<SectionType[]>(initialSections)

  const handleAddInput = () => {
    const orderMax = sections.reduce((a, b) => (a.order > b.order ? a : b))
    const nextOrder = orderMax.order + 1
    const addSection: SectionType = {
      course_id: course_id,
      order: nextOrder,
      title: '',
      published: false,
    }
    setSections((prev) => [...prev, addSection])
  }

  const handleRemoveInput = async (e, index: number) => {
    e.preventDefault()
    try {
      const deleteSection: InitialSectionType = initialSections.find(
        (initialSection) => sections[index].order === initialSection.order,
      )
      const sectionId = deleteSection.id
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/section/delete/${sectionId}`,
      )
      const result = await res.json()
      if (res.status === 201) {
        onClose()
        showSuccessToast(result.message)
      } else if (res.status === 500) {
        showErrorToast(result.message)
      }
    } catch (error) {
      showErrorToast('エラーにより、セクションを保存することができません。')
    }

    setSections((prev) => prev.filter((item) => item !== prev[index]))
    sections.splice(index, 1)
    const newSections = sections.map((section: SectionType) => {
      return {
        course_id: section.course_id,
        order: section.order,
        title: section.title,
        published: section.published,
      }
    })
    setSections(newSections)
  }

  const handleInputChange = (value: string, index: number) => {
    const newSection = {
      ...defaultCourseValues,
      order: sections[index].order,
      title: value,
    }
    const newSections = sections.filter((t) => {
      return t.order !== sections[index].order
    })
    setSections([...newSections, newSection])
  }

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
