import 'bootstrap/dist/css/bootstrap.min.css'
import { OuterWrapper } from '@/components/common/OuterWrapper'

export default function OuterLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <OuterWrapper>{children}</OuterWrapper>
}

// export default function DashboardLayout({ children }) {
//   return (
//     <div className="dashboard">
//       <Sidebar />
//       <main>{children}</main>
//     </div>
//   )
// }
