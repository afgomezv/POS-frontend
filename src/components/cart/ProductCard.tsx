import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/src/schemas";
import { formatCurrency } from "@/src/utils";

const ProductCard = ({ product }: { product: Product }) => {
  const isOutOfStock = product.stock === 0;

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
        <div className="overflow-hidden relative">
          <Image
            src={`${process.env.IMAGE_URL}/img/${product.image}`}
            alt={`Imagen del producto ${product.name}`}
            width={300}
            height={300}
            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
          />
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-red-500 font-semibold text-4xl">
                Agotado
              </span>
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {product.name}
          </h3>

          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-bold text-violet-600">
              {formatCurrency(product.price)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span
              className={`text-sm font-medium ${
                product.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock > 0
                ? `${product.stock} unidades disponibles`
                : "Sin stock"}
            </span>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-colors
              ${
                isOutOfStock
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-violet-600 hover:bg-violet-700"
              }`}
              disabled={isOutOfStock}
            >
              <ShoppingCart size={18} />
              Agregar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
