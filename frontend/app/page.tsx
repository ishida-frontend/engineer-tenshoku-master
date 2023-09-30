'use client'
import { useEffect } from 'react'

import { useRouter } from 'next/navigation'
import { PATHS } from '../constants/paths'

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    router.push(PATHS.COURSE.LIST.path)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <></>
}
