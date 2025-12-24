"use server";
import { Page } from "@repo/cms/types";
// import api from "../utils/api";
import payloadSDK from "../payloadSDK";

async function getHomePage() {
  const { data } = await payloadSDK.pages.find<PaginatedResult<Page>>({
    where: {
      slug: {
        equals: "home",
      },
    },
    depth: 2,
  });

  return data?.docs[0];
}

export { getHomePage };
