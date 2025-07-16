"use client";

import { useContext, useState } from "react";
import CartContext from "@/app/contexts/CartContext";
// import RemoveFromCartButton from '../RemoveFromCartButton';
import createBuy from "@/components/createBuy/createBuy";

export default function Cart() {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("CartContext не найден");
  }

  const {
    cart,
    handleRemoveFromCart,
    handleIncreaseQuantity,
    getTotalSum,
    handleClearCart,
  } = cartContext;

  // Стейт для показа/скрытия формы заказа
  const [isOrdering, setIsOrdering] = useState(false);

  // Стейты для формы
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  // Стейт состояния отправки (например, для выключения кнопки)
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  // Отправка в телеграм через API бота
  const sendToTelegram = async (message: string) => {
    const token = "7911531383:AAGFDNYOAqvvbrM9idTZ1rWaREfnPx04uTA"; // замените на свой токен
    const chat_id = "782104302"; // замените на свой chat_id

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id,
        text: message,
        parse_mode: "HTML",
      }),
    });

    return res.ok;
  };

  const handleOrderClick = () => {
    setIsOrdering(true);
  };

  // Функция для обработки ввода с маской
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, ''); // Убираем все нецифровые символы

    if (input.length > 11) input = input.slice(0, 11); // Ограничиваем длину номера

    let formattedPhone = '+7 ';
    if (input.length > 1) formattedPhone += `(${input.substring(1, 4)}`;
    if (input.length >= 4) formattedPhone += `) ${input.substring(4, 7)}`;
    if (input.length >= 7) formattedPhone += `-${input.substring(7, 9)}`;
    if (input.length >= 9) formattedPhone += `-${input.substring(9, 11)}`;

    setPhone(formattedPhone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!phone.trim()) {
      setError("Номер телефона обязателен");
      return;
    }

    // Формируем текст сообщения
    let message = "<b>Новый заказ c next-shop</b>\n\n";

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.product.title} — ${
        item.quantity
      } шт. — ${item.product.price * item.quantity} $\n`;
    });

    message += `\n<b>Итого:</b> ${getTotalSum()} $\n\n`;

    message += `<b>Контактные данные:</b>\n`;
    message += `Телефон: ${phone}\n`;
    if (email.trim()) message += `Email: ${email}\n`;
    if (name.trim()) message += `Имя: ${name}\n`;

    try {
      setIsSending(true);
      const sent = await sendToTelegram(message);
      setIsSending(false);
      if (sent) {
        alert("Заказ отправлен, спасибо!");
        setIsOrdering(false);
        handleClearCart();
        setPhone("");
        setEmail("");
        setName("");
      } else {
        setError("Ошибка при отправке заказа, попробуйте позже");
      }
    } catch (err) {
      setIsSending(false);
      setError("Ошибка при отправке заказа, попробуйте позже");
    }
  };

  return (
    <div>
      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <div>
          <ul className="cart-open-ul">
            {cart.map((item) => (
              <li key={item.product.id}>
                <div className="cart-left">
                  <p>{item.product.title}</p>
                  <p>
                    Цена: <b>{item.product.price * item.quantity} $</b>
                  </p>
                </div>
                <div className="cart-right">
                  <p>Кол-во: {item.quantity}</p>
                  <div className="cart-actions">
                    <button
                      className="remove-product"
                      onClick={() => handleRemoveFromCart(item.product.id)}
                    >
                      -
                    </button>
                    <button
                      className="increase-product"
                      onClick={() => handleIncreaseQuantity(item.product.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-3xl my-5">Полная стоимость: {getTotalSum()} $</p>
          <div className="flex justify-between	">
            <button
              onClick={handleClearCart}
              className="clear-cart-button mt-5  mb-[70px]"
            >
              Очистить корзину
            </button>

            {!isOrdering && (
              <button
                className="create-cart-button mt-5 mb-[70px]"
                onClick={handleOrderClick}
              >
                Заказать
              </button>
            )}
          </div>

          {isOrdering && (
            <div className="form-zakaz">
              <form onSubmit={handleSubmit} className="order-form mb-10">
                <h2 className="text-xl">Введите ваши данные для заказа</h2>
                <br />

                <div className="form-inputs flex gap-[15]">
                  <label>
                    Телефон <span style={{ color: "red" }}>*</span>:
                    <br />
                    <input
                      type="tel"
                      className="input"
                      value={phone}
                      onChange={handlePhoneChange}
                      required
                      placeholder="+7 (999) 999-99-99"
                    />
                  </label>

                  <label>
                    Email (необязательно):
                    <br />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@mail.com"
                    />
                  </label>

                  <label>
                    Имя (необязательно):
                    <br />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ваше имя"
                    />
                  </label>
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <div style={{ marginTop: 15 }}>
                  <button
                    type="submit"
                    disabled={isSending}
                    className="create-cart-button"
                  >
                    {isSending ? "Отправка..." : "Отправить заказ"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOrdering(false)}
                    disabled={isSending}
                    style={{ marginLeft: 10 }}
                    className="clear-cart-button"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
