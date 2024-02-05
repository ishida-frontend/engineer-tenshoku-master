'use client'

import { Box, FormControl, Heading, Stack, FormLabel, Input, useToast, Button } from "@chakra-ui/react"
import React, { useState, FormEvent } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

export default function CreateAdvertisementPage() {
  const toast = useToast()
  const [name, setName] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [isShow, setIsShow] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [startFrom, setStartFrom] = useState<Date>();
  const [endAt, setEndAt] = useState<Date>();


  const isDisabled = name === '' || url === ''|| author === "" || imageUrl === ""
  const handleSubmit = async (event: FormEvent) => {
    setIsShow(true)

    event.preventDefault()

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/advertisement`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        url,
        author,
        isShow,
        imageUrl,
        startFrom,
        endAt
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
    setIsShow(false)
  }

  return (
    <>
     <Box w="full" maxW="600px" mx="auto" p={6}>
      <Stack spacing={4}>
       <Heading size="lg">広告登録</Heading>
       <FormControl isRequired>
       <FormLabel>広告名（必須）</FormLabel>
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
       <FormControl isRequired>
       <FormLabel> 画像 </FormLabel>
        <Input
          type="file"
          accept="image/*"
          value={imageUrl}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setImageUrl(e.target?.value)
          }
          />
          <>
            <img src="" />
          </>
       </FormControl>
       <FormControl isRequired>
       <FormLabel>企業名</FormLabel>
            <Input
              type="text"
              value={author}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAuthor(e.target?.value)
              }
              aria-required={true}
              border="1px"
              borderColor="gray.400"
            />
       </FormControl>
       <FormControl isRequired>
        <FormLabel>リンク</FormLabel>
        <Input
          type="text"
          value={url}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUrl(e.target?.value)
          }
        >
        </Input>
       </FormControl>
       <FormControl isRequired>
       <FormLabel> 開始 </FormLabel>
        <DatePicker
            dateFormat="yyyy/MM/dd HH:mm"
            locale="ja"
            selected={startFrom} 
            onChange={date => setStartFrom(date!)}
            showTimeSelect
            timeIntervals={30}>
          
        </DatePicker>
       </FormControl>
       <FormControl isRequired>
       <FormLabel> 終了 </FormLabel>
        <DatePicker
            dateFormat="yyyy/MM/dd HH:mm"
            locale="ja"
            selected={endAt} 
            onChange={date => setEndAt(date!)}
            showTimeSelect
            timeIntervals={30}>
         
        </DatePicker>
       </FormControl>
       <Button
            isDisabled={isDisabled}
            onClick={handleSubmit}
            isLoading={isShow}
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