import axios from "axios";
import {PaymentData} from "@/@types/yookassa";

interface Props {
  description: string;
  orderId: number;
  amount: number;
}

// делаем запрос на юмани
export async function createPayment(details: Props) {
  const {data} = await axios.post<PaymentData>(
    'https://api.yookassa.ru/v3/payments',
    {
      amount: {
        value: details.amount.toString(),
        currency: 'RUB',
      },
      capture: true,
      description: details.description,
      // метаинформация для изменения статуса заказа после оплаты
      metadata: {
        order_id: details.orderId,
      },
      // куда перенаправлять после оплаты
      confirmation: {
        type: 'redirect',
        return_url: process.env.YOOKASSA_CALLBACK_URL,
      },
    },
    {
      auth: {
        username: process.env.YOOKASSA_STORE_ID as string,
        password: process.env.YOOKASSA_API_KEY as string,
      },
      // в заголовке указываем уникальный идентификатор, чтобы юкасса понимала что заказы разные
      headers: {
        'Content-Type': 'application/json',
        'Idempotence-Key': Math.random().toString(36).substring(7),
      },
    },
  );

  return data;
}