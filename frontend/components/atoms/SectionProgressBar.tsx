import { Box, Text } from "@chakra-ui/react"

export const SectionProgressBar = ({
  sectionCompletePercentage
}: {
  sectionCompletePercentage: number
}) => {
  return (
    <Box>
      <Text>
        進捗率{sectionCompletePercentage.toFixed(0)}%
      </Text>
    </Box>
  )
}
