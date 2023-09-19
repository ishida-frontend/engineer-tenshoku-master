'use client'
import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    router.push('/course')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <></>
}
