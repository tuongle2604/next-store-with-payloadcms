'use client'
import { useField, useFormFields } from '@payloadcms/ui'
import { type TextFieldClientComponent } from 'payload'
import { useEffect } from 'react'
import { useGetProduct } from '@/queries/product'

export const ProductNameField: TextFieldClientComponent = ({ path }) => {
  const { setValue } = useField<string>({ path })

  const productID = useFormFields(([fields]) => {
    const productIDPath = path.replace('productName', 'product')
    return fields[productIDPath]?.value as string
  })

  const { data: product } = useGetProduct(productID)

  useEffect(() => {
    if (!productID || !product) return

    setValue(product?.name)
  }, [productID, product])

  return null
}
