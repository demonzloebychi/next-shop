'use client';

interface Props {
  totalSum: number;
  totalQuantity: number;
  clearCart: () => void;
  onOrder: () => void;
}

export default function CartSummary({ totalSum, totalQuantity, clearCart, onOrder }: Props) {
  return (
    <div>
      <p className="text-3xl my-5">Полная стоимость: {totalSum} $</p>
      <p className="text-lg my-2">Всего товаров: {totalQuantity}</p>

      <div className="flex justify-between">
        <button onClick={clearCart} className="clear-cart-button mt-5 mb-[70px]">
          Очистить корзину
        </button>

        <button className="create-cart-button mt-5 mb-[70px]" onClick={onOrder}>
          Заказать
        </button>
      </div>
    </div>
  );
}