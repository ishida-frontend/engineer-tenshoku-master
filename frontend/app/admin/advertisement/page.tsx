'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AdvertisementList } from '../../../components/admin/organisms/AdvertisementList'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/route'

export default function AdminAdvertisement() {
  const [advertisements, setAdvertisements] = useState([])
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      try {
        const session = await getServerSession(authOptions)
        if (!session || session.user.isAdmin !== true) {
          router.push('/404')
          return
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/advertisement`,
          {
            cache: 'no-cache',
          },
        )
        const data = await res.json()
        setAdvertisements(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [router])

  return <AdvertisementList advertisements={advertisements} />
}
