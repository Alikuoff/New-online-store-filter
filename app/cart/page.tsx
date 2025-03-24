"use client";

import dynamic from "next/dynamic";

const CartPageContent = dynamic(() => import("@/components/cart-page"), {
  ssr: false,
});

export default CartPageContent;

