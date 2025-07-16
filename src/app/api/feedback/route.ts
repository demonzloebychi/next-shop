import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { cart, phone, email, name, total } = await req.json();

    // const token = process.env.TELEGRAM_BOT_TOKEN;
    // const chatId = process.env.TELEGRAM_CHAT_ID;
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json({ error: "Нет конфигурации Telegram" }, { status: 500 });
    }

    // Формируем текст сообщения (по образцу можно переделать)
    let message = "<b>Новый заказ</b>\n\n";
    cart.forEach((item: any, i: number) => {
      message += `${i + 1}. ${item.product.title} — ${item.quantity} шт. — ${
        item.product.price * item.quantity
      } $\n`;
    });
    message += `\n<b>Итого:</b> ${total} $\n\n`;
    message += `<b>Контакты:</b>\nТелефон: ${phone}\n`;
    if (email) message += `Email: ${email}\n`;
    if (name) message += `Имя: ${name}\n`;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Ошибка отправки в Telegram" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
