import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { slugField } from '../../fields/slug'
import { productDetail } from './endpoints/productDetail'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name', // 👈 This will be used in dropdowns instead of the ID
    defaultColumns: ['name', 'thumbnail', 'variants', 'tags', 'category'],
  },
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  endpoints: [productDetail],
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'thumbnail',
      type: 'text',
      admin: {
        hidden: true,
        components: {
          Cell: '@cms/components/ImageCell',
        },
      },
      hooks: {
        beforeValidate: [
          async ({ data, req }) => {
            if (data && data.variants.length > 0) {
              const variant = data.variants[0]

              const mediaDoc = await req.payload.findByID({
                collection: 'media',
                id: variant.images[0],
              })

              return mediaDoc
            }
          },
        ],
      },
    },
    {
      name: 'variants',
      type: 'array',
      fields: [
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
          required: true,
        },
        {
          name: 'stock',
          type: 'number',
        },
        {
          name: 'images',
          type: 'upload',
          relationTo: 'media',
          hasMany: true,
        },
      ],
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
    },
    ...slugField('name'),
  ],
}
