import 'keen-slider/keen-slider.min.css'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

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
      <h1 className='font-bold text-3xl text-title text-center mb-[4rem]'>
        Compra efetuada
      </h1>
      <div className='w-full bg-gradient-to-b from-[#1ea483] to-[#7465d4] rounded-md flex items-center justify-center shrink-0 max-w-[130px] h-[145px] mb-8 p-1'>
        <Image
          src={products[0].imageUrl}
          width={520}
          height={480}
          alt='product'
        />
      </div>

      <p className='text-text text-2xl text-center max-w-[37rem]'>
        Uhuul <strong>{customerName}</strong>, sua{' '}
        <strong>{products[0].name}</strong> já está a caminho da sua casa.
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
