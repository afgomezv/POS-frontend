import { CategoriesResponseSchema } from "@/src/schemas";
import Logo from "./Logo";
import Link from "next/link";
import ShoppingBag from "../cart/ShoppingBag";

async function getCategory() {
  const url = `${process.env.API_URL}/categories`;
  const req = await fetch(url);
  const json = await req.json();
  const categories = CategoriesResponseSchema.parse(json);
  return categories;
}

export default async function MainNav() {
  const categories = await getCategory();
  return (
    <header className="px-10 py-5 bg-gray-50 flex flex-col md:flex-row justify-between ">
      <div className="flex justify-center">
        <Logo />
      </div>

      <nav className="flex flex-col md:flex-row gap-2 items-center mt-5 md:mt-0">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`${category.id}`}
            className="text-violet-600 hover:text-white"
          >
            <div className="bg-gray-200 px-3 py-2 rounded-lg hover:bg-violet-600">
              {category.name}
            </div>
          </Link>
        ))}
      </nav>

      <div className="flex gap-2">
        <Link
          href={"/admin/sales"}
          className="hover:text-violet-600 text-white"
        >
          <div className="hover:bg-gray-200 py-2 px-5 rounded-lg bg-violet-600">
            Panel de Administración
          </div>
        </Link>
        <ShoppingBag />
      </div>
    </header>
  );
}
