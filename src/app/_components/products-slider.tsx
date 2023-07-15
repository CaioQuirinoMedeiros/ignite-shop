'use client'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

type Product = { id: string; image: StaticImageData }

interface ProductsSliderProps {
  products: Product[]
}

export function ProductsSlider(props: ProductsSliderProps) {
  const { products } = props

  const [sliderRef] = useKeenSlider({ slides: { perView: 3, spacing: 48 } })

  return (
    <main
      className='flex flex-row w-full h-full keen-slider'
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
              src={product.image}
              alt='Camiseta'
              width={520}
              height={480}
              className='object-cover'
            />

            <footer className='absolute bottom-1 left-1 right-1 rounded-md flex items-center justify-between bg-[rgba(0,0,0,0.6)] p-8 translate-y-[110%] group-hover:translate-y-0 transition-transform'>
              <strong className='text-xl font-bold text-green'>
                Camiseta X
              </strong>
              <span className='text-2xl text-main-light font-bold'>
                R$ 79,80
              </span>
            </footer>
          </Link>
        )
      })}
    </main>
  )
}
