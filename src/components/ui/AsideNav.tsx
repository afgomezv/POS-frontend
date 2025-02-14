"use client";

import { useState } from "react";
import { ShoppingBag, X } from "lucide-react";

const AsideNav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <aside
      className={`
            fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:order-1
            ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
          `}
      style={{ marginTop: "8rem" }}
    >
      <div className="h-full overflow-y-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Carrito de Compras
          </h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Carrito vacío */}
        <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)]">
          <ShoppingBag size={64} className="text-gray-300 mb-4" />
          <p className="text-gray-500 text-center">Tu carrito está vacío</p>
          <button
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AsideNav;
