import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ale Assistant - Software Compliance',
  description: 'Plataforma ética e educativa sobre Software Compliance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}