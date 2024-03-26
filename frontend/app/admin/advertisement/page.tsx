'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdvertisementList } from '../../../components/admin/organisms/AdvertisementList'
import { AdvertisementType } from '../../../types'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/route'

export default function AdminAdvertisement() {
  const [advertisements, setAdvertisements] = useState<AdvertisementType[]>([]) // 広告データの状態を管理
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      try {
        const session = await getServerSession(authOptions)
        if (!session) {
          console.log('!session', session)
          router.push('/auth/login') // セッションがない場合はログインページにリダイレクト
          return
        }

        if (!session.user.isAdmin) {
          console.log('!session.user.isAdmin', session)
          router.push('/404') // isAdminがfalseの場合は404ページにリダイレクト
          return
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/advertisement`,
          {
            cache: 'no-cache',
          },
        )
        const data: AdvertisementType[] = await res.json()
        setAdvertisements(data) // 広告データをセット
        console.log('data', data)
        console.log('session', session)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [router])

  return <AdvertisementList advertisements={advertisements} />
}
