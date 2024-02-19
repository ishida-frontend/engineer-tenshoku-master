import { AdverrisementEditor } from '../../../../../components/admin/pages/AdvertisementEditor'
import { AdvertisementType } from '../../../../../types/AdvertisementType'

export default async function AdminEditAdvertisement({
  params,
}: {
  params: { advertisementId: string }
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/advertisement/${params.advertisementId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify()

  },
  )
  console.log(' params.advertisementId', params.advertisementId)
  const advertisement: AdvertisementType = await res.json()
  console.log('res', res)
  console.log('advertisement', advertisement)

  return <AdverrisementEditor 
  advertisement={advertisement} />
}
