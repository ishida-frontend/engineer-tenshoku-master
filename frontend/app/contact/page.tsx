'use client'
import { useState } from 'react'
import { Box, Button, Stack, Text } from '@chakra-ui/react'
import { ContactList } from '../../components/organisms/ContactList'
import React from 'react'

export default function Page() {
  return (
    <>
      <Box>
        <ContactList />
      </Box>
    </>
  )
}
