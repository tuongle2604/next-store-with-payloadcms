import { CollectionConfig } from 'payload'

export const ProductVariants: CollectionConfig = {
  slug: 'product-variants',
  admin: {
    useAsTitle: 'variant name',
  },
  fields: [
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
    },
    {
      name: 'variant name',
      type: 'text',
    },
    {
      name: 'sku',
      type: 'text',
    },
    {
      name: 'color',
      type: 'text',
    },
    {
      name: 'size',
      type: 'text',
    },
    {
      name: 'price',
      type: 'number',
    },
    {
      name: 'stock',
      type: 'number',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
