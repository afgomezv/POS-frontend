import ProductsTable from "@/src/components/products/ProductsTable";
import Heading from "@/src/components/ui/Heading";
import Pagination from "@/src/components/ui/Pagination";
import { ProductResponseSchema } from "@/src/schemas";
import { isValidPage } from "@/src/utils";
import { PagesRouteModule } from "next/dist/server/route-modules/pages/module.compiled";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getProducts(take: number, skip: number) {
  const url = `${process.env.API_URL}/products?take=${take}&skip=${skip}`;
  const req = await fetch(url);
  const json = await req.json();

  const data = ProductResponseSchema.parse(json);

  return {
    products: data.products,
    total: data.total,
  };
}

type SearchParams = Promise<{ page: string }>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page } = await searchParams;

  if (!isValidPage(+page)) redirect("/admin/products?page=1");

  const productPerPage = 10;
  const skip = (+page - 1) * productPerPage;

  const { products, total } = await getProducts(productPerPage, skip);

  const totalPages = Math.ceil(total / productPerPage);
  if (+page > totalPages) redirect("/admin/products?page=1");

  return (
    <>
      <Link
        href="/admin/products/new"
        className="hover:text-violet-600 text-white"
      >
        <div className=" w-40 hover:bg-gray-200 py-2 px-5 rounded-lg bg-violet-600">
          Nuevo Producto
        </div>
      </Link>
      <Heading>Administrar Productos</Heading>
      <ProductsTable products={products} />
      <Pagination
        page={+page}
        totalPages={totalPages}
        baseUrl={"/admin/products"}
      />
    </>
  );
}
