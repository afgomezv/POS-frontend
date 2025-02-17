import Link from "next/link";
import AddProductForm from "@/src/components/products/AddProductForm";
import ProductForm from "@/src/components/products/ProductForm";
import Heading from "@/src/components/ui/Heading";

export default function NewPage() {
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
      <Heading>Nuevo producto</Heading>
      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </>
  );
}
