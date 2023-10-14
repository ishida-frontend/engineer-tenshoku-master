// Tagコンポーネント作って

// Path: frontend/components/atoms/Tag.tsx

import { Tag as ChakraTag, TagLabel, TagProps } from '@chakra-ui/react'
import React from 'react'

export const Tag = (props: TagProps) => {
  return (
    <ChakraTag
      size="lg"
      variant="solid"
      colorScheme="teal"
      borderRadius="full"
      {...props}
    >
      <TagLabel>{props.children}</TagLabel>
    </ChakraTag>
  )
}
