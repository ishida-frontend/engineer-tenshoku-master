import { AdverrisementEditor } from '../../../../../components/admin/pages/AdvertisementEditor'

export default async function AdminEditAdvertisement({
  params,
}: {
  params: { advertisementId: string }
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/advertisement/${params.advertisementId}`,
    {
      cache: 'no-cache',
    },
  )
  console.log('res', res)
  const advertisement = await res.json()

  return <AdverrisementEditor advertisement={advertisement} />
}
