'use client'

import { useRowLabel } from '@payloadcms/ui'

export const OrderProductsRowLabel = () => {
  const { data } = useRowLabel<{
    productName?: string
    quantity: number
  }>()

  if (!data.productName) {
    return <p></p>
  }

  return (
    <p>
      {data.productName} X {data.quantity}
    </p>
  )
}
