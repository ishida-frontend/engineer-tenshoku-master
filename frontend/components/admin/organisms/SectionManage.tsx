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
import {
  SectionType,
  InitialSectionType,
  SectionManageProps,
} from '../../../types/SectionType'

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
  const [results, setResults] = useState()

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
      showErrorToast('エラーにより、セクションを削除することができません。')
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

  const handleInputChange = (index: number, key: string, value: string) => {
    setSections(
      sections.map((section) =>
        section.order === sections[index].order
          ? { ...section, [key]: value }
          : section,
      ),
    )
  }

  const createSection = async (sections: SectionType[]) => {
    const updateSections: SectionType[] = sections.filter(
      (section) =>
        initialSections.filter(
          (initialSection) => initialSection.order === section.order,
        ).length > 0,
    )

    const createSections: SectionType[] = sections.filter(
      (section) => updateSections.indexOf(section) == -1,
    )
    updateSections.map(async (updateSection) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/section/update`,
        {
          method: 'POST',
          body: JSON.stringify(updateSection),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      res.json()
    })
    createSections.map(async (createSection) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/section/create`,
        {
          method: 'POST',
          body: JSON.stringify(createSection),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      res.json()
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
                  key={section.order}
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
                          handleInputChange(
                            section.order,
                            'title',
                            e.target.value,
                          )
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
                  mb={'10'}
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
