import { getPayload } from 'payload'
import config from '@payload-config'
import type { CheckoutFormData } from '@repo/schemas/form-schemas'
import type { Country } from '@repo/shared-data/countries'
import { mapCartToProduct } from '@/lib/mapCartToProduct'
import { createStripeSession } from '@/lib/stripe/createStripeSession'
import { Customer } from '@/payload-types'

interface CartItem {
  productId: number
  sku: string
  variantId: string
  quantity: number
}

// type CheckoutData = CheckoutFormData & CartItems
interface CheckoutData {
  cartItems: CartItem[]
  shippingInfo: CheckoutFormData
}

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config })
    const { cartItems, shippingInfo } = (await req.json()) as CheckoutData

    if (!cartItems) {
      return Response.json({ status: 200 })
    }

    const { docs: products } = await payload.find({
      collection: 'products',
      where: {
        id: {
          in: cartItems.map((item) => item.productId),
        },
      },
    })

    const mappedCartItems = mapCartToProduct(cartItems, products)
    const order = await payload.create({
      collection: 'orders',
      data: {
        customer: 14,
        products: mappedCartItems.map((item) => ({
          product: item.id,
          productName: item.name,
          quantity: item.quantity ?? 0,
          variant: 'product.variantId',
          price: item.price,
          priceTotal: item.priceTotal,
          isFromAPI: true,
          date: new Date().toISOString(),
        })),
        date: new Date().toISOString(),
        orderDetails: {
          status: 'pending',
          total: mappedCartItems.reduce((sum, item) => sum + item.priceTotal, 0),
        },
        shipping: {
          name: shippingInfo.fullName,
          email: shippingInfo.email,
          phone: shippingInfo.phone || '',
          address: shippingInfo.shippingAddress,
          city: shippingInfo.shippingCity,
          country: shippingInfo.shippingCountry as Country,
          province: shippingInfo.shippingProvince,
          postalCode: shippingInfo.shippingPostalCode,
        },
      },
    })

    const session = await createStripeSession({
      cartItems: mappedCartItems,
      customerEmail: shippingInfo.email,
      successUrl: `${process.env.NEXT_PUBLIC_CLIENT_URL}/checkout/success?orderId=${order.id}`,
      cancelUrl: `${process.env.NEXT_PUBLIC_CLIENT_URL}/checkout/failed?orderId=${order.id}`,
      metadata: {
        orderID: order.id,
        customerID: (order.customer as Customer)?.id,
      },
    })

    return Response.json({ id: session.id, url: session.url })
  } catch (error) {
    console.log('Error during checkout:', error)

    return new Response('Error Checkout', { status: 500 })
  }
}
