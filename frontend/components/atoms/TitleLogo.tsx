'use client'
import { Image } from '@chakra-ui/react'

import jsLogo from '../../public/images/img_js.png'

export const TitleLogo = ({ boxSize = '' }) => {
  return <Image boxSize={boxSize} src={jsLogo.src} alt="JSロゴ" />
}
