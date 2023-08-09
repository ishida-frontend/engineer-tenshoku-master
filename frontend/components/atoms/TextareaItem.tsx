import React, { FC, useState } from 'react'
import { Textarea } from '@chakra-ui/react'

interface Props {
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder: string
}

const TextareaItem: FC<Props> = (props) => {
  const { value, onChange, placeholder } = props
  return (
    <>
      <Textarea
        value={value}
        onChange={(e) => onChange(e)}
        placeholder={placeholder}
      ></Textarea>
    </>
  )
}

export default TextareaItem
