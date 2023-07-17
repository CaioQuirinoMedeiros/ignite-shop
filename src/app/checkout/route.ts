import { stripe } from '@/lib/stripe'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const requestBody = await request.json()

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    success_url: `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_URL}/`,
    line_items: [{ price: requestBody.priceId, quantity: 1 }]
  })

  return NextResponse.json(
    { checkoutUrl: checkoutSession.url },
    { status: 201 }
  )
}
