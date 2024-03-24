import { useRouter } from 'next/navigation'
import { useCustomToast } from './useCustomToast'

export const useDeleteItem = () => {
  const router = useRouter()
  const { showSuccessToast, showErrorToast } = useCustomToast()

  const deleteItem = async ({ id, itemToDelete }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${itemToDelete}/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        },
      )

      const result = await response.json()
      if (response.ok) {
        showSuccessToast(result.message)
        setTimeout(() => {
          router.push(`/admin/${itemToDelete}`)
        }, 4000)
      } else {
        showErrorToast(result.message)
      }
    } catch (error) {
      showErrorToast('削除に失敗しました。')
    }
  }

  return { deleteItem }
}
