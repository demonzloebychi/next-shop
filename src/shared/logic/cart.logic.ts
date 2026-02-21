import { CartItem } from '@/shared/interfaces/cart.interface';
import { IProducts } from "@/shared/interfaces/products.interface";

export const addItem = (cart: CartItem[], product: IProducts): CartItem[] => {
  const existing = cart.find(item => item.product.id === product.id);
  if (existing) {
    return cart.map(item =>
      item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  return [...cart, { product, quantity: 1 }];
};

export const removeItem = (cart: CartItem[], productId: number): CartItem[] => {
  return cart
    .map(item => item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item)
    .filter(item => item.quantity > 0);
};

export const increaseQuantity = (cart: CartItem[], productId: number): CartItem[] => {
  return cart.map(item =>
    item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
  );
};

export const calculateTotalSum = (cart: CartItem[]): number => {
  return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
};

export const calculateTotalQuantity = (cart: CartItem[]): number => {
  return cart.reduce((acc, item) => acc + item.quantity, 0);
};
