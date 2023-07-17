'use client'
import * as React from 'react'
import { formatCurrency } from '@/utils/formatCurrency'
import Image from 'next/image'

type Product = {
  id: string
  price: number | null
  priceId: string
  description: string | null
  imageUrl: string | undefined
  name: string
}

interface ProductProps {
  product: Product
}

export const revalidate = 10

export function Product(props: ProductProps) {
  const { product } = props

  const [isCreatingCheckout, setIsCreatingCheckout] = React.useState(false)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckout(true)
      const response = await fetch(`/checkout`, {
        method: 'POST',
        body: JSON.stringify({ priceId: product.priceId })
      })

      const responseData: { checkoutUrl: string } = await response.json()

      setIsCreatingCheckout(false)
      window.location.href = responseData.checkoutUrl
    } catch (err) {
      setIsCreatingCheckout(false)
      alert('Falha ao realizar a compra')
    }
  }

  return (
    <main className='flex flex-col lg:flex-row gap-10 lg:gap-[4.5rem] px-8 w-full max-w-[1180px] mx-auto pb-8'>
      <div className='bg-gradient-to-b from-[#1ea483] to-[#7465d4] rounded-lg flex items-center justify-center shrink-0'>
        <Image
          src={product.imageUrl || ''}
          width={520}
          height={480}
          alt='product'
        />
      </div>

      <div className='flex flex-col lg:max-w-[32.5rem]'>
        <strong className='text-3xl font-bold text-text mb-4'>
          {product.name}
        </strong>
        <span className='text-3xl text-main-light mb-10'>
          {formatCurrency(product.price)}
        </span>
        <p className='text-lg text-text mb-10'>{product.description}</p>

        <button
          disabled={isCreatingCheckout}
          className='rounded-lg flex items-center justify-center bg-main [&:not(:disabled):hover]:bg-main-light transition-colors text-white font-bold text-lg min-h-[4.135rem] mt-auto disabled:opacity-60 disabled:cursor-not-allowed'
          onClick={handleBuyProduct}
        >
          Comprar agora
        </button>
      </div>
    </main>
  )
}
