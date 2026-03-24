import 'bootstrap/dist/css/bootstrap.min.css'
import { Toaster } from 'react-hot-toast'
import QueryProvider from '@/providers/QueryProvider'
import { OuterWrapper } from '@/components/common/OuterWrapper'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <OuterWrapper>
            {children}
            <Toaster />
          </OuterWrapper>
        </QueryProvider>
      </body>
    </html>
  )
}
