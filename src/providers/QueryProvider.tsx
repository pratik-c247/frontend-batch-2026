'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface Props{
  children:React.ReactNode
}
const client = new QueryClient()
export default function QueryProvider({ children }:Props) {
  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  )
}


