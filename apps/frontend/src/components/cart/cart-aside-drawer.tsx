"use client";

import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { ReactNode } from "react";
import { useCartStore } from "@/store/cart.store";

export const CartAsideDrawer = ({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) => {
  const isOpenCart = useCartStore((state) => state.isOpenCart);
  const setIsOpenCart = useCartStore((state) => state.setIsOpenCart);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  return (
    <Drawer
      open={isOpenCart}
      shouldScaleBackground={true}
      direction={isDesktop ? "right" : "bottom"}
      onClose={onClose}
    >
      <DrawerTitle className="sr-only">Shopping cart</DrawerTitle>
      <DrawerContent
        className="sm:fixed sm:bottom-0 sm:left-auto sm:right-0 sm:top-0 sm:mt-0 sm:flex sm:h-full sm:w-1/2 sm:flex-col sm:overflow-hidden sm:rounded-none sm:bg-white sm:shadow-xl lg:w-1/3 lg:max-w-[420px]"
        aria-describedby="cart-overlay-description"
        onPointerDownOutside={() => {
          setIsOpenCart(false);
        }}
        onEscapeKeyDown={() => {
          setIsOpenCart(false);
        }}
      >
        {children}
      </DrawerContent>
    </Drawer>
  );
};
