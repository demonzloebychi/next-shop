import { IProducts } from "@/shared/interfaces/products.interface";


export interface CartItem {
  product: IProducts;
  quantity: number;
}

export interface CartContextValue {
  cart: CartItem[];
  handleAddToCart: (product: IProducts) => void;
  handleRemoveFromCart: (productId: number) => void; // Изменяем тип на number
  handleIncreaseQuantity: (productId: number) => void; // Добавляем новую функцию
  getTotalQuantity: () => number; // Добавляем функцию для общего количества
  getTotalSum: () => number; // Добавляем функцию для общей суммы
  handleClearCart : () => void
}