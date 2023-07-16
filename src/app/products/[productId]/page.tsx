import { stripe } from '@/lib/stripe'
import { formatCurrency } from '@/utils/formatCurrency'
import Image from 'next/image'
import Stripe from 'stripe'

interface ProductProps {
  params: {
    productId: string
  }
}

type Product = {
  id: string
  price: number | null
  description: string | null
  imageUrl: string | undefined
  name: string
}

export const revalidate = 10

export default async function Product(props: ProductProps) {
  const response = await stripe.products.retrieve(props.params.productId, {
    expand: ['default_price']
  })

  const product: Product = {
    id: response.id,
    get price() {
      const price = response.default_price as Stripe.Price
      return price.unit_amount == null ? null : price.unit_amount / 100
    },
    name: response.name,
    description: response.description,
    imageUrl: response.images[0]
  }

  if (!product) return null

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

        <button className='rounded-lg flex items-center justify-center bg-main hover:bg-main-light transition-colors text-white font-bold text-lg min-h-[4.135rem] mt-auto '>
          Comprar agora
        </button>
      </div>
    </main>
  )
}
