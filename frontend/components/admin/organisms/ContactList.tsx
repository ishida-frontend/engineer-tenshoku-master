'use client'
import React from 'react'
import useSWR from 'swr'
import {
  Container,
  VStack,
  StackDivider,
  Heading,
  Center,
} from '@chakra-ui/react'
import { ContactType } from '../../../types'

export function ContactList() {
  const fetcher = async () =>
    (await fetch('http://localhost:8000/admin/contacts')).json()

  const { data, error } = useSWR('contactList', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const dataDesc = data.sort(function (a: { id: number }, b: { id: number }) {
    return b.id - a.id
  })

  return (
    <Center padding="60px 96px" bg={'gray.200'}>
      <Container padding="60px 96px" bg={'white'} borderRadius={'4px'}>
        <Heading mb={'40px'} textAlign={'center'}>
          お問い合わせ一覧
        </Heading>
        {dataDesc &&
          dataDesc.map((d: ContactType) => {
            return (
              <VStack
                key={d.id}
                divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                align="stretch"
              >
                <Container bg="gray.200" mb={'10px'} p="3" borderRadius={'4px'}>
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
      </Container>
    </Center>
  )
}
