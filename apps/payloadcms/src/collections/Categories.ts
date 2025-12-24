import type { CollectionConfig } from "payload";

import { anyone } from "../access/anyone";
import { admins } from "@/access/admin";
import { slugField } from "@/fields/slug";

export const Categories: CollectionConfig = {
  slug: "categories",
  access: {
    create: admins,
    delete: admins,
    read: anyone,
    update: admins,
  },
  admin: {
    useAsTitle: "title",
    group: "Products",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    ...slugField(),
  ],
};
