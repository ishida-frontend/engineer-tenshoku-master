'use client'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

export function ContactList() {
  const fetcher = async () =>
    (await fetch('http://localhost:8000/admin/contacts')).json()

  const { data, error } = useSWR('contactList', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const dataDesc = data.sort((a, b) => a.id - b.id)

  return (
    <div>
      <p>お問い合わせ一覧</p>
      {dataDesc &&
        dataDesc.map((d) => {
          return (
            <div>
              <ul>
                <li>{d.id}</li>
                <li>{d.name}</li>
                <li>{d.email}</li>
                <li>{d.subject}</li>
                <li>{d.message}</li>
              </ul>
            </div>
          )
        })}
    </div>
  )
}
