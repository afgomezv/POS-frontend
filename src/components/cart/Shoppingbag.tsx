import { ShoppingBag } from "lucide-react";

const Shoppingbag = () => {
  return (
    <div className="flex items-center">
      <div className="relative p-2 text-gray-500 hover:text-gray-900">
        <ShoppingBag size={24} />
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-violet-600 rounded-full">
          0
        </span>
      </div>
    </div>
  );
};

export default Shoppingbag;
