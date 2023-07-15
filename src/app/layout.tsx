import { Images } from '@/assets'
import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import Image from 'next/image'

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
        <div className='flex flex-col items-start min-h-screen justify-center'>
          <header className='p-8 w-full max-w-[1180px] mx-auto'>
            <Image src={Images.logoIgniteShop} alt='Ignite shop'  />
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}
