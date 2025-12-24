import { CollectionConfig } from "payload";
import { authenticated } from "@/access/authenticated";
import { admins } from "@/access/admin";
import { anyone } from "@/access/anyone";
export const ProductVariants: CollectionConfig = {
  slug: "product-variants",
  admin: {
    useAsTitle: "variant name",
    group: "Products",
  },
  access: {
    admin: authenticated,
    create: admins,
    delete: admins,
    read: authenticated,
    update: admins,
  },
  fields: [
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      required: true,
    },
    {
      name: "variant name",
      type: "text",
    },
    {
      name: "sku",
      type: "text",
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
    },
    {
      name: "stock",
      type: "number",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
  ],
};
