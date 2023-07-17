import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { Product } from './_components/product'
import { Metadata } from 'next'
import { cache } from 'react'

interface ProductPageProps {
  params: {
    productId: string
  }
}

type Product = {
  id: string
  price: number | null
  priceId: string
  description: string | null
  imageUrl: string | undefined
  name: string
}

export const revalidate = 10

const cachedGetProduct = cache(async function getProduct(productId: string) {
  const response = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = response.default_price as Stripe.Price

  return {
    id: response.id,
    price: price.unit_amount == null ? null : price.unit_amount / 100,
    priceId: price.id,
    name: response.name,
    description: response.description,
    imageUrl: response.images[0]
  } as Product
})

export async function generateMetadata(
  props: ProductPageProps
): Promise<Metadata> {
  const { params } = props

  const product = await cachedGetProduct(params.productId)

  return {
    title: `${product.name} - Ignite Shop`
  }
}

export default async function ProductPage(props: ProductPageProps) {
  const { params } = props

  const product = await cachedGetProduct(params.productId)

  if (!product) return null

  return <Product product={product} />
}
