import { Image, Link } from '@chakra-ui/react'

export const LineBanner = () => {
  // 画像を表示するためのコンポーネント
  return (
    <Link
      href="https://utage-system.com/line/open/aEL6cT1I2zgk?mtid=qO58nDztMNCb"
      isExternal
    >
      <Image
        src="/images/img_linebanner.png" // 画像のURLを指定
        alt="LINEバナー" // 画像の代替テキスト
        boxSize="210px" // 画像のサイズを指定（任意）
        float="right" // 右寄せにするためのスタイル
        mr={1} // 右側の余白を設定
        ml={6}
        mt={22}
        mb={4}
      />
    </Link>
  )
}
