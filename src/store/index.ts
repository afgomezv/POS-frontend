import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  Coupon,
  CouponResponseSchema,
  Product,
  ShoppingCart,
} from "../schemas";

interface Store {
  total: number;
  discount: number;
  totalItems: number;
  contents: ShoppingCart;
  coupon: Coupon;
  addToCart: (product: Product) => void;
  updateQuantity: (id: Product["id"], quantity: number) => void;
  removeFromCart: (productId: Product["id"]) => void;
  calculateTotal: () => void;
  calculateTotalItems: () => void;
  applyCoupon: (couponName: string) => Promise<void>;
  applyDiscount: () => Promise<void>;
  clearOrder: () => void;
}

const initialState = {
  total: 0,
  discount: 0,
  totalItems: 0,
  contents: [],
  coupon: {
    name: "",
    message: "",
    percentage: 0,
  },
};

export const useStore = create<Store>()(
  devtools((set, get) => ({
    ...initialState,
    addToCart: (product) => {
      const { id: productId, ...data } = product;
      let contents: ShoppingCart = [];
      const duplicated = get().contents.findIndex(
        (item) => item.productId === productId
      );

      if (duplicated >= 0) {
        if (
          get().contents[duplicated].quantity >=
          get().contents[duplicated].stock
        )
          return;

        contents = get().contents.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      } else {
        contents = [
          ...get().contents,
          {
            ...data,
            quantity: 1,
            productId,
          },
        ];
      }
      set(() => ({
        contents,
      }));
      get().calculateTotal();
      get().calculateTotalItems();
    },
    updateQuantity: (id, quantity) => {
      // const contents = get().contents.map((item) =>
      //   item.productId === id
      //     ? {
      //         ...item,
      //         quantity,
      //       }
      //     : item
      // );
      // set(() => ({ contents }));
      set((state) => ({
        contents: state.contents.map((item) =>
          item.productId === id
            ? {
                ...item,
                quantity,
              }
            : item
        ),
      }));
      get().calculateTotal();
      get().calculateTotalItems();
    },
    removeFromCart: (productId) => {
      // const contents = get().contents.filter(
      //   (item) => item.productId !== productId
      // );
      // set(() => ({ contents }));
      set((state) => ({
        contents: state.contents.filter((item) => item.productId !== productId),
      }));
      if (!get().contents.length) {
        get().clearOrder();
      }
      get().calculateTotal();
      get().calculateTotalItems();
    },
    calculateTotal: () => {
      const total = get().contents.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
      set(() => ({
        total,
      }));

      if (get().coupon.percentage) {
        get().applyDiscount();
      }
    },
    calculateTotalItems: () => {
      const totalItems = get().contents.reduce(
        (total, item) => total + item.quantity,
        0
      );
      set(() => ({
        totalItems,
      }));
    },
    applyCoupon: async (couponName) => {
      const req = await fetch("/coupons/api", {
        method: "POST",
        body: JSON.stringify({
          coupon_name: couponName,
        }),
      });
      const json = await req.json();
      const coupon = CouponResponseSchema.parse(json);
      set(() => ({
        coupon,
      }));

      if (coupon.percentage) {
        get().applyDiscount();
      }
    },
    applyDiscount: () => {
      const subTotalAmount = get().contents.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
      const discount = (get().coupon.percentage / 100) * subTotalAmount;
      const total = subTotalAmount - discount;

      set(() => ({
        discount,
        total,
      }));
    },
    clearOrder: () => {
      set(() => ({
        ...initialState,
      }));
    },
  }))
);
