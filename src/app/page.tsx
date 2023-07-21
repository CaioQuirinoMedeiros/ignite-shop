import { ProductsSlider } from './_components/products-slider'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { Metadata } from 'next'

type Product = {
  id: string
  price: number | null
  priceId: string
  description: string | null
  imageUrl: string | undefined
  name: string
}

export const revalidate = 60 * 5 // revalidate every 5 minutes

export const metadata: Metadata = {
  title: 'Home | Ignite Shop'
}

export default async function Home() {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products: Product[] = response.data.map((stripeProduct) => {
    const price = stripeProduct.default_price as Stripe.Price
    return {
      id: stripeProduct.id,
      price: price.unit_amount == null ? null : price.unit_amount / 100,
      priceId: price.id,
      name: stripeProduct.name,
      description: stripeProduct.description,
      imageUrl: stripeProduct.images[0]
    }
  })

  return (
    <main className='w-full max-w-[calc(100vw-((100vw-1180px)/2))] ml-auto pl-8'>
      <ProductsSlider products={products} />
    </main>
  )
}
