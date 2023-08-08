import React, { FC } from 'react'
import { Flex, Text } from '@chakra-ui/react'

interface FormListProps {
  title: string
  required: boolean
}

const FormItem: FC<FormListProps> = (props) => {
  const { title, required } = props
  return (
    <>
      <Flex>
        <p>{title}</p>
        {required && <Text color="teal">(必須)</Text>}
      </Flex>
    </>
  )
}

export default FormItem
