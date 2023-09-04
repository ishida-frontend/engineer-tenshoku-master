import { AuthProviders } from '../providers/AuthProviders'
import { ChakraProviders } from './chakraproviders'
import { Header } from './header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <ChakraProviders>
          <AuthProviders>
            <Header />
            {children}
          </AuthProviders>
        </ChakraProviders>
      </body>
    </html>
  )
}
