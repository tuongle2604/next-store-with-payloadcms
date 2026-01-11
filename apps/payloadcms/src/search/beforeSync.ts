/* eslint-disable */
import { type BeforeSync, type DocToSync } from "@payloadcms/plugin-search/types";

export const beforeSyncWithSearch: BeforeSync = async ({ originalDoc, searchDoc, payload }) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc;

  const { slug, id, category, name, thumbnail, meta, description } = originalDoc;

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    slug,
    title: meta?.title || name,
    description: meta?.description || description,
    thumbnail: thumbnail,
  };

  return modifiedDoc;
};
