'use client'
import React from 'react'
import { useState } from 'react'
import { Box } from '@chakra-ui/react'
import { ContactList } from '../../../adminComponents/organisms/ContactList'

export default function Page() {
  return (
    <>
      <Box>
        <ContactList />
      </Box>
    </>
  )
}
