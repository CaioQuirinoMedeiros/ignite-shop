'use client'

import { Images } from '@/assets'
import { useCartContext } from '@/contexts/CartContext'
import classNames from 'classnames'
import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import Link from 'next/link'
import { Handbag } from 'phosphor-react'
import { CartDrawerPortal } from './cart-drawer-portal'

export function Header() {
  const { totalProducts } = useCartContext()

  return (
    <header className='p-8 w-full max-w-[1180px] mx-auto flex items-center justify-between'>
      <Link href='/'>
        <Image src={Images.logoIgniteShop} alt='Ignite shop' />
      </Link>

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button
            type='button'
            className={classNames(
              'w-[3.5rem] h-[3.5rem] rounded-md bg-elements hover:bg-opacity-75 flex items-center justify-center text-text text-[2rem] transition-all relative',
              { 'text-icon': !!totalProducts }
            )}
          >
            <Handbag />
            {!!totalProducts && (
              <span className='border-[3px] border-background absolute w-7 h-7 rounded-full flex items-center justify-center bg-main text-white font-bold text-xs top-[-10px] right-[-10px]'>
                {totalProducts}
              </span>
            )}
          </button>
        </Dialog.Trigger>
        <CartDrawerPortal isOpen />
      </Dialog.Root>
    </header>
  )
}
