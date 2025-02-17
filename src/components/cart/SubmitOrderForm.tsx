import { useActionState, useEffect } from "react";
import { useStore } from "@/src/store";
import submitOrder from "@/actions/submit-order-action";
import { toast } from "react-toastify";

const SubmitOrderForm = () => {
  const total = useStore((state) => state.total);
  const coupon = useStore((state) => state.coupon.name);
  const contents = useStore((state) => state.contents);
  const clearOrder = useStore((state) => state.clearOrder);

  const order = {
    total,
    coupon,
    contents,
  };

  const submitOrderWithDate = submitOrder.bind(null, order);
  const [state, dispatch] = useActionState(submitOrderWithDate, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => toast.error(error));
    }
    if (state.success) {
      toast.success(state.success);
      clearOrder();
    }
  }, [state]);

  return (
    <form action={dispatch}>
      <button
        type="submit"
        className="mt-5 w-full text-white text-lg capitalize  font-bold p-3 rounded-xl bg-violet-600 hover:bg-violet-700"
      >
        Confirmar compra
      </button>
    </form>
  );
};

export default SubmitOrderForm;
