// src/shared/hooks/useCart.ts
import { useState, useEffect } from 'react';
import { useCartStore } from '../../store/useCartStore';

export const useCart = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const store = useCartStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Пока не загрузились на клиенте, возвращаем пустую корзину
  // Это предотвращает Hydration Error
  return isHydrated ? store : { ...store, cart: [], getTotalSum: () => 0, getTotalQuantity: () => 0 };
};
