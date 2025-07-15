import api from "../utils/api";
import { Page } from "./payload-types";
async function getHomePage(): Promise<Page> {
  const result: Page = await api.get(
    "http://localhost:3000/api/pages/detail-by-slug/home"
  );

  return result;
}

export { getHomePage };
