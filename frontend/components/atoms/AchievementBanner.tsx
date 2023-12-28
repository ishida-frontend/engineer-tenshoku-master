import { Image, Link } from '@chakra-ui/react'

export const AchievementBanner = () => {
  // 画像を表示するためのコンポーネント
  return (
    <Link href="https://note.com/issiyrun/n/n85ef709a4b59" isExternal>
      <Image
        src="/images/img_achievementbanner.png" // 画像のURLを指定
        alt="実績バナー" // 画像の代替テキスト
        boxSize="210px" // 画像のサイズを指定（任意）
        float="right" // 右寄せにするためのスタイル
        mr={1} // 右側の余白を設定
        ml={6}
        mt={4}
        mb={22}
      />
    </Link>
  )
}
