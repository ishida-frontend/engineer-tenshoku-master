import { FavoriteVideoList } from '../../../components/pages/FavoriteVideoList'
import { FavoriteVideoType } from '../../../types'
import Error from '../../error'

export default async function FavoriteVideos() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/favoritevideo`,
      {
        cache: 'no-cache',
      },
    )
    const favoriteVideos: FavoriteVideoType[] = await res.json()

    return <FavoriteVideoList favoriteVideos={favoriteVideos} />
  } catch (e) {
    return <Error />
  }
}
