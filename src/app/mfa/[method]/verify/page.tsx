'use client'


import { MFA_VERIFY_COMPONENTS } from '@/constant/authMfaComponent'
import { useParams } from 'next/navigation'

export default function VerifyPage() {
  const { method } = useParams()

  const Component =
    MFA_VERIFY_COMPONENTS[method as keyof typeof MFA_VERIFY_COMPONENTS]

  return Component ? <Component /> : null
}
