'use client'
import { NumberField, useField, useFormFields } from '@payloadcms/ui'
import { type SanitizedFieldPermissions, type NumberFieldClient } from 'payload'
import { useEffect } from 'react'
import { useGetProduct } from '@/queries/product'

export const ProductUnitPriceFieldClient = ({
  path,
  field,
  schemaPath,
  permissions,
}: {
  path: string
  field: Omit<NumberFieldClient, 'type'> & Partial<Pick<NumberFieldClient, 'type'>>
  schemaPath?: string
  permissions?: SanitizedFieldPermissions
}) => {
  const { setValue } = useField<number>({ path })

  const productID = useFormFields(([fields]) => {
    const productIDPath = path.replace('price', 'product')
    return fields[productIDPath]?.value as string
  })

  const variantSKU = useFormFields(([fields]) => {
    const variantSKUPath = path.replace('price', 'variant')
    return fields[variantSKUPath]?.value as string
  })

  const { data: product } = useGetProduct(productID)

  useEffect(() => {
    if (!variantSKU || !product) return

    const variant = product?.variants?.find((v) => v.sku === variantSKU)
    setValue(variant?.price)
  }, [variantSKU, product])

  return (
    <div className="no-twp">
      <NumberField readOnly={true} field={field} path={path} />
    </div>
  )
}
