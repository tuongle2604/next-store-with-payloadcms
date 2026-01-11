import { PayloadSDK } from "@payloadcms/sdk";
import type { Config } from "@repo/cms/payload-types";
import { cookies } from "next/headers";
import { verifyEmail } from "./payload/auth";
import { handleResponse, hanldeError } from "./api";
import { get } from "http";
type ApiResponse<T> = {
  data: T | undefined;
  error: ErrorResponse | undefined;
};

type ErrorResponse = {
  message: string;
  name?: string;
};

const sdk = new PayloadSDK<Config>({
  baseURL: process.env.API_URL + "/api" || "",
});

function withTryCatch<T extends (...args: any[]) => any>(fn: T) {
  return async function (payload: any, options?: any) {
    try {
      const result = await fn(payload, options);
      if (result.errors) {
        return { data: undefined, error: result.errors[0] };
      }

      return { data: result, error: undefined };
    } catch (error: unknown) {
      console.log("Payload SDK error:", error);

      if (error instanceof Error) {
        return { data: undefined, error: { message: error.message || "Unknown error" } };
      }

      return { data: undefined, error: { message: "Unknown error" } };
    }
  };
}

const findWithTryCatch = withTryCatch(sdk.find.bind(sdk));
const findByIDWithTryCatch = withTryCatch(sdk.findByID.bind(sdk));
const createWithTryCatch = withTryCatch(sdk.create.bind(sdk));
const updateWithTryCatch = withTryCatch(sdk.update.bind(sdk));
const deleteWithTryCatch = withTryCatch(sdk.delete.bind(sdk));

const loginWithTryCatch = withTryCatch(sdk.login.bind(sdk));
const forgotPasswordWithTryCatch = withTryCatch(sdk.forgotPassword.bind(sdk));
const resetPasswordWithTryCatch = withTryCatch(sdk.resetPassword.bind(sdk));
const verifyEmailWithTryCatch = withTryCatch(sdk.verifyEmail.bind(sdk));
const meWithTryCatch = withTryCatch(sdk.me.bind(sdk));

async function getAuthHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("payload-token")?.value || "";
  if (!token) return null;

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

function createCollectionAPI<T extends string>(collection: T) {
  const authCollections = ["customers"];
  const isAuthCollection = authCollections.includes(collection);
  const authOperations = {
    async login<T>(data: any): Promise<ApiResponse<T>> {
      return loginWithTryCatch({ collection, data });
    },
    async verifyEmail(token: string) {
      return verifyEmailWithTryCatch({ collection, token });
    },
    // async logout(data: any) {

    //   return loginWithTryCatch({ collection, data });
    // },
    async forgotPassword(data: any) {
      return forgotPasswordWithTryCatch({ collection, data });
    },
    async resetPassword(data: any) {
      return resetPasswordWithTryCatch({ collection, data });
    },
    async getMe() {
      const headers = await getAuthHeaders();

      return meWithTryCatch({ collection }, { headers });
    },
  };

  const defaultOperations = {
    async find<T>(data: any = {}): Promise<ApiResponse<T>> {
      console.log("find ", collection);

      // const headers = await getAuthHeaders();

      return findWithTryCatch({ collection: collection, ...data });
    },

    async findByID<T>(data: any): Promise<ApiResponse<T>> {
      const headers = await getAuthHeaders();

      return findByIDWithTryCatch({ collection: collection, ...data }, { headers });
    },

    async create<T>(data: any): Promise<ApiResponse<T>> {
      const headers = await getAuthHeaders();

      return createWithTryCatch({ collection: collection, data }, { headers });
    },

    async updateByID<T>({ id, data }: { id: number; data: any }): Promise<ApiResponse<T>> {
      const headers = await getAuthHeaders();

      return updateWithTryCatch({ collection: collection, id, data }, { headers });
    },

    async delete<T>(id: string): Promise<ApiResponse<T>> {
      const headers = await getAuthHeaders();

      return deleteWithTryCatch({ collection: collection, id: id }, { headers });
    },
  };

  return isAuthCollection
    ? { ...authOperations, ...defaultOperations }
    : ({ ...defaultOperations } as T extends "customers"
        ? typeof defaultOperations & typeof authOperations
        : typeof defaultOperations);
}

const payloadSDK = {
  customers: createCollectionAPI("customers"),
  products: createCollectionAPI("products"),
  pages: createCollectionAPI("pages"),
  search: createCollectionAPI("search"),
};

export default payloadSDK;
