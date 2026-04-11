'use client'
import { MFA_SETUP_COMPONENTS } from '@/constant/authMfaComponent'
import { useParams } from 'next/navigation'

export default function SetupPage() {
  const { method } = useParams()

  const Component =
    MFA_SETUP_COMPONENTS[method as keyof typeof MFA_SETUP_COMPONENTS]

  if (!Component) {
    return <div>Invalid method</div>
  }

  return <Component />
}
