import { Box, Text } from '@chakra-ui/react'

export const SectionProgressBar = ({
  sectionProgress,
}: {
  sectionProgress: number
}) => {
  return (
    <Box>
      <Text>進捗率{sectionProgress.toFixed(0)}%</Text>
    </Box>
  )
}
