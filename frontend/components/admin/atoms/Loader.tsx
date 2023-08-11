import { Box } from '@chakra-ui/react'
import BeatLoader from 'react-spinners/BeatLoader'

const Loader = () => {
  return (
    <Box display="flex" justifyContent="center">
      <BeatLoader color="teal" size={30} />
    </Box>
  )
}

export default Loader
