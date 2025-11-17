'use client'
import { Select, useField, useFormFields } from '@payloadcms/ui'
import { useEffect, useState } from 'react'
import { type VariantsArr } from '.'
import { useGetProduct } from '@/queries/product'

export const VariantSelectClient = ({
  path,
  readOnly,
}: {
  path: string
  readOnly: boolean | undefined
}) => {
  const { value, setValue } = useField<string>({ path })
  const [options, setOptions] = useState<
    {
      label: string
      value: string
    }[]
  >([])

  const productID = useFormFields(([fields]) => {
    const productIDPath = path.replace('variant', 'product')
    return fields[productIDPath]?.value as string
  })
  const { data: product, isLoading } = useGetProduct(productID)

  const handleVariantChange = (valueToSet: VariantsArr[number]) => {
    setValue(valueToSet.value)
  }

  useEffect(() => {
    if (!productID || !product) return

    const options = product?.variants?.map((variant) => ({
      label: variant.sku ?? '',
      value: variant.sku ?? '',
    }))

    setOptions(options ?? [])
    setValue(options?.[0]?.value ?? '')
  }, [productID, product])

  return (
    <Select
      value={{ label: value, value }}
      onChange={handleVariantChange}
      options={options ?? []}
      isLoading={isLoading}
      disabled={readOnly}
    />
  )
}
