import { APIS } from 'constants/paths'

export const upsertFavoriteVideo = async ({
  isFavorited,
  userId,
  videoId,
}: {
  isFavorited: boolean
  userId: string | undefined
  videoId: string
}) => {
  try {
    // お気に入り状態を更新
    const res = await fetch(APIS.FAVORITE_VIDEO.UPSERT.path(userId, videoId), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isFavorited,
        userId,
        videoId,
      }),
    })

    // お気に入り状態がDB上になければ新規作成
    if (!res.ok) {
      const postRes = await fetch(
        APIS.FAVORITE_VIDEO.UPSERT.path(userId, videoId),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (!postRes.ok) {
        throw new Error(
          `動画のお気に入りテータスの更新に失敗しました: ${postRes.statusText}`,
        )
      }
    }

    const favoriteStatus = await res.json()
    return { [videoId]: favoriteStatus.status }
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

    const favoriteStatus = await res.json()
    return favoriteStatus ? { [videoId]: favoriteStatus.status } : null
  } catch (error) {
    return null
  }
}
