'use client'
import React, { useState } from 'react'
import {
  Container,
  Button,
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
import { VideoType } from '../../../types'

type SectionManagePropsType = {
  course_id: string
  initialSections: SaveSectionType[]
}

type SaveSectionType = {
  id?: string
  course_id: string
  order: number
  title: string
  published: boolean
  videos?: VideoType[]
}
export function SectionManage({
  course_id,
  initialSections,
}: SectionManagePropsType) {
  const defaultCourseValues = {
    id: '',
    sectionType: '',
    course_id,
    order: 0,
    title: '',
    published: false,
  }
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { onClose } = useDisclosure()

  const [sections, setSections] = useState<SaveSectionType[]>(initialSections)

  if (sections[0] === undefined) {
    setSections([defaultCourseValues])
  }

  const handleAddInput = () => {
    const orderMax = sections.reduce((a, b) => (a.order > b.order ? a : b))
    const nextOrder = orderMax.order + 1
    const addSection: SaveSectionType = {
      course_id: course_id,
      order: nextOrder,
      title: '',
      published: false,
    }
    setSections((prev) => [...prev, addSection])
  }

  const handleRemoveInput = async (index: number) => {
    try {
      const deleteSection: SaveSectionType | undefined = initialSections.find(
        (initialSection) => sections[index].order === initialSection.order,
      )
      if (!deleteSection) throw new Error('セクションが見つかりません。')
      const sectionId = deleteSection.id
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/section/delete/${sectionId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
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
    const newSection = sections.map((section: SaveSectionType) => {
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
        section.order === index ? { ...section, [key]: value } : section,
      ),
    )
  }

  const createSection = async () => {
    try {
      const updateSections: SaveSectionType[] = sections.filter(
        (section) =>
          initialSections.filter(
            (initialSection) => initialSection.order === section.order,
          ).length > 0,
      )

      const createSections: SaveSectionType[] = sections.filter(
        (section) => updateSections.indexOf(section) === -1,
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
      createSections.map(async (newCreateSection) => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/section/create`,
          {
            method: 'POST',
            body: JSON.stringify(newCreateSection),
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

  const onSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()
    try {
      await createSection()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Center padding="60px 96px" bg={'gray.200'}>
      <Container
        margin={'0px'}
        padding="60px 96px"
        bg={'white'}
        centerContent
        borderRadius={'4px'}
        minW={'1000px'}
      >
        <Heading fontSize={'2xl'} fontWeight={'bold'}>
          コース内容
        </Heading>
        <Container mt="59px" bg={'white'} p={'0px'}>
          <VStack>
            <FormControl w={'100%'} overflow={'hidden'}>
              {sections.map((section, index) => (
                <Box
                  key={section.order}
                  border={'1px solid gray'}
                  borderRadius={'4px'}
                  p={'8px'}
                  mb={'10px'}
                >
                  <Container overflow={'hidden'}>
                    <HStack>
                      <Box minW={'350px'} overflow={'hidden'}>
                        <VStack align={'start'}>
                          <Text>セクション No.{section.order}</Text>
                          <Input
                            type="text"
                            placeholder={'セクション名'}
                            value={section.title}
                            onChange={(e) =>
                              handleOnChange(
                                section.order,
                                'title',
                                e.target.value,
                              )
                            }
                          />
                        </VStack>
                      </Box>
                      <Box w={'190px'} float={'right'}>
                        <HStack>
                          {/* <Box> */}
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
                              onChange={() =>
                                handleOnChange(
                                  section.order,
                                  'published',
                                  !section.published,
                                )
                              }
                            />
                          </VStack>
                          {/* </Box> */}
                          <Button
                            colorScheme="red"
                            ml={'8px'}
                            onClick={() => handleRemoveInput(index)}
                          >
                            削除
                          </Button>
                        </HStack>
                      </Box>
                    </HStack>
                  </Container>
                </Box>
              ))}

              <HStack>
                <Button type="button" onClick={() => handleAddInput()}>
                  セクションを追加
                </Button>
              </HStack>
              <VStack>
                <Button
                  mt={'15px'}
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
