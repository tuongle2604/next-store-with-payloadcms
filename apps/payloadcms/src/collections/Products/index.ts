import type { CollectionConfig } from "payload";
import { anyone } from "@/access/anyone";
import { admins } from "@/access/admin";
import { slugField } from "../../fields/slug";
import { productDetail } from "./endpoints/productDetail";
import { productRelated } from "./endpoints/productRelated";
import { generateSKU } from "@/utilities/generateSKU";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name", // 👈 This will be used in dropdowns instead of the ID
    defaultColumns: ["name", "thumbnail", "price", "tags", "category"],
    group: "Products",
  },
  access: {
    create: admins,
    delete: admins,
    read: anyone,
    update: admins,
  },
  endpoints: [productDetail, productRelated],
  hooks: {
    beforeValidate: [
      // async ({ data, req }) => {
      //   if (data && data.variants?.length > 0) {
      //     const variant = data.variants[0]
      //     const mediaDoc = await req.payload.findByID({
      //       collection: 'media',
      //       id: variant.images[0],
      //     })
      //     return mediaDoc.url
      //   }
      //   return ''
      // },
      // async ({ data }) => {
      //   console.log('beforeValidate - data:', data)
      //   if (data?.variants && data?.category.slug && data?.id) {
      //     data.variants = data.variants.map((variant: any) => {
      //       if (!variant.sku) {
      //         variant.sku = generateSKU({
      //           categoryCode: data?.category.slug,
      //           productId: data.id, // Payload auto-generates _id, or you can use a custom field
      //           color: variant.color,
      //           size: variant.size,
      //         })
      //       }
      //       return variant
      //     })
      //   }
      // },
    ],
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "price",
      label: "Price (First variant)",
      type: "number",
      admin: {
        // hidden: true, // Hide this field in the admin UI
        readOnly: true,
      },
    },
    {
      name: "thumbnail",
      type: "text",
      admin: {
        hidden: true,
        components: {
          Cell: "@/components/ImageCell",
        },
      },
      hooks: {
        beforeValidate: [
          async ({ data, req }) => {
            if (data && data.variants?.length > 0) {
              const variant = data.variants[0];

              const mediaDoc = await req.payload.findByID({
                collection: "media",
                id: variant.images[0],
              });

              data.thumbnail = mediaDoc?.url || "";
              console.log(mediaDoc?.url);
              console.log("here");
            }
          },
        ],
      },
    },
    {
      name: "variants",
      type: "array",
      fields: [
        {
          name: "sku",
          type: "text",
          unique: true,
          hooks: {
            beforeChange: [
              async ({ data, req }) => {
                if (!data?.category || !data?.variants) return;

                const categoryDoc = await req.payload.findByID({
                  collection: "categories",
                  id: data.category,
                });

                const categoryCode = categoryDoc?.slug;
                if (!categoryCode) {
                  throw new Error("Category code is missing in the category document.");
                }

                data.variants = data.variants.map((variant: any) => {
                  if (!variant.sku) {
                    variant.sku = generateSKU({
                      categoryCode,
                      productId: data.id, // Payload auto-generates _id, or you can use a custom field
                      color: variant.color,
                      size: variant.size,
                    });
                  }

                  return variant;
                });
              },
            ],
          },
        },
        {
          name: "color",
          type: "text",
        },
        {
          name: "size",
          type: "text",
        },
        {
          name: "price",
          type: "number",
          required: true,
        },
        {
          name: "stock",
          type: "number",
        },
        {
          name: "images",
          type: "upload",
          relationTo: "media",
          hasMany: true,
        },
      ],
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
    },
    ...slugField("name"),
  ],
};
