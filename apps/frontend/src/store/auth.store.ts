// import { create } from "zustand";
// import type { CustomerProfile } from "@/lib/payload/customer";

// export interface AuthState {
//   isAuthenticated: boolean;
//   customerProfile: CustomerProfile | null;
//   setCustomerProfile: (profile: CustomerProfile | null) => void;
// }

// const useAuthStore = create<AuthState>((set) => ({
//   customerProfile: null,
//   isAuthenticated: false,

//   setCustomerProfile: (customerProfile) => {
//     set(() => ({ customerProfile, isAuthenticated: !!customerProfile }));
//   },
// }));

// export { useAuthStore };
