"use client";

import { ReactNode, useActionState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { updateProduct } from "@/actions/update-product-action";

const EditProductForm = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const updateProductWithId = updateProduct.bind(null, +id);
  const [state, dispatch] = useActionState(updateProductWithId, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => toast.error(error));
    }
    if (state.success) {
      toast.success(state.success);
      router.push("/admin/products");
    }
  }, [state]);

  return (
    <form className="px-6 py-3 space-y-6 h-full -mt-6" action={dispatch}>
      {children}
      <button
        type="submit"
        className="mt-6 w-full text-white font-bold p-3 rounded-xl bg-violet-600 hover:bg-violet-700"
      >
        Actualizar Producto
      </button>
    </form>
  );
};

export default EditProductForm;
