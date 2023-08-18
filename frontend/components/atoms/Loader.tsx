import { Spinner, Stack } from '@chakra-ui/react'

import { PRIMARY_FONT_COLOR } from '../../constants/colors'

export const Loader = () => {
  return (
    <Stack direction="row" spacing={4} justify="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color={PRIMARY_FONT_COLOR}
        size="xl"
      />
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color={PRIMARY_FONT_COLOR}
        size="xl"
      />
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color={PRIMARY_FONT_COLOR}
        size="xl"
      />
    </Stack>
  )
}
