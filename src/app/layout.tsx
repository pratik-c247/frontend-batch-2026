import 'bootstrap/dist/css/bootstrap.min.css'
import { Toaster } from 'react-hot-toast'
import QueryProvider from '@/providers/QueryProvider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  )
}
