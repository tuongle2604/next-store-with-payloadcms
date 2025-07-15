"use client";
// import type * as Commerce from "commerce-kit";
import { useEffect, useState } from "react";
import { ProductBottomStickyCard } from "./product-bottom-sticky-card";
// import { Product } from "@/lib/payload/payload-types";
import { CartItem } from "@/store/cart.store";

export const StickyBottom = ({
  children,
  cartItem,
  locale,
}: Readonly<{
  children: React.ReactNode;
  cartItem: CartItem;
  locale: string;
}>) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const button = document.getElementById("button-add-to-cart");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setShow(!entry.isIntersecting);
        }
      },
      { threshold: 0, rootMargin: "-100px 0px 0px 0px" }
    );

    if (button) {
      observer.observe(button);
    }

    return () => {
      if (button) {
        observer.unobserve(button);
      }
    };
  }, []);
  return (
    <>
      {children}
      <ProductBottomStickyCard
        cartItem={cartItem}
        locale={locale}
        show={show}
      />
    </>
  );
};
