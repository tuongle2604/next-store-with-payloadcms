import api from "../utils/api";
import { Product } from "./payload-types";
import { PaginatedResult } from "../types";

async function getProducts() {
  try {
    const result: PaginatedResult<Product> = await api.get(
      "http://localhost:3000/api/products"
    );

    return result?.docs;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error creating post: ${error.message}`);
    }
    throw new Error("An unknown error occurred");
  }
}

async function getProductDetail(slug: string) {
  const result: Product = await api.get(
    `http://localhost:3000/api/products/detail-by-slug/${slug}`
  );

  return result;
}

export { getProducts, getProductDetail };
