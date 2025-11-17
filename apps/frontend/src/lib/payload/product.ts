"use server";
import api from "../utils/api";
import { Where, Product } from "@repo/cms/types";
import { buildQuery } from "../utils";
interface ProductParams {
  page?: number;
  limit?: number;
  sort?: string;
  [key: string]: string | number | undefined | null;
}

async function getProducts(params: ProductParams = {}, query?: Where) {
  const queryString = buildQuery(params, query);

  const { data, error } = await api.get<PaginatedResult<Product>>(
    `/api/products?${queryString}`
  );

  if (error) {
    return [];
  }

  return data?.docs || [];
}

async function getProductDetail(slug: string) {
  const { data, error } = await api.get<Product>(
    `/api/products/detail-by-slug/${slug}`
  );

  if (error) {
    return null;
  }

  return data;
}

async function getRelatedProducts(
  tagIds: number[] | undefined,
  productId: number
) {
  const { data, error } = await api.get<PaginatedResult<Product>>(
    `/api/products/related-by-tag?tags=${tagIds?.join(",")}&productId=${productId}`
  );

  if (error) {
    return [];
  }

  return data?.docs || [];
}

export { getProducts, getProductDetail, getRelatedProducts };
