"use client";
import { YnsLink } from "@/components/ui/yns-link";
import { UserIcon } from "lucide-react";
// import { useAuthStore } from "@/store/auth.store";
import { CustomerProfile } from "@/lib/payload/customer";
import { useEffect, useState } from "react";
import { getCustomerFromToken } from "@/lib/payload/customer";

export function AccountNav() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function checkAuth() {
    const { payload: customerProfile, error } = await getCustomerFromToken();
    const isAuth = !error && !!customerProfile?.id;
    setIsAuthenticated(isAuth);
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <YnsLink href={isAuthenticated ? "/account/profile" : "/auth/login"}>
      <UserIcon className="hover:text-neutral-500" />
    </YnsLink>
  );
}
