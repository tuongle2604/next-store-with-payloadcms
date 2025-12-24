import { type CollectionConfig } from "payload";
import { registerCustomer } from "./endpoints/registerCustomer";
import { validateCustomer } from "./hooks/validateCustomer";
import { preventEmailChange } from "./hooks/preventEmailChange";
import { render } from "@react-email/components";
import { VerifyAccountEmail } from "@/components/Emails/VerifyAccountEmail";
// import { admins } from "@/access/admin";
// import { authenticated } from "@/access/authenticated";
import { disabledForgotPassword } from "./endpoints/forgotPassword";
import { countryList } from "@repo/shared-data/countries";
import { readCustomer, updateCustomer, deleteCustomer } from "@/access/customers";

export const Customers: CollectionConfig = {
  slug: "customers",
  access: {
    create: () => true,
    delete: deleteCustomer,
    read: readCustomer,
    update: updateCustomer,
  },
  labels: {
    singular: "Customer",
    plural: "Customers",
  },
  admin: {
    group: "Clients",
    defaultColumns: ["fullName", "email", "createdAt", "updatedAt"],
    useAsTitle: "fullName",
  },
  auth: {
    maxLoginAttempts: 10,
    lockTime: 30 * 1000,
    // disableLocalStrategy: true,
    // removeTokenFromResponses: true,
    verify: {
      generateEmailHTML: async ({ req, token, user }) => {
        return await render(
          await VerifyAccountEmail({
            url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/auth/verify-email?token=${token}`,
            name: user.email || "Customer",
          }),
        );
      },
      generateEmailSubject: ({ req, user }) => {
        return `Verify your email!`;
      },
    },
    cookies: {
      secure: false, // irrelevant once disabled
      sameSite: "Lax",
    },
  },
  endpoints: [registerCustomer, disabledForgotPassword],
  hooks: {
    beforeValidate: [validateCustomer, preventEmailChange],
    beforeChange: [
      async ({ data }) => {
        if (data.firstName || data.lastName) {
          return { ...data, fullName: [data.firstName, data.lastName].filter(Boolean).join(" ") };
        }

        return { ...data, fullName: data.email };
      },
    ],
    afterError: [
      ({ error, result }) => {
        console.log(error);
      },
    ],
  },
  fields: [
    {
      name: "role",
      type: "select",
      options: [{ label: "Customer", value: "customer" }],
      required: true,
      defaultValue: "customer",
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: "email",
      type: "email",
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "fullName",
      type: "text",
      admin: {
        hidden: true,
      },
      saveToJWT: true,
      // virtual: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "firstName",
          label: "First Name",
          type: "text",
          saveToJWT: true,
        },
        {
          name: "lastName",
          label: "Last Name",
          type: "text",
          saveToJWT: true,
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "phone",
          label: "Phone",
          type: "text",
          saveToJWT: true,
        },
        {
          name: "bio",
          label: "bio",
          type: "text",
        },
      ],
    },
    {
      name: "shippings",
      type: "array",
      label: "Shipping adresses",
      labels: {
        singular: "Shipping address",
        plural: "Shipping addresses",
      },
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: "@/collections/Customers/ui/RowLabels/ShippingAddressRowLabel#ShippingAddressRowLabel",
        },
      },
      fields: [
        {
          name: "name",
          type: "text",
          label: "Name",
          required: true,
        },
        {
          name: "address",
          type: "text",
          label: "Address",
          required: true,
        },
        {
          type: "row",
          fields: [
            {
              name: "city",
              type: "text",
              label: "City",
              admin: {
                width: "50%",
              },
              required: true,
            },
            {
              name: "country",
              type: "select",
              label: "Country",
              admin: {
                width: "50%",
              },
              options: [...countryList],
              required: true,
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "region",
              type: "text",
              label: "Region",
              required: true,
            },
            {
              name: "postalCode",
              type: "text",
              label: "Postal Code",
              required: true,
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "phone",
              type: "text",
              label: "Phone",
              required: true,
            },
            {
              name: "email",
              type: "text",
              label: "Email",
              required: true,
            },
          ],
        },
        {
          name: "default",
          type: "checkbox",
          label: "Default",
          defaultValue: false,
        },
      ],
    },
    {
      name: "orders",
      label: "Client Orders",
      type: "join",
      collection: "orders",
      on: "customer",
    },
    {
      name: "cart",
      type: "json",
      label: "Cart",
      admin: {
        hidden: true,
      },
    },
    {
      name: "wishlist",
      type: "json",
      label: "Wishlist",
      admin: {
        hidden: true,
      },
    },
  ],
};
