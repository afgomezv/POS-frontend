import { useStore } from "@/src/store";
import { FormEvent } from "react";

export default function CouponForm() {
  const applyCoupon = useStore((state) => state.applyCoupon);
  const coupon = useStore((state) => state.coupon);
  console.log(coupon);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const couponName = formData.get("coupon_name")?.toString()!;
    if (!couponName.length) return;
    await applyCoupon(couponName);
  };

  return (
    <>
      <p className="py-5 font-bold border-t border-gray-300">Canjear Cupón</p>
      <form className="flex" onSubmit={handleSubmit}>
        <input
          type="text"
          className="p-2 bg-gray-200 border-gray-300 w-full rounded-l-xl focus:outline-none"
          placeholder="Ingresa un cupón"
          name="coupon_name"
        />
        <button
          type="submit"
          className="p-3 bg-fuchsia-400 font-bold rounded-r-xl hover:cursor-pointer hover:bg-fuchsia-500"
        >
          Canjear
        </button>
      </form>
      {coupon.message ? (
        <p className="py-4 text-center text-sm font-bold text-red-500">
          {coupon.message}
        </p>
      ) : null}
    </>
  );
}
