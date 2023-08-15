import { useToast } from '@chakra-ui/react'

export const useCustomToast = () => {
  const toast = useToast()

  const showSuccessToast = (description: string) => {
    toast({
      title: '成功',
      description: description,
      status: 'success',
      position: 'top',
      duration: 3000,
      isClosable: true,
    })
  }

  const showErrorToast = (description: string) => {
    toast({
      title: 'エラー',
      description: description,
      status: 'error',
      position: 'top',
      duration: 3000,
      isClosable: true,
    })
  }

  return {
    showSuccessToast,
    showErrorToast,
  }
}
