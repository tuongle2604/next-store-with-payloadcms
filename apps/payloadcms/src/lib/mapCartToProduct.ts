import type { Product } from '@/payload-types'

interface CartItem {
  productId: number
  sku: string
  variantId: string
  quantity: number
}

export function mapCartToProduct(cartItems: CartItem[], products: Product[]) {
  return cartItems.map((cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId)
    const variant = product?.variants?.find((variant) => variant.id === cartItem.variantId)

    if (!product) {
      throw new Error(`Product with ID ${cartItem.productId} not found`)
    }

    return {
      // ...cartItem,
      id: product.id,
      product: product.id,
      name: product.name,
      variant: variant,
      quantity: cartItem.quantity,
      price: variant?.price,
      priceTotal: (variant?.price || 0) * cartItem.quantity,
      // price: product.pricing?.find((price) => price.currency === 'USD')?.value || 0,
      // priceTotal: (product.pricing?.find((price) => price.currency === 'USD')?.value || 0) * cartItem.quantity,
    }
  })
}
