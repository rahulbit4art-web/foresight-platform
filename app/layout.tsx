import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Foresight to Solution — Problem Structuring Platform',
  description: 'A guided innovation platform to structure problems from discovery to refined statement.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
