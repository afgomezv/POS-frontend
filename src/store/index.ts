import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Product, ShoppingCart } from "../schemas";

interface Store {
  total: number;
  totalItems: number;
  contents: ShoppingCart;
  addToCart: (product: Product) => void;
  updateQuantity: (id: Product["id"], quantity: number) => void;
  removeFromCart: (productId: Product["id"]) => void;
  calculateTotal: () => void;
  calculateTotalItems: () => void;
}

export const useStore = create<Store>()(
  devtools((set, get) => ({
    total: 0,
    totalItems: 0,
    contents: [],
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
  }))
);
