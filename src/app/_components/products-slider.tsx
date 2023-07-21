'use client'
import Image from 'next/image'
import Link from 'next/link'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { formatCurrency } from '@/utils/formatCurrency'
import { useCartContext } from '@/contexts/CartContext'
import { Handbag } from 'phosphor-react'
import { Product as ProductModel } from '@/models/Product'

type Product = {
  id: string
  price: number | null
  priceId: string
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
  const { cartItems, addOneProduct } = useCartContext()

  function handleAddProductToCard(product: Product) {
    addOneProduct(new ProductModel(product))
  }

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
              <div className='flex flex-col gap-1'>
                <strong className='text-xl font-bold text-green'>
                  {product.name}
                </strong>
                <span className='text-2xl text-main-light font-bold shrink-0'>
                  {formatCurrency(product.price)}
                </span>
              </div>
              <button
                type='button'
                className='w-[3.5rem] h-[3.5rem] rounded-md bg-main hover:bg-opacity-75 flex items-center justify-center text-white text-[2rem] transition-all'
                onClick={(e) => {
                  e.preventDefault()
                  handleAddProductToCard(product)
                }}
              >
                <Handbag />
              </button>
            </footer>
          </Link>
        )
      })}
    </main>
  )
}
