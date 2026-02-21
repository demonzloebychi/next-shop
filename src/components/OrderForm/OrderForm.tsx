'use client';
import { useState } from "react";
import { CartItem as CartItemType } from "@/shared/interfaces/cart.interface";

interface Props {
  cart: CartItemType[];
  totalSum: number;
  clearCart: () => void;
  onClose: () => void;
}

export default function OrderForm({ cart, totalSum, clearCart, onClose }: Props) {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "").slice(0, 11);
    let formattedPhone = "+7 ";
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

    try {
      setIsSending(true);
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, phone, email, name, total: totalSum }),
      });
      if (!response.ok) throw new Error("Ошибка при отправке заказа");

      clearCart();
      onClose();
    } catch (err: any) {
      setError(err.message || "Ошибка при отправке заказа");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="order-form mb-10">
      <h2 className="text-xl">Введите ваши данные для заказа</h2>
      <br />
      <div className="flex gap-[15] flex-wrap">
        <label>
          Телефон <span style={{ color: "red" }}>*</span>:<br />
          <input type="tel" value={phone} onChange={handlePhoneChange} required placeholder="+7 (999) 999-99-99" />
        </label>

        <label>
          Email (необязательно):<br />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@mail.com" />
        </label>

        <label>
          Имя (необязательно):<br />
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ваше имя" />
        </label>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginTop: 15 }}>
        <button type="submit" disabled={isSending} className="create-cart-button">
          {isSending ? "Отправка..." : "Отправить заказ"}
        </button>
        <button type="button" onClick={onClose} disabled={isSending} style={{ marginLeft: 10 }} className="clear-cart-button">
          Отмена
        </button>
      </div>
    </form>
  );
}