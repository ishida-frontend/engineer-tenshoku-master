import React, { FC, useState } from 'react'

interface Props {
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextareaItem: FC<Props> = (props) => {
  const { value, onChange } = props
  return (
    <>
      <textarea value={value} onChange={(e) => onChange(e)}></textarea>
    </>
  )
}

export default TextareaItem
