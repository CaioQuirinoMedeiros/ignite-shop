import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import classNames from 'classnames'
import { ImagesStack } from './_components/images-stack'

type SuccessPageProps = {
  params: {}
  searchParams: {
    session_id: string
  }
}

export const metadata: Metadata = {
  title: 'Compra efetuada | Ignite Shop',
  robots: { index: false }
}

export default async function SuccessPage(props: SuccessPageProps) {
  const sessionId = props.searchParams.session_id

  if (!sessionId) {
    throw new Error('No sessionId')
  }

  const response = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = response.customer_details?.name ?? ''

  const products = response.line_items
    ? response.line_items?.data.map((item) => {
        const product = item.price?.product as Stripe.Product
        const productName = product.name
        const productImageUrl = product.images[0]

        return { name: productName, imageUrl: productImageUrl }
      })
    : []

  return (
    <main className='w-full max-w-[calc(100vw-((100vw-1180px)/2))] p-8 flex flex-col items-center'>
      <ImagesStack images={products.map((product) => product.imageUrl)} />

      <h1 className='font-bold text-3xl text-title text-center mt-12 mb-6'>
        Compra efetuada
      </h1>

      <p className='text-text text-2xl text-center max-w-[37rem]'>
        Uhuul <strong>{customerName}</strong>
        {`, sua compra de ${products.length} camisas já está a caminho da sua casa.`}
      </p>

      <Link
        href='/'
        className='text-main font-bold text-xl text-center mt-[5.5rem] hover:text-main-light transition-colors'
      >
        Voltar ao catálogo
      </Link>
    </main>
  )
}
