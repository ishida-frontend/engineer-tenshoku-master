'use client'

import { Box, FormControl, Heading, Stack, FormLabel, Input, useToast, Button } from "@chakra-ui/react"
import React, { useState, FormEvent } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

export default function CreateAdvertisementPage() {
  const toast = useToast()
  const [name, setName] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<Date>();

  const isDisabled = name === '' 
  const handleSubmit = async (event: FormEvent) => {
    setIsSubmitting(true)

    event.preventDefault()

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/advertisement/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name
      }),
    })

    const data = await response.json()

    if (response.ok) {
      toast({
        title: data.message,
        status: 'success',
        position: 'top',
        duration: 3000,
      })
    } else {
      toast({
        title: data.message,
        status: 'error',
        position: 'top',
        duration: 3000,
      })
    }
    setIsSubmitting(false)
  }

  return (
    <>
     <Box w="full" maxW="600px" mx="auto" p={6}>
      <Stack spacing={4}>
       <Heading size="lg">広告登録</Heading>
       <FormControl>
       <FormLabel htmlFor="courseName">広告名（必須）</FormLabel>
            <Input
              id="courseName"
              type="text"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target?.value)
              }
              aria-required={true}
              border="1px"
              borderColor="gray.400"
            />
       </FormControl>
       <FormControl id="#" isRequired>
       <FormLabel htmlFor="courseName"> 画像 </FormLabel>
        <Input type="file" accept="image/*" />
          <>
            <img src="" />
          </>
       </FormControl>
       <FormControl>
       <FormLabel htmlFor="courseName">広告主</FormLabel>
            <Input
              id="courseName"
              type="text"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target?.value)
              }
              aria-required={true}
              border="1px"
              borderColor="gray.400"
            />
       </FormControl>
       <FormControl>
       <FormLabel htmlFor="courseName" > 開始 </FormLabel>
        <DatePicker
            dateFormat="yyyy/MM/dd HH:mm"
            locale="ja"
            selected={selectedDate} 
            onChange={date => setSelectedDate(date!)}
            showTimeSelect
            timeIntervals={30}>
          
        </DatePicker>
       </FormControl>
       <FormControl>
       <FormLabel htmlFor="courseName"> 終了 </FormLabel>
        <DatePicker
            dateFormat="yyyy/MM/dd HH:mm"
            locale="ja"
            selected={selectedDate} 
            onChange={date => setSelectedDate(date!)}
            showTimeSelect
            timeIntervals={30}>
         
        </DatePicker>
       </FormControl>

       <Button
            isDisabled={isDisabled}
            onClick={handleSubmit}
            isLoading={isSubmitting}
            colorScheme="teal"
            variant="solid"
          >
            登録
          </Button>
      </Stack>
     </Box>
    </>
  )
}