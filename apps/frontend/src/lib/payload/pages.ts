"use server";
import { Page } from "@repo/cms/types";
import api from "../utils/api";

async function getHomePage() {
  const { data, error } = await api.get<Page>("/api/pages/detail-by-slug/home");

  if (error) {
    console.error("Error fetching home page:", error);
    return null;
  }

  return data as Page;
}

export { getHomePage };
