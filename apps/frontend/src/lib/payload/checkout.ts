"use server";
import api from "../api";
import { getCustomerFromToken } from "./customer";
interface CheckoutResponse {
  id: string;
  url: string;
  orderId: string;
}

export async function checkout(payload) {
  const { payload: customerProfile, error } = await getCustomerFromToken();

  if (error?.code === "NO_TOKEN" || !customerProfile?.id) {
    return api.post<CheckoutResponse>("/next/checkout", payload);
  }

  return api.post<CheckoutResponse>("/next/checkout", { ...payload, customerId: customerProfile?.id });
}
