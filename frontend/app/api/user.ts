import { APIS } from 'constants/paths'
import { UserType } from '../../types'
import { UserProfileType } from 'types'

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
    const user = await res.json()

    return user
  } catch (error) {
    throw new Error('ユーザの取得に失敗しました。')
  }
}

export const updateUserProfile = async (userProfile: UserProfileType) => {
  try {
    const res = await fetch(APIS.USER_PROFILE.UPDATE.path(userProfile.id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: userProfile.id,
        name: userProfile.name,
        oneWord: userProfile.oneWord,
        goal: userProfile.goal,
      }),
    })

    const updatedProfile = await res.json()
    return updatedProfile
  } catch (error) {
    throw error
  }
}
