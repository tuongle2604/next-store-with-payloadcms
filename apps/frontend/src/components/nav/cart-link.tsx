"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { YnsLink } from "@/components/ui/yns-link";
import { useCartStore } from "@/store/cart.store";
export const CartLink = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const setIsOpenCart = useCartStore((state) => state.setIsOpenCart);

  return (
    <YnsLink
      href=""
      onClick={(e) => {
        e.preventDefault();
        setIsOpenCart(true);
      }}
      scroll={false}
      className="relative block w-6 h-6"
      prefetch={true}
    >
      {children}
    </YnsLink>
  );
};
