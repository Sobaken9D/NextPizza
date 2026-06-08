'use client';

import {
  CheckoutSidebar,
  Container,
  Title,
  WhiteBlock
} from "@/shared/components/shared";
import {Input, Textarea} from "@/shared/components/ui";
import {CheckoutCart} from "@/shared/components/shared/checkout";
import {useCart} from "@/shared/hooks/use-cart";
import {useState} from "react";

export default function CheckoutPage() {
  const [submitting, setSubmitting] = useState(false);

  const {
    totalAmount,
    updateItemQuantity,
    items,
    removeCartItem,
    loading
  } = useCart();

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className="mt-10">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />

      <div className="flex gap-10">
        {/*LEFT*/}
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <CheckoutCart
            onClickCountButton={onClickCountButton}
            removeCartItem={removeCartItem}
            items={items}
            loading={loading}
          />

          <WhiteBlock title="2. Персональные данные">
            <div className="grid grid-cols-2 gap-5">
              <Input
                name="firstName"
                className="text-base"
                placeholder="Имя"
              />
              <Input
                name="secondName"
                className="text-base"
                placeholder="Фамилия"
              />
              <Input
                name="email"
                className="text-base"
                placeholder="E-Mail"
              />
              <Input
                name="phone"
                className="text-base"
                placeholder="Телефон"
              />
            </div>
          </WhiteBlock>

          <WhiteBlock title="3. Адрес доставки">
            <div className="flex flex-col gap-5">
              <Input
                name="phone"
                className="text-base"
                placeholder="Адрес"
              />
              <Textarea
                rows={5}
                className="text-base"
                placeholder="Комментарии к заказу"
              />
            </div>
          </WhiteBlock>
        </div>

        {/*RIGHT*/}
        <div className="w-[450px]">
          <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting}/>
        </div>
      </div>

    </Container>
  );
}