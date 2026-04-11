import { ProtectedRoute } from '@/components/layout/ProtectedRoute'

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ProtectedRoute>{children} </ProtectedRoute>
}
