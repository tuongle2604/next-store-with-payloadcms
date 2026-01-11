"use server";

import { Search } from "@repo/cms/types";
import payloadSDK from "../payloadSDK";
// import { delay } from "../utils";

async function searchProducts(query: string) {
  // await delay(3000);

  const { data } = await payloadSDK.search.find<PaginatedResult<Search>>({
    where: {
      or: [{ title: { like: query } }, { description: { like: query } }],
    },
    depth: 2,
  });

  return data?.docs || [];
}

export { searchProducts };
