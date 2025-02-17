import Link from "next/link";
import EditProductForm from "@/src/components/products/EditProductForm";
import ProductForm from "@/src/components/products/ProductForm";
import Heading from "@/src/components/ui/Heading";
import { notFound } from "next/navigation";
import { ProductSchema } from "@/src/schemas";

async function getProducts(id: string) {
  const url = `${process.env.API_URL}/products/${id}`;
  const req = await fetch(url);
  const json = await req.json();

  if (!req.ok) {
    notFound();
  }

  const product = ProductSchema.parse(json);
  return product;
}

type Params = Promise<{ id: string }>;

export default async function EditProductPage({ params }: { params: Params }) {
  const { id } = await params;

  const product = await getProducts(id);

  return (
    <>
      <Link
        href="/admin/products?page=1"
        className="hover:text-violet-600 text-white"
      >
        <div className="w-28 text-center hover:bg-gray-200 py-2 px-5 rounded-lg bg-violet-600">
          Volver
        </div>
      </Link>
      <Heading>Editar Producto: {product.name}</Heading>
      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  );
}
