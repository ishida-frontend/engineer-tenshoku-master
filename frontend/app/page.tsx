'use client'
import { useEffect } from 'react'

import { useRouter } from 'next/navigation'
import { PATHS } from '../constants/paths'

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    router.push(PATHS.COURSE.LIST.path)
  }, [router])

  return <></>
}
