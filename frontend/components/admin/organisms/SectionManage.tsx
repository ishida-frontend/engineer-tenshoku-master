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
  FormLabel,
  Switch,
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
      console.log('deleteSection', deleteSection)
      const sectionId = deleteSection.id
      console.log('sectionId', sectionId)
      console.log(
        '`${process.env.NEXT_PUBLIC_BACKEND_URL}/section/delete`',
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/section/delete`,
      )
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/section/delete`,
        {
          method: 'POST',
          body: JSON.stringify(sectionId),
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'no-cors',
        },
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
    const newSection = sections.map((section: SectionType) => {
      return {
        course_id: section.course_id,
        order: section.order,
        title: section.title,
        published: section.published,
      }
    })
    setSections(newSection)
  }

  const handleOnChange = (
    index: number,
    key: string,
    value: string | boolean,
  ) => {
    setSections(
      sections.map((section) =>
        section.order === sections[index].order
          ? { ...section, [key]: value }
          : section,
      ),
    )
  }

  const createSection = async (sections: SectionType[]) => {
    try {
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
        await res.json()
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
        await res.json()
      })
      onClose()
      showSuccessToast('保存しました。')
    } catch {
      showErrorToast('エラーにより、セクションを保存することができません。')
    }
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
                  <Flex>
                    <VStack w={'80%'} align={'start'}>
                      <Text>セクション No.{index + 1}</Text>
                      <Input
                        type="text"
                        placeholder={'セクション名'}
                        value={section.title}
                        onChange={(e) =>
                          handleOnChange(section.order, 'title', e.target.value)
                        }
                      />
                    </VStack>
                    <HStack>
                      <Box>
                        <VStack>
                          <FormLabel ml={'30px'} mb={'0px'}>
                            <Text
                              fontWeight={'bold'}
                              fontSize={'lg'}
                              w={'50px'}
                            >
                              公開
                            </Text>
                          </FormLabel>
                          <Switch
                            colorScheme="teal"
                            size={'lg'}
                            type="switch"
                            isChecked={section.published}
                            onChange={(e) =>
                              handleOnChange(
                                section.order,
                                'published',
                                !section.published,
                              )
                            }
                          />
                        </VStack>
                      </Box>
                      <Button
                        colorScheme="red"
                        ml={'8px'}
                        onClick={(e) => handleRemoveInput(e, index)}
                      >
                        削除
                      </Button>
                    </HStack>
                  </Flex>
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
