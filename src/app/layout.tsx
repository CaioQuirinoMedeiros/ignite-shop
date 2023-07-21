import { Images } from '@/assets'
import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { Providers } from './providers'
import { Header } from './_components/header'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal'],
  variable: '--font-roboto'
})

export const metadata: Metadata = {
  title: 'Ignite Shop'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={`${roboto.className} text-text bg-background`}>
      <body>
        <Providers>
          <div className='flex flex-col items-start min-h-screen'>
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
