import { headers } from 'next/headers'
export const isAdmin = (
  user:
    | {
        id: string
        isAdmin: boolean
        name: string
      }
    | undefined,
) => {
  if (!user) return false
  return user && user.isAdmin
}

export const isAdminPage = () => {
  const headersList = headers()
  const headerUrl = headersList.get('x-url') || ''
  return headerUrl.includes('admin')
}
