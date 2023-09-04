'use client'
import { Providers } from '../providers'
import { Header } from './header'
import { Main } from './main'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <Providers>
          <Main>{children}</Main>
        </Providers>
      </body>
    </html>
  )
}
