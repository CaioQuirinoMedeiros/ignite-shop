'use client'

import * as React from 'react'
import { useCartContext } from '@/contexts/CartContext'
import { formatCurrency } from '@/utils/formatCurrency'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import Image from 'next/image'
import * as ScrollArea from '@radix-ui/react-scroll-area'

interface CartDrawerProps {
  isOpen: boolean
}

export function CartDrawerPortal(props: CartDrawerProps) {
  const {
    cartItems,
    totalCartPrice,
    totalProducts,
    removeOneProduct,
    clearCart
  } = useCartContext()

  const [isCreatingCheckout, setIsCreatingCheckout] = React.useState(false)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckout(true)

      const checkoutBody = {
        checkoutItems: cartItems.map((item) => ({
          priceId: item.product.priceId,
          quantity: item.quantity
        }))
      }

      const response = await fetch(`/api/checkout`, {
        method: 'POST',
        body: JSON.stringify(checkoutBody)
      })

      const responseData: { checkoutUrl: string } = await response.json()

      clearCart()
      setIsCreatingCheckout(false)
      window.location.href = responseData.checkoutUrl
    } catch (err) {
      alert('Falha ao realizar a compra')
    } finally {
      setIsCreatingCheckout(false)
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='fixed inset-0 w-full h-full bg-[rgba(0,0,0,0.75)]' />
      <Dialog.Content className='flex flex-col min-w-[32rem] rounded-md p-12 bg-elements fixed top-0 bottom-0 right-0'>
        <Dialog.Close className='self-end text-icon text-2xl hover:opacity-50 transition-opacity'>
          <X />
        </Dialog.Close>

        <Dialog.Title className='text-title font-bold text-xl mb-8'>
          Sacola de compras
        </Dialog.Title>

        <ScrollArea.Root className='flex flex-col overflow-hidden pr-4 mb-8'>
          <ScrollArea.Viewport>
            <div className='flex flex-col gap-6'>
              {cartItems.map((cartItem) => {
                return (
                  <div
                    key={cartItem.product.id}
                    className='flex flex-row gap-5'
                  >
                    <div className='bg-gradient-to-b from-[#1ea483] to-[#7465d4] rounded-lg flex items-center justify-center shrink-0'>
                      <Image
                        src={cartItem.product.imageUrl ?? ''}
                        alt={cartItem.product.name}
                        width={100}
                        height={93}
                        className='object-contain'
                      />
                    </div>

                    <div className='flex flex-col items-start grow'>
                      <span className='text-text text-lg'>
                        {cartItem.product.name}
                      </span>
                      <strong className='font-bold text-lg text-title mb-2'>
                        {formatCurrency(cartItem.totalPrice)}
                      </strong>
                      <div className='flex flex-row items-center justify-between self-stretch mt-auto'>
                        <button
                          className='text-main font-bold text-base hover:text-main-light transition-colors'
                          onClick={() => removeOneProduct(cartItem.product.id)}
                        >
                          Remover
                        </button>
                        <span className='text-white text-base ml-auto'>
                          {cartItem.quantity}x
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation='horizontal'>
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
          <ScrollArea.Scrollbar
            orientation='vertical'
            className='flex select-none touch-none w-3 p-[2px] bg-gray-400/50 transition-all'
          >
            <ScrollArea.Thumb className='bg-background grow relative rounded-full' />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>

        <footer className='flex flex-col mt-auto shrink-0'>
          <div className='flex flex-row items-center justify-between text-base text-title mb-2'>
            <span>Quantidade</span>
            <span>{`${totalProducts} itens`}</span>
          </div>
          <div className='flex flex-row items-center justify-between text-lg font-bold text-title'>
            <strong>Valor total</strong>
            <strong>{formatCurrency(totalCartPrice)}</strong>
          </div>

          <button
            disabled={isCreatingCheckout}
            className='mt-[3.5rem] rounded-lg flex items-center justify-center bg-main [&:not(:disabled):hover]:bg-main-light transition-colors text-white font-bold text-lg min-h-[4.135rem] disabled:opacity-60 disabled:cursor-not-allowed'
            onClick={handleBuyProduct}
          >
            Finalizar compra
          </button>
        </footer>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
