import React from 'react'
import { AdverrisementEditor } from '../../../../../components/admin/pages/AdvertisementEditor'
import { AdvertisementType } from '../../../../../types/AdvertisementType'

export default async function AdminEditAdvertisement({
  params,
}: {
  params: { advertisementId: string }
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/advertisement/edit/${params.advertisementId}`,
    {
      method: 'PUT',
    },
  )
  console.log('res', res)
  const advertisement: AdvertisementType = await res.json()
  console.log('advertisement', advertisement)

  return <AdverrisementEditor advertisement={advertisement} />
}
