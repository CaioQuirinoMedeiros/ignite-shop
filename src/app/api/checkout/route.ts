import { stripe } from '@/lib/stripe'
import { NextResponse, NextRequest } from 'next/server'

type PostCheckoutRequestBody = {
  checkoutItems: Array<{
    priceId: string
    quantity: number
  }>
}

type PostCheckoutResponseBody = {
  checkoutUrl: string
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<PostCheckoutResponseBody>> {
  const requestBody: PostCheckoutRequestBody = await request.json()

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    success_url: `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_URL}/`,
    line_items: requestBody.checkoutItems.map((item) => ({
      price: item.priceId,
      quantity: item.quantity
    }))
  })

  return NextResponse.json(
    { checkoutUrl: checkoutSession.url ?? '' },
    { status: 201 }
  )
}
