import { AdvertisementTest } from "../../../../components/admin/organisms/AdvertisementTest";
import { AdvertisementType } from "../../../../types/AdvertisementType";

export default async function TestAdvertisement(){
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/advertisement`, {
    cache: 'no-cache'
  }) 
  const advertisements: AdvertisementType[] = await res.json()

  return <AdvertisementTest advertisements={advertisements}/>
}
