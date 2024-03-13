import { AdvertisementList } from "../../../components/admin/organisms/AdvertisementList"; 
import { AdvertisementType } from "../../../types/AdvertisementType";

export default async function AdminAdvertisement(){
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/advertisement`, {
    cache: 'no-cache'
  }) 
  const advertisements: AdvertisementType[] = await res.json()

  return <AdvertisementList advertisements={advertisements}/>
}
