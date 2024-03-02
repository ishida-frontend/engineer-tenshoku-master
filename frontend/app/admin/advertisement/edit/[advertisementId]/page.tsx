import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdvertisementEditor } from '../../../../../components/admin/pages/AdvertisementEditor'
import { AdvertisementType } from '../../../../../types'
import { useCustomToast } from '../../../../../hooks/useCustomToast'
import { PATHS } from '../../../../../constants'

export default async function AdminEditAdvertisement({
  params,
}: {
  params: { advertisementId: string }
}) {
  try {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/advertisement/${params.advertisementId}`,
    {
      cache: 'no-cache',
    },
  )  
  const advertisement: AdvertisementType = await res.json()
  const router = useRouter()
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const [showModalContent, setShowModalContent] = useState(true)

  const advertisementId = params.advertisementId

  const deleteAdvertisement = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/advertisement`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        advertisementId,
      }),
    },
  )
  const response =await deleteAdvertisement.json()
  if (deleteAdvertisement.ok) {
    showSuccessToast(response.message)
    setShowModalContent(false)
    setTimeout(() => {
      router.push(PATHS.ADMIN.ADVERTISEMENT.LIST.path)
    }, 4000)
  } else {
    showErrorToast(response.message)
  }

  return (
    <AdvertisementEditor advertisement={advertisement} />
  )
  } catch (e) {
    return null
  }
}
