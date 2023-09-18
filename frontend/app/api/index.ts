export const checkToken = async (): Promise<boolean> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/tokenVerification`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      credentials: 'include',
    },
  )
  const data = await res.json()
  return data.check
}
