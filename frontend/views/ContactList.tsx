'use client'
import { useEffect } from 'react'
import useSWR from 'swr'

export function ContactList() {
  const fetcher = async () =>
    (await fetch('http://localhost:8000/admin/contacts')).json()

  const { data, error } = useSWR('contactList', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div>
      <p>お問い合わせ一覧</p>
      {data &&
        data.map((d) => {
          return (
            <div>
              <p>{d.id}</p>
              <p>{d.name}</p>
              <p>{d.email}</p>
              <p>{d.subject}</p>
              <p>{d.message}</p>
            </div>
          )
        })}
    </div>
  )
}
