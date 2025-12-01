"use client";
import { YnsLink } from "@/components/ui/yns-link";
import { UserIcon } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";

interface AccountNavProps {
  customer: CurrentCustomer | null;
}

export function AccountNav({ customer }: AccountNavProps) {
  const { isAuthenticated, setCustomer } = useAuthStore();

  useEffect(() => {
    if (customer) {
      setCustomer(customer);
    }
  }, []);

  return (
    <YnsLink href={isAuthenticated ? "/account" : "/auth/login"}>
      <UserIcon className="hover:text-neutral-500" />
    </YnsLink>
  );
}
