'use client'
import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated } from '@/utils/auth'
import { ROUTES } from '@/constant/routes'

interface Props {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: Props) => {
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push(ROUTES.LOGIN)
    }
  }, [router])

  return <>{children}</>
}
