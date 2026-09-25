import { Bebas_Neue, Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import './globals.css'

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  title: 'Klassic Lubricants',
  description: 'Premium lubricants distributor',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bebas.variable} ${inter.variable}`}>
        <Nav />
        {children}
      </body>
    </html>
  )
}