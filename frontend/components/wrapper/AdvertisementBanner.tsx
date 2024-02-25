import { AdvertisementBanner } from '../atoms/AdvertisementBanner' 
import { AdvertisementType } from '../../types/AdvertisementType'

export async function AdBannerData() {
  console.log('確認')
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/advertisement/test`,
    {
      cache: 'no-cache',
    },
  )
  const advertisements: AdvertisementType[] = await res.json()

  return <AdvertisementBanner advertisements={advertisements} />
}
