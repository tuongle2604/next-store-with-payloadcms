import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { admins } from '@/access/admin'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  folders: true,
  access: {
    create: admins,
    delete: admins,
    read: anyone,
    update: admins,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'prefix', //this field for integrate with s3 storage plugin
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  // hooks: {
  //   afterRead: [
  //     ({ doc }) => {
  //       console.log('*******')
  //       console.log('doc.url before:', doc.url)

  //       // const baseUrl = process.env.IMAGE_BASE_URL || ''
  //       // if (doc.url && typeof doc.url === 'string') {
  //       //   doc.url = `${baseUrl}${doc.url}`
  //       // }

  //       return doc
  //     },
  //   ],
  // },
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    // adminThumbnail: 'thumbnail',
    focalPoint: true,
    staticDir: path.resolve(dirname, '../../public/media'),
    // imageSizes: [
    //   {
    //     name: 'thumbnail',
    //     width: 300,
    //   },
    //   {
    //     name: 'square',
    //     width: 500,
    //     height: 500,
    //   },
    //   {
    //     name: 'small',
    //     width: 600,
    //   },
    //   {
    //     name: 'medium',
    //     width: 900,
    //   },
    //   {
    //     name: 'large',
    //     width: 1400,
    //   },
    //   {
    //     name: 'xlarge',
    //     width: 1920,
    //   },
    //   {
    //     name: 'og',
    //     width: 1200,
    //     height: 630,
    //     crop: 'center',
    //   },
    // ],
  },
}
