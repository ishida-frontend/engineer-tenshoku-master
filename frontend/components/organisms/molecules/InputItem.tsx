import React, { FC } from 'react'

interface Props {
  name: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputItem: FC<Props> = (props) => {
  const { value, onChange, name } = props
  return (
    <>
      <input
        type="text"
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
      />
    </>
  )
}

export default InputItem
