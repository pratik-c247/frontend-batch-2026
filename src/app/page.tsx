'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const navigate = useRouter()
  useEffect(() => {
    navigate.push('/login')
  })

  return (
    <div className="d-flex align-content-center justify-content-center">
      Hello,your are on Home page
    </div>
  )
}
