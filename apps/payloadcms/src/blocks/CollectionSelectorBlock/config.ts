import { Block } from 'payload'

export const CollectionSelectorBlock: Block = {
  slug: 'collection-selector',
  fields: [
    {
      name: 'collectionName',
      type: 'select',
      options: [
        { label: 'Products', value: 'products' },
        { label: 'Categories', value: 'categories' },
        { label: 'Users', value: 'users' },
        // ...add your collection slugs manually
      ],
      required: true,
    },
  ],
}
