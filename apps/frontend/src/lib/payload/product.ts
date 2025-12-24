"use server";
import { Product } from "@repo/cms/types";
import payloadSDK from "../payloadSDK";
interface ProductParams {
  page?: number;
  limit?: number;
  sort?: string;
  [key: string]: string | number | undefined | null;
}

async function getProducts(params: ProductParams = {}) {
  const { data } = await payloadSDK.products.find<PaginatedResult<Product>>(params);

  return data?.docs || [];
}

async function getProductsByCategory(category: string, params: ProductParams) {
  const { data } = await payloadSDK.products.find<PaginatedResult<Product>>({
    where: {
      "category.slug": {
        equals: category,
      },
    },
    depth: 2,
  });

  return data?.docs || [];
}

async function getProductDetail(slug: string) {
  const { data } = await payloadSDK.products.find<PaginatedResult<Product>>({
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
  });

  return data?.docs[0];
}

async function getRelatedProducts(tagIds: number[] | undefined, productId: number) {
  const { data } = await payloadSDK.products.find<PaginatedResult<Product>>({
    where: {
      and: [
        {
          tags: {
            in: tagIds?.join(","),
          },
        },
        {
          id: {
            not_equals: productId,
          },
        },
      ],
    },
    depth: 1, // optional, depending on your data needs
    limit: 4, // limit to 4 related products
  });

  return data?.docs || [];
}

export { getProducts, getProductsByCategory, getProductDetail, getRelatedProducts };
