export async function getViewingStatus({
  userId,
  videoId,
}: {
  userId: string
  videoId: string
}) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/viewingstatus/${userId}/${videoId}`,
      {
        method: 'GET',

        headers: {
          Accept: 'application/json',
        },
        credentials: 'include',
      },
    )
    const viewingStatus = await res.json()

    return viewingStatus
  } catch (error) {
    throw new Error('視聴ステータス取得に失敗しました。')
  }
}
