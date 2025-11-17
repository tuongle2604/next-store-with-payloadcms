"use client";
import type { ReactNode } from "react";
import { CartAsideDrawer } from "./cart-aside-drawer";

export const CartAsideContainer = ({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) => {
  return (
    <CartAsideDrawer onClose={onClose}>
      <div className="flex h-full min-h-[80vh] flex-col">{children}</div>
    </CartAsideDrawer>
  );
};
