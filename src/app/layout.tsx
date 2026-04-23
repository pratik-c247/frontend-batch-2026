import '@/styles/globals.scss'
import { Inter } from 'next/font/google'


const inter = Inter({
  subsets: ['latin'],
  variable:'--font-inter'
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className }>{children}</body>
    </html>
  )
}
