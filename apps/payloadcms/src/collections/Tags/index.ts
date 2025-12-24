import type { CollectionConfig } from "payload";

import { anyone } from "../../access/anyone";
import { slugField } from "@/fields/slug";
import { admins } from "@/access/admin";

export const Tags: CollectionConfig = {
  slug: "tags",
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
