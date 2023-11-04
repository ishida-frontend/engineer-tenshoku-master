'use client'
import React from 'react'
import useSWR from 'swr'
import { Container, VStack, StackDivider } from '@chakra-ui/react'
import { ContactType } from '../../../types'

export function ContactList() {
  const fetcher = async () =>
    (
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/contacts`)
    ).json()

  const { data, error } = useSWR('contactList', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const dataDesc = data.sort(function (a: { id: number }, b: { id: number }) {
    return b.id - a.id
  })

  return (
    <div>
      <h1>お問い合わせ一覧</h1>
      {dataDesc &&
        dataDesc.map((d: ContactType) => {
          return (
            <VStack
              key={d.id}
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
