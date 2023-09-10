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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react'
import { useCustomToast } from '../../hooks/useCustomToast'
import { CourseDetailPropsType } from '../../types/CourseType'

export function CourseDetail({
  courseData,
}: {
  courseData: CourseDetailPropsType
}) {
  console.log('courseData', courseData)
  console.log('courseData.sections', courseData.sections)
  return (
    <Center minH={'100vh'} bg={'gray.200'}>
      <Container padding={'60px 96px'} bg={'white'}>
        <Container overflow={'hidden'} bg={'yellow'}>
          <Box bg={'teal'} w={'427px'} float={'right'}>
            <Text color={'white'}>accordion</Text>
            <Accordion allowToggle>
              {courseData.sections.map((section) => (
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        <Text>{section.title}</Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Box>
          <Box bg={'gray'} mr={'430px'} overflow={'hidden'}>
            <Text color={'white'}>動画のiframe</Text>
            <Text
              fontSize={'2xl'}
              mb={'42px'}
              textAlign={'center'}
              fontWeight={'bold'}
              color={'white'}
            >
              セクションNoと動画のタイトル
            </Text>
          </Box>
        </Container>
      </Container>
    </Center>
  )
}
