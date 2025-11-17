import api from "../utils/api";

interface CheckoutResponse {
  id: string;
  url: string;
}

export function checkout(payload) {
  return api.post<CheckoutResponse>("/next/checkout", payload);
}
