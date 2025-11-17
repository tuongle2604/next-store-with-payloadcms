import { Block } from 'payload'

export const RelatedContentBlock: Block = {
  slug: 'related-content',
  fields: [
    {
      name: 'relatedItem',
      type: 'relationship',
      relationTo: ['categories'],
    },
  ],
}
