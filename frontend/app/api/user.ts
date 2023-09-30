import { UserType } from '../../types'

export const getUser = async (userId: string): Promise<UserType> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}`,
      {
        method: 'GET',

        headers: {
          Accept: 'application/json',
        },
        credentials: 'include',
      },
    )
    const user = await res.json()

    return user
  } catch (error) {
    throw new Error('ユーザの取得に失敗しました。')
  }
}
