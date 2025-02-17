import { PackageX, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-[700px] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div>
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <PackageX className="w-12 h-12 text-red-500" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Vaya! No hemos podido encontrar lo que buscas.
          </h1>

          <p className="text-gray-500 mb-8">
            Lo sentimos, el producto que estás buscando no existe o ha sido
            removido.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admin/products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a productos
            </Link>

            <Link
              href={"/"}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Home className="w-4 h-4" />
              Ir al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
