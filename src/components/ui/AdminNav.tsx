import Link from "next/link";
import Logo from "./Logo";

export default function AdminNav() {
  return (
    <header className="px-10 py-5 bg-gray-50 flex justify-between">
      <div className="flex gap-5 text-white">
        <Logo />
      </div>

      <div className="flex gap-2 items-center">
        <Link
          href={"/admin/products"}
          className="text-violet-600 hover:text-white"
        >
          <div className="bg-gray-200 px-3 py-2 rounded-lg hover:bg-violet-600">
            Productos
          </div>
        </Link>

        <Link
          href={"/admin/sales"}
          className="text-violet-600 hover:text-white"
        >
          <div className="bg-gray-200 px-3 py-2 rounded-lg hover:bg-violet-600">
            Ventas
          </div>
        </Link>
      </div>
      <Link href={"/"} className="hover:text-violet-600 text-white">
        <div className="hover:bg-gray-200 py-2 px-5 rounded-lg bg-violet-600">
          Tienda
        </div>
      </Link>
    </header>
  );
}
