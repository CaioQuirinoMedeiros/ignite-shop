'use client'
import Image from 'next/image'
import Link from 'next/link'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { formatCurrency } from '@/utils/formatCurrency'

type Product = {
  id: string
  price: number | null
  description: string | null
  imageUrl: string | undefined
  name: string
}

interface ProductsSliderProps {
  products: Product[]
}

export function ProductsSlider(props: ProductsSliderProps) {
  const { products } = props

  const [sliderRef] = useKeenSlider({ slides: { perView: 2.5, spacing: 48 } })

  return (
    <main
      className='flex flex-row w-full h-full pr-8 keen-slider'
      ref={sliderRef}
    >
      {products.map((product) => {
        return (
          <Link
            key={product.id.toString()}
            href={`/products/${product.id}`}
            className='bg-gradient-to-b from-[#1ea483] to-[#7465d4] rounded-lg relative flex items-center justify-center group overflow-hidden min-w-[540px] keen-slider__slide'
          >
            <Image
              src={product.imageUrl || ''}
              alt='Camiseta'
              width={520}
              height={480}
              className='object-cover'
            />

            <footer className='absolute bottom-1 left-1 right-1 rounded-md flex items-center justify-between bg-[rgba(0,0,0,0.6)] p-8 translate-y-[110%] group-hover:translate-y-0 transition-transform gap-3'>
              <strong className='text-xl font-bold text-green'>
                {product.name}
              </strong>
              <span className='text-2xl text-main-light font-bold shrink-0'>
                {formatCurrency(product.price)}
              </span>
            </footer>
          </Link>
        )
      })}
    </main>
  )
}
