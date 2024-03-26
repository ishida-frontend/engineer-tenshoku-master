import { usePathname } from 'next/navigation'
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
  return !(user && user.isAdmin)
}

export const isAdminPage = () => {
  const pathname = usePathname()
  return pathname.includes('admin')
}
