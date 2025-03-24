import dynamic from "next/dynamic"

// Use dynamic import with SSR disabled for the cart page
// as it depends on client-side state
const CartPageContent = dynamic(() => import("@/components/cart-page"), {
  ssr: false,
})

export default function CartPage() {
  return <CartPageContent />
}

