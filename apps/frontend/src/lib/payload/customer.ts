"use server";
import { cookies } from "next/headers";
import { decodeJWT } from "@/lib/auth";
import { Customer } from "@repo/cms/types";
import payloadSDK from "../payloadSDK";
import { redirect } from "next/navigation";

interface LoginPayload {
  email: string;
  password: string;
}

export type CustomerProfile = Pick<
  Customer,
  "id" | "email" | "fullName" | "firstName" | "lastName" | "phone"
>;

const getCustomerFromToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("payload-token")?.value || "";

  if (!token) {
    return { payload: undefined, error: { message: "No token found", code: "NO_TOKEN" } };
  }

  return decodeJWT<CustomerProfile>(token);
};

const getCustomer = async (customerId: number) => {
  // return payloadSDK.customers.getMe<Customer>();
  return payloadSDK.customers.findByID<Customer>({
    id: customerId,
  });
};

const updateCustomer = async (customerId: number, profileData: Partial<Customer>) => {
  if (!customerId) {
    // throw new Error("Customer ID is required to update profile.");
    return { data: null, error: new Error("Customer ID is required to update profile.") };
  }

  return payloadSDK.customers.updateByID<Omit<Customer, "orders">>({
    id: customerId,
    data: profileData,
  });
};

export { getCustomerFromToken, getCustomer, updateCustomer };
