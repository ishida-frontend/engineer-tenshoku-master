import { ChakraProviders } from './chakraproviders'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <ChakraProviders>{children}</ChakraProviders>
      </body>
    </html>
  )
}
