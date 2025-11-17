import Stripe from 'stripe'

export function createStripeSession({
  cartItems,
  customerEmail,
  successUrl,
  cancelUrl,
  metadata = {},
}: {
  cartItems: any[]
  customerEmail: string
  successUrl: string
  cancelUrl: string
  metadata?: Record<string, any>
}) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')

  const lineItems = cartItems.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100, // Convert to cents
    },
    quantity: item.quantity,
  }))

  return stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    customer_email: customerEmail,
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
  })
}
