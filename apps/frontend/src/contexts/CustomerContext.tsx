"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Customer } from "@repo/cms/types";
// import { useAuthStore } from "@/store/auth.store";
// import type { CustomerProfile } from "@/lib/payload/customer";
// export type Customer = {
//   id: string;
//   name: string;
//   email: string;
// };

type CustomerContextType = {
  customer: Customer | null;
  setCustomer: (c: Customer | null) => void;
};

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider = ({
  customer: customerData,
  children,
}: {
  customer: Customer;
  children: ReactNode;
}) => {
  // const setCustomerProfile = useAuthStore((store) => store.setCustomerProfile);
  const [customer, setCustomer] = useState<Customer | null>(customerData);

  // useEffect(() => {
  //   if (customer?.id) {
  //     setCustomerProfile({
  //       id: customer.id,
  //       email: customer.email,
  //       fullName: customer.fullName,
  //       firstName: customer.firstName,
  //       lastName: customer.lastName,
  //       phone: customer.phone,
  //       bio: customer.bio,
  //     });
  //   } else {
  //     setCustomerProfile(null);
  //   }
  // }, [customer]);

  return <CustomerContext.Provider value={{ customer, setCustomer }}>{children}</CustomerContext.Provider>;
};

export const useCustomer = () => {
  const ctx = useContext(CustomerContext);
  if (!ctx) {
    throw new Error("useCustomer must be used inside <CustomerProvider>");
  }
  return ctx;
};
