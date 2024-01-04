import { Image, Link } from '@chakra-ui/react'

export const LineBanner = () => {
  return (
    <Link
      href="https://utage-system.com/line/open/aEL6cT1I2zgk?mtid=qO58nDztMNCb"
      isExternal
    >
      <Image
        src="/images/img_linebanner.png"
        alt="LINEバナー"
        boxSize="210px"
        float="right"
        mr={1}
        ml={6}
        mt={22}
        mb={4}
        marginRight="auto"
      />
    </Link>
  )
}
