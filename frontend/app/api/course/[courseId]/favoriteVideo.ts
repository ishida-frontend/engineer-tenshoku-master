import { APIS } from '../../../../constants/paths'

export const upsertFavoriteVideo = async ({
  favoritedStatus,
  userId,
  videoId,
}: {
  favoritedStatus: boolean
  userId: string | undefined
  videoId: string
}) => {
  if (!userId) {
    throw new Error('userId does not exist.')
  }

  try {
    const res = await fetch(APIS.FAVORITE_VIDEO.UPSERT.path(userId, videoId), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        favoritedStatus,
        userId,
        videoId,
      }),
    })

    if (!res.ok) {
      throw new Error(
        `動画のお気に入りテータスの更新に失敗しました: ${res.statusText}`,
      )
    }

    const newStatus = await res.json()
    return { [videoId]: newStatus.status }
  } catch (error) {
    return {}
  }
}

export const fetchFavButtonStatus = async ({
  userId,
  videoId,
}: {
  userId: string | undefined
  videoId: string
}) => {
  try {
    const res = await fetch(APIS.FAVORITE_VIDEO.GET.path(userId, videoId))
    if (!res.ok) {
      throw new Error(
        `動画のお気に入りテータス取得に失敗しました: ${res.statusText}`,
      )
    }

    const fetchedStatus = await res.json()
    return fetchedStatus ? { [videoId]: fetchedStatus.status } : null
  } catch (error) {
    return null
  }
}
