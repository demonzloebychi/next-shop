import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IProducts } from "@/shared/interfaces/products.interface";
import { CartItem } from '@/shared/interfaces/cart.interface';
import * as logic from '../shared/logic/cart.logic'; // Импортируем нашу логику

interface CartState {
  cart: CartItem[];
  // Действия
  addToCart: (product: IProducts) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  clearCart: () => void;
  // Селекторы (вычисляемые значения)
  // getTotalSum: () => number;
  // getTotalQuantity: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => set((state) => ({
        cart: logic.addItem(state.cart, product)
      })),

      removeFromCart: (productId) => set((state) => ({
        cart: logic.removeItem(state.cart, productId)
      })),

      increaseQuantity: (productId) => set((state) => ({
        cart: logic.increaseQuantity(state.cart, productId)
      })),

      clearCart: () => set({ cart: [] }),

      // Используем get() для доступа к текущему состоянию внутри стора
      // getTotalSum: () => logic.calculateTotalSum(get().cart),
      // getTotalQuantity: () => logic.calculateTotalQuantity(get().cart),
    }),
    {
      name: 'cart-storage', // Ключ в localStorage
    }
  )
);
