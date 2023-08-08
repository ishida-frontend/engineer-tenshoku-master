import React, { FC } from 'react'
import { Input } from '@chakra-ui/react'

interface Props {
  name: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}

const InputItem: FC<Props> = (props) => {
  const { value, onChange, name, placeholder } = props
  return (
    <>
      <Input
        type="text"
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
        placeholder={placeholder}
      />
    </>
  )
}

export default InputItem
