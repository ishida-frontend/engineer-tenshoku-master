'use client'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Container, VStack, StackDivider } from '@chakra-ui/react'

export function ContactList() {
  const fetcher = async () =>
    (await fetch('http://localhost:8000/admin/contacts')).json()

  const { data, error } = useSWR('contactList', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const dataDesc = data.sort(function (a, b) {
    return b.id - a.id
  })

  return (
    <div>
      <p>お問い合わせ一覧</p>
      {dataDesc &&
        dataDesc.map((d) => {
          return (
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch"
            >
              <Container
                maxW="container.sm"
                bg="blue.600"
                h="auto"
                color="white"
                border="1px"
                p="3"
              >
                <div key={d.id}>
                  <p>ID: {d.id}</p>
                  <p>名前: {d.name}</p>
                  <p>メール: {d.email}</p>
                  <p>タイトル: {d.subject}</p>
                  <p>内容: {d.message}</p>
                </div>
              </Container>
            </VStack>
          )
        })}
    </div>
  )
}
