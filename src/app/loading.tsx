import { Images } from '@/assets'
import Image from 'next/image'
import Link from 'next/link'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { ProductsSlider } from './_components/products-slider'

const products = [
  { id: '1', image: Images.camiseta1 },
  { id: '2', image: Images.camiseta2 },
  { id: '3', image: Images.camiseta3 },
  { id: '4', image: Images.camiseta1 },
  { id: '5', image: Images.camiseta2 }
]


export default function HomeLoading() {
  return (
    <main className='w-full max-w-[calc(100vw-((100vw-1180px)/2))] ml-auto min-h-[656px]'>
      Carregando carai
    </main>
  )
}
