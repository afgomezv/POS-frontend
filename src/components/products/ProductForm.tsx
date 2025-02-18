import { CategoriesResponseSchema, Product } from "@/src/schemas";
import UploadProductImage from "./UploadProductImage";

async function getCategory() {
  const url = `${process.env.API_URL}/categories`;
  const req = await fetch(url);
  const json = await req.json();

  const categories = CategoriesResponseSchema.parse(json);

  return categories;
}

export default async function ProductForm({ product }: { product?: Product }) {
  const categories = await getCategory();
  return (
    <>
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="flex items-center gap-2 text-sm font-medium text-gray-700"
        >
          Nombre Producto
        </label>
        <input
          id="name"
          type="text"
          name="name"
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none"
          defaultValue={product?.name}
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="price"
          className="flex items-center gap-2 text-sm font-medium text-gray-700"
        >
          Precio
        </label>
        <input
          id="price"
          type="number"
          name="price"
          min={0}
          step="0.01"
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none"
          defaultValue={product?.price}
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="inventory"
          className="flex items-center gap-2 text-sm font-medium text-gray-700"
        >
          Stock
        </label>
        <input
          id="stock"
          type="number"
          name="stock"
          min={0}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none"
          defaultValue={product?.stock}
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="categoryId"
          className="flex items-center gap-2 text-sm font-medium text-gray-700"
        >
          Categoría
        </label>
        <select
          id="categoryId"
          name="categoryId"
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none bg-white"
          defaultValue={product?.categoryId}
        >
          <option value="value">Seleccionar Categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <UploadProductImage currencyImage={product?.image} />
    </>
  );
}
