import { AuthProviders } from '../providers/AuthProviders'
import { ChakraProviders } from './chakraproviders'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <ChakraProviders>
          <AuthProviders>{children}</AuthProviders>
        </ChakraProviders>
      </body>
    </html>
  )
}
