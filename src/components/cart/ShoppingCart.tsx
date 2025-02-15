"use client";

import { useStore } from "@/src/store";
import ShoppingCartItem from "./ShoppingCartItem";
import { ShoppingBagIcon } from "lucide-react";
import Amount from "./Amount";
import CouponForm from "./CouponForm";
import SubmitOrderForm from "./SubmitOrderForm";

const ShoppingCart = () => {
  const contents = useStore((state) => state.contents);
  const total = useStore((state) => state.total);
  const discount = useStore((state) => state.discount);

  return (
    <div>
      {contents.length ? (
        <>
          <h2 className="text-4xl font-bold text-gray-900">
            Resumen de ventas
          </h2>
          <ul
            role="list"
            className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
          >
            {contents.map((item) => (
              <ShoppingCartItem key={item.productId} item={item} />
            ))}
          </ul>
          <dl className="space-y-6 border-t border-gray-300 py-6 text-sm font-medium text-gray-500">
            {discount ? (
              <Amount label="Descuento" amount={discount} discount={true} />
            ) : null}
            <Amount label="Total a pagar" amount={total} />
          </dl>
          <CouponForm />
          <SubmitOrderForm />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)]">
          <ShoppingBagIcon size={64} className="text-gray-300 mb-4" />
          <p className="text-xl text-center text-gray-600">
            Tu carrito está vacío
          </p>
          <button
            className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            onClick={() => {}}
          >
            Continuar Comprando
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
