import React, { FC, useState } from 'react'
import { Input } from '@chakra-ui/react'

interface Props {
  type: string
  name: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}

const TextInput: FC<Props> = (props) => {
  const { type, value, onChange, name, placeholder } = props

  return (
    <>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
        placeholder={placeholder}
      />
    </>
  )
}

export default TextInput
