"use server";

import { Search } from "@repo/cms/types";
import payloadSDK from "../payloadSDK";

async function searchProducts(query: string) {
  const { data } = await payloadSDK.search.find<PaginatedResult<Search>>({
    where: {
      or: [{ title: { like: query } }, { description: { like: query } }],
    },
    depth: 2,
  });

  return data?.docs || [];
}

export { searchProducts };
