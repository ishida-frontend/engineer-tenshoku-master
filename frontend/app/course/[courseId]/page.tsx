'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AspectRatio,
  Flex,
  Heading,
  HStack,
  Stack,
  VStack,
} from '@chakra-ui/react'
import useSWR from 'swr'

import { Loader } from '../../../components/atoms/Loader'
import { useCustomToast } from '../../../hooks/useCustomToast'
import { SectionType, VideoType } from '../../../types'

export default function CourseDetailPage() {
  const { showErrorToast } = useCustomToast()

  const courseId = useParams().courseId
  console.log('courseId:', courseId)
  console.log('type of courseId:', typeof courseId)

  const courseFetcher = async () => {
    return fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${courseId}`,
    ).then((res) => res.json())
  }

  const {
    data: courseData,
    error,
    isLoading,
  } = useSWR(`course${courseId}`, courseFetcher)
  console.log('courseData:', courseData)

  if (error) showErrorToast('データの取得に失敗しました')
  if (isLoading) return <Loader />

  return (
    <>
      {/* <HStack spacing={4} alignItems="start"> */}
      <AspectRatio maxW="1087px" ratio={16 / 9}>
        <iframe
          title="naruto"
          src="https://www.youtube.com/embed/YCnUl0eXFvs"
          allowFullScreen
        />
      </AspectRatio>
      {/* <VStack width="full" maxW="400px">
          {courseData?.sections?.map((section: SectionType) => (
            <Accordion allowToggle key={section.id}>
              <AccordionItem>
                <VStack p={5} bgColor="gray.200" minW="600px" borderRadius={9}>
                  <AccordionButton>
                    <AccordionIcon />
                    <Heading size="sm" ml={2}>
                      Section {section.id} - {section.title}
                    </Heading>
                  </AccordionButton>
                  <AccordionPanel p={1}>Test</AccordionPanel>
                </VStack>
              </AccordionItem>
            </Accordion>
          ))}
        </VStack>
      </HStack> */}
    </>
  )
}
