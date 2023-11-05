import { APIS } from '../../../../constants/paths'

export const fetchButtonStatus = async ({
  userId,
  videoId,
}: {
  userId: string | undefined
  videoId: string
}) => {
  if (!userId || !videoId) return null

  try {
    const res = await fetch(
      `${APIS.VIEWING_STATUS.GET.path(userId)}/${videoId}`,
    )
    if (!res.ok) {
      throw new Error(`ボタンのステータス取得に失敗しました: ${res.statusText}`)
    }

    const viewingStatus = await res.json()
    return viewingStatus ? { [videoId]: viewingStatus.status } : null
  } catch (error) {
    return null
  }
}

export const fetchCheckMarkStatuses = async ({
  userId,
  courseId,
}: {
  userId: string | undefined
  courseId: string
}) => {
  try {
    const res = await fetch(
      `${APIS.VIEWING_STATUS.GET.path(userId)}/${courseId}/all`,
    )
    if (!res.ok) {
      throw new Error(
        `チェックマークのステータス取得に失敗しました: ${res.statusText}`,
      )
    }
    const viewingStatuses = await res.json()
    return viewingStatuses
  } catch (error) {
    return {}
  }
}

export const upsertViewingStatus = async ({
  isWatched,
  userId,
  videoId,
}: {
  isWatched: boolean
  userId: string | undefined
  videoId: string
}) => {
  try {
    // 視聴状態を更新
    const res = await fetch(APIS.VIEWING_STATUS.UPSERT.path(userId, videoId), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isWatched,
        userId,
        videoId,
      }),
    })

    // 視聴状態がDB上になければ新規作成
    if (!res.ok) {
      const postRes = await fetch(
        APIS.VIEWING_STATUS.UPSERT.path(userId, videoId),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (!postRes.ok) {
        throw new Error(
          `視聴ステータスの更新に失敗しました: ${postRes.statusText}`,
        )
      }
    }

    const viewingStatus = await res.json()
    return { [videoId]: viewingStatus.status }
  } catch (error) {
    return {}
  }
}
