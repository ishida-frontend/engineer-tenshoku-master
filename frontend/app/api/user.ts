import { APIS } from '../../constants/paths'
import { UserType } from '../../types'
import { UserProfileType } from '../../types'

export const getUser = async (
  userId: string | undefined,
): Promise<UserType> => {
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
    if (!res.ok) {
      return null
    }
    const user = await res.json()

    return user
  } catch (error) {
    throw new Error('ユーザの取得に失敗しました。')
  }
}

export const updateUserProfile = async (userProfile: UserProfileType) => {
  try {
    const { id, name, oneWord, goal } = userProfile
    const res = await fetch(APIS.USER_PROFILE.UPDATE.path(userProfile.id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        name,
        oneWord,
        goal,
      }),
    })

    if (!res.ok) {
      const errorData = await res.json()
      return { success: false, errors: errorData.errors }
    }

    const updatedProfile = await res.json()
    return { success: true, profile: updatedProfile }
  } catch (error) {
    throw new Error('プロフィールの更新に失敗しました。')
  }
}
