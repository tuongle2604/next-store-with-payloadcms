import { revalidateTag } from 'next/cache'
import { type CollectionConfig } from 'payload'
import { registerCustomer } from './endpoints/registerCustomer'
import { validateCustomer } from './hooks/validateCustomer'
import { preventEmailChange } from './hooks/preventEmailChange'
import { render } from '@react-email/components'
import { VerifyAccountEmail } from '@/components/Emails/VerifyAccountEmail'
import { admins } from '@/access/admin'
import { authenticated } from '@/access/authenticated'
import { disabledForgotPassword } from './endpoints/forgotPassword'

export const Customers: CollectionConfig = {
  slug: 'customers',
  access: {
    admin: authenticated,
    create: admins,
    delete: admins,
    read: authenticated,
    update: admins,
  },
  labels: {
    singular: 'Customer',
    plural: 'Customers list',
  },
  admin: {
    group: 'Clients',
    defaultColumns: ['fullName', 'email', 'createdAt', 'updatedAt'],
    useAsTitle: 'fullName',
  },
  auth: {
    maxLoginAttempts: 10,
    lockTime: 30 * 1000,
    removeTokenFromResponses: true,
    verify: {
      generateEmailHTML: async ({ req, token, user }) => {
        return await render(
          await VerifyAccountEmail({
            url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/verify-email?token=${token}`,
            name: user.fullName ?? 'Customer',
          }),
        )
      },
      generateEmailSubject: ({ req, user }) => {
        return `Verify your email!`
      },
    },
    cookies: {
      // secure: true,
      sameSite: 'Lax',
      secure: false,
      // domain: 'hhttp://localhost:8080/',
    },
  },
  endpoints: [registerCustomer, disabledForgotPassword],
  hooks: {
    beforeValidate: [validateCustomer, preventEmailChange],
    beforeChange: [
      async ({ data }) => {
        return { ...data, fullName: `${data.firstName} ${data.lastName}` }
      },
    ],
    afterError: [
      ({ error, result }) => {
        console.log(error)
      },
    ],
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'fullName',
      type: 'text',
      admin: {
        hidden: true,
      },
      saveToJWT: true,
      // virtual: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          label: 'First Name',
          type: 'text',
        },
        {
          name: 'lastName',
          label: 'Last Name',
          type: 'text',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'birthDate',
          label: 'Birth Date',
          type: 'date',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'lastBuyerType',
          label: 'Last Buyer Type',
          type: 'select',
          admin: {
            width: '50%',
          },
          options: [
            { value: 'individual', label: 'Individual' },
            { value: 'company', label: 'Company' },
          ],
        },
      ],
    },
    {
      name: 'shippings',
      type: 'array',
      label: 'Shipping adresses',
      // labels: {
      //   singular: {
      //     en: "Shipping address",
      //     pl: "Adres dostawy",
      //   },
      //   plural: {
      //     en: "Shipping addresses",
      //     pl: "Adresy dostaw",
      //   },
      // },
      // admin: {
      //   initCollapsed: true,
      //   components: {
      //     RowLabel:
      //       "@/collections/Customers/ui/RowLabels/ShippingAddressRowLabel#ShippingAddressRowLabel",
      //   },
      // },
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
              type: 'text',
              // type: "select",
              // label: {
              //   en: "Country",
              //   pl: "Kraj",
              // },
              // admin: {
              //   width: "50%",
              // },
              // options: [...countryList],
              required: true,
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'region',
              type: 'text',
              label: 'Region',
              required: true,
            },
            {
              name: 'postalCode',
              type: 'text',
              label: 'Postal Code',
              required: true,
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'phone',
              type: 'text',
              label: 'Phone',
              required: true,
            },
            {
              name: 'email',
              type: 'text',
              label: 'Email',
              required: true,
            },
          ],
        },
        {
          name: 'default',
          type: 'checkbox',
          label: 'Default',
          defaultValue: false,
        },
      ],
    },
    // {
    //   name: "orders",
    //   label: {
    //     en: "Client Orders",
    //     pl: "Zamówienia klienta",
    //   },
    //   type: "join",
    //   collection: "orders",
    //   on: "customer",
    // },
    {
      name: 'cart',
      type: 'json',
      label: 'Cart',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'wishlist',
      type: 'json',
      label: 'Wishlist',
      admin: {
        hidden: true,
      },
    },
  ],
}
