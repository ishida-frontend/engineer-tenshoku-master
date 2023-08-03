import { FC } from 'react'
import useSWR from 'swr'

export const ContactList: FC = () => {
  const fetcher = () => fetch('http://localhost:8000/admin/contacts')
  const { data, error } = useSWR('http://localhost:3000', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div>
      <p>お問い合わせ一覧</p>
      <p>{data}</p>
    </div>
  )
}
