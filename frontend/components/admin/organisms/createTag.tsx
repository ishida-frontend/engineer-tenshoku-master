'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { z, ZodError } from 'zod'
import {
  Container,
  Button,
  Flex,
  Text,
  Link,
  FormControl,
  Wrap,
  Heading,
  FormHelperText,
  FormErrorMessage,
  Center,
  Box,
  VStack,
  HStack,
  Input,
  Textarea,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

type Errors = {
  id?: string[]
  name?: string[]
  created_at?: string[]
  updated_at?: string[]
}

export function UserContactForm() {
  const router = useRouter()

  const [state, setState] = useState({
    id: '',
    name: '',
    created_at: '',
    updated_at: '',
  })
  const [errors, setErrors] = useState<Errors>({
    id: [''],
    name: [''],
    created_at: [''],
    updated_at: [''],
  })

  const ContactSchema = z.object({
    name: z
      .string()
      .min(2, { message: '2文字以上入力してください' })
      .max(50, { message: '50文字以下で入力してください' }),
  })
  type Contact = z.infer<typeof ContactSchema>
  const contact: Contact = {
    id: state.id,
    name: state.name,
    created_at: state.created_at,
    updated_at: state.updated_at
  }

  const [isChecked, setIsChecked] = useState(false)
  const toggleCheckbox = () => {
    setIsChecked(!isChecked)
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.persist()
    setState((prevState) => {
      return { ...prevState, message: e.target.value }
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    const target = e.target
    const name = target.name
    setState(() => {
      return { ...state, [name]: target.value }
    })
  }

  const fetcher = async () => {
    const res = await fetch('http://localhost:8000/tag/create', {
      method: 'POST',
      body: JSON.stringify({
        id: state.id,
        name: state.name,
        created_at: state.created_at,
        updated_at: state.updated_at,
        status: 0,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res.json()
  }

  const handleSubmit = async (event: Event) => {
    event.preventDefault()
    try {
      const result = ContactSchema.parse(contact)
      if (isChecked) {
        const res = await fetcher()
        const items = res.error.reduce(
          (accumulator, value, index: number) => {
            return { ...accumulator, [value.path]: [value.message] }
          },
          {
            [res.error[0].path]: res.error[0].message,
          },
        )
        setErrors(items as Errors)
      } 
    } catch (e) {
      if (e instanceof ZodError) {
        setErrors(e.flatten().fieldErrors as Errors)
      } else {
        router.push('/contact/done')
        console.log(e)
      }
    }
  }

  return (
    <Container bg="gray.100" maxW={'1512px'}>
      <Container bg="white" maxW={'1024px'} centerContent>
        <FormControl onSubmit={handleSubmit} maxW={'904px'}>
          <Container mt="109px" maxW={'100%'} bg={'white'} p={'0px'}>
            <FormControl
              isInvalid={!!errors.name?.[0]}
              mt={'80px'}
              mb={'40px'}
              bg={'white'}
              h={'80px'}
            >
              <Container ml={'0px'} pb={'10px'} pl={'0px'}>
                <Flex>
                  <Text>お名前</Text>
                  <Text color="teal">(必須)</Text>
                </Flex>
              </Container>
              <Input
                type="text"
                name="name"
                value={state.name}
                onChange={handleInputChange}
                placeholder={'田中　太郎'}
              />
              <FormErrorMessage>
                {errors.name && errors.name[0]}
              </FormErrorMessage>
            </FormControl>

          <Container ml={'0px'} p={'0px'}>
            <HStack>
              <input
                type="checkbox"
                name="agree"
                id="agreeCheck"
                onChange={() => toggleCheckbox()}
              />
            </HStack>
          </Container>
          <VStack>
            <Button
              onClick={handleSubmit}
              disabled={!isChecked}
              mt={'20'}
              colorScheme="teal"
            >
              送信する
            </Button>
          </VStack>
        </FormControl>
      </Container>
    </Container>
  )
}