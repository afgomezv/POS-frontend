import Image from "next/image";
import { CircleX } from "lucide-react";
import { CartItem } from "@/src/schemas";
import { useStore } from "@/src/store";
import { formatCurrency } from "@/src/utils";

export default function ShoppingCartItem({ item }: { item: CartItem }) {
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);

  return (
    <li className="flex items-center space-x-6 py-6 relative">
      <div className="h-24 w-24">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/img/${item.image}`}
          alt={`Imagen del producto ${item.name}`}
          width={100}
          height={100}
          priority
        />
      </div>
      <div className="flex-auto space-y-2">
        <h3 className="text-gray-900">{item.name}</h3>
        <p>{formatCurrency(item.price)}</p>
        <select
          className="w-32 text-center p-2 rounded-lg bg-gray-100"
          value={item.quantity}
          onChange={(e) => updateQuantity(item.productId, +e.target.value)}
        >
          {Array.from({ length: item.stock }, (_, index) => index + 1).map(
            (num) => (
              <option key={num} value={num}>
                {num}
              </option>
            )
          )}
        </select>
      </div>
      <div className="absolute top-10 -right-0">
        <button type="button" onClick={() => removeFromCart(item.productId)}>
          <CircleX size={28} className="text-red-500" />
        </button>
      </div>
    </li>
  );
}
