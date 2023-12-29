import { Image, Link } from '@chakra-ui/react'

export const AchievementBanner = () => {
  return (
    <Link href="https://note.com/issiyrun/n/n85ef709a4b59" isExternal>
      <Image
        src="/images/img_achievementbanner.png"
        alt="実績バナー"
        boxSize="210px"
        float="right"
        mr={1}
        ml={6}
        mt={4}
        mb={22}
      />
    </Link>
  )
}
