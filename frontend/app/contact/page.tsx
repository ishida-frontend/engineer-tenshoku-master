'use client'
import React from 'react'
import { useState } from 'react'
import { Box, Button, Stack, Text } from '@chakra-ui/react'
import { ContactList } from '../../components/organisms/ContactList'

export default function Page() {
  return (
    <>
      <Box>
        <ContactList />
      </Box>
    </>
  )
}
