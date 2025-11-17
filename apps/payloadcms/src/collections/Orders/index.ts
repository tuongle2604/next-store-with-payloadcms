import { type CollectionConfig } from 'payload'

import { countryList } from '@repo/shared-data/countries'
import { generateID } from './hooks/generateID'
import { authenticated } from '@/access/authenticated'
import { admins } from '@/access/admin'

export const Orders: CollectionConfig = {
  slug: 'orders',
  access: {
    admin: authenticated,
    create: admins,
    delete: admins,
    read: authenticated,
    update: admins,
  },
  admin: {
    useAsTitle: 'id',
    group: 'Orders',
    defaultColumns: [
      'id',
      'customer',
      'products',
      'orderDetails.total',
      'orderDetails.status',
      'orderDetails.orderNote',
      'orderDetails.orderDate',
    ],
  },
  labels: {
    singular: 'Order',
    plural: 'Orders',
  },
  hooks: {
    beforeValidate: [generateID],
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      admin: {
        hidden: true,
      },
      required: true,
      unique: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'customer',
                  type: 'relationship',
                  relationTo: 'customers',
                  label: 'Customer',
                  admin: {
                    readOnly: true,
                  },
                },
                {
                  name: 'date',
                  label: 'Order Date',
                  type: 'date',
                  admin: {
                    readOnly: true,
                    date: {
                      pickerAppearance: 'dayAndTime',
                    },
                  },
                },
              ],
            },
            {
              name: 'products',
              type: 'array',
              label: 'Products',
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: '@/components/RowLabels/OrderProductsRowLabel#OrderProductsRowLabel',
                },
              },
              fields: [
                {
                  name: 'isFromAPI',
                  type: 'checkbox',
                  admin: { hidden: true },
                  required: true,
                  defaultValue: false,
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'product',
                      type: 'relationship',
                      relationTo: 'products',
                      admin: {
                        width: '50%',
                        readOnly: true,
                      },
                    },
                    {
                      name: 'productName',
                      type: 'text',
                      admin: {
                        readOnly: true,
                        hidden: true,
                        components: {
                          Field:
                            '@/collections/Orders/components/ProductNameField#ProductNameField',
                        },
                      },
                    },
                    {
                      name: 'variant',
                      type: 'text',
                      admin: {
                        width: '50%',
                        readOnly: true,
                        components: {
                          Field:
                            '@/collections/Orders/components/ProductVariantSelect#ProductVariantSelect',
                        },
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'price',
                      type: 'number',
                      label: 'Price per unit',
                      admin: {
                        readOnly: true,
                        components: {
                          Field:
                            '@/collections/Orders/components/ProductUnitPriceField#ProductUnitPriceField',
                        },
                        width: '33.33%',
                      },
                    },
                    {
                      name: 'quantity',
                      type: 'number',
                      label: 'Quantity',
                      defaultValue: 1,
                      admin: {
                        width: '33.33%',
                        readOnly: true,
                      },
                      required: true,
                    },
                    // {
                    //   name: 'autoprice',
                    //   type: 'checkbox',
                    //   label: 'Auto Price',
                    //   defaultValue: false,
                    //   admin: {
                    //     readOnly: true,
                    //     hidden: true,
                    //   },
                    // },
                    {
                      name: 'priceTotal',
                      type: 'number',
                      label: 'Price Total',
                      admin: {
                        width: '33.33%',
                        components: {
                          Field:
                            '@/collections/Orders/components/ProductTotalPriceField#ProductTotalPriceField',
                        },
                      },
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'shipping',
          label: 'Shipping',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Name',
              required: true,
            },
            {
              name: 'address',
              type: 'text',
              label: 'Address',
              required: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'city',
                  type: 'text',
                  label: 'City',
                  admin: {
                    width: '50%',
                  },
                  required: true,
                },
                {
                  name: 'country',
                  type: 'select',
                  label: 'Country',
                  options: [...countryList],
                  admin: {
                    width: '50%',
                  },
                  required: true,
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'province',
                  type: 'text',
                  label: 'Province',
                  admin: {
                    width: '50%',
                  },
                  required: true,
                },
                {
                  name: 'postalCode',
                  type: 'text',
                  label: 'Postal Code',
                  admin: {
                    width: '50%',
                  },
                  required: true,
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'email',
                  type: 'text',
                  label: 'Email',
                  admin: {
                    width: '50%',
                  },
                  required: true,
                },
                {
                  name: 'phone',
                  type: 'text',
                  label: 'Phone number',
                  admin: {
                    width: '50%',
                  },
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'orderDetails',
      label: 'Order Details',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'total',
              type: 'number',
              label: 'Total',
              admin: {
                components: {
                  Field:
                    '@/collections/Orders/components/OrderTotalPriceField#OrderTotalPriceField',
                },
              },
              required: true,
            },
          ],
        },
        {
          name: 'transactionID',
          type: 'text',
          label: 'Transaction ID',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'status',
          type: 'select',
          label: 'Status',
          // hooks: {
          //   afterChange: [restoreStocks], //[sendStatusEmail, restoreStocks]
          // },
          options: [
            {
              label: 'Pending',
              value: 'pending',
            },
            {
              label: 'Paid',
              value: 'paid',
            },
            {
              label: 'Unpaid',
              value: 'unpaid',
            },
            {
              label: 'Processing',
              value: 'processing',
            },
            {
              label: 'Shipped',
              value: 'shipped',
            },
            {
              label: 'Completed',
              value: 'completed',
            },
            {
              label: 'Cancelled',
              value: 'cancelled',
            },
            {
              label: 'Returned',
              value: 'returned',
            },
          ],
          required: true,
          defaultValue: 'pending',
        },
        {
          name: 'shippingDate',
          label: 'Shipping Date',
          type: 'date',
        },
        {
          name: 'trackingNumber',
          label: 'Tracking Number',
          admin: {
            readOnly: true,
          },
          type: 'text',
        },
        {
          name: 'orderNote',
          label: 'Order Note',
          type: 'textarea',
        },
      ],
    },
  ],
}
