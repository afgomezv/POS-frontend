"use client";

import { Product } from "@/src/schemas";
import { useStore } from "@/src/store";
import { ShoppingCart } from "lucide-react";

type ButtonProps = {
  product: Product;
  isOutOfStock: boolean;
};

const AddproductButton = ({ product, isOutOfStock }: ButtonProps) => {
  const addToCart = useStore((state) => state.addToCart);

  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-colors
              ${
                isOutOfStock
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-violet-600 hover:bg-violet-700"
              }`}
      disabled={isOutOfStock}
      onClick={() => addToCart(product)}
    >
      <ShoppingCart size={18} />
      Agregar
    </button>
  );
};

export default AddproductButton;
