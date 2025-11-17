import { create } from "zustand";
// import { Customer } from "@repo/cms/types";

export interface AuthState {
  customer: CurrentCustomer | null;
  isAuthenticated: boolean;
  // login: (user: CurrentCustomer, token: string) => void;
  logoutCustomer: () => void;
  setCustomer: (user: CurrentCustomer) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  customer: null,
  isAuthenticated: false,

  // login: (customer, token) => {
  //   // persist token to cookie/localStorage here if needed
  //   localStorage.setItem("token", token);
  //   set({ customer, isAuthenticated: true });
  // },

  logoutCustomer: () => {
    set({ customer: null, isAuthenticated: false });
  },

  setCustomer: (customer) => {
    set(() => ({ customer, isAuthenticated: !!customer }));
  },
}));

export { useAuthStore };
