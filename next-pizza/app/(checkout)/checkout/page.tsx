'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {
  CheckoutAddressForm,
  CheckoutSidebar,
  Container,
  Title,
  CheckoutCart,
  CheckoutPersonalForm
} from "@/shared/components";
import {useCart} from "@/shared/hooks/use-cart";
import {useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {
  checkoutFormSchema,
  CheckoutFormValues
} from "@/shared/constants/checkout-form-schema";
import toast from "react-hot-toast";
import {createOrder} from "@/app/actions";

export default function CheckoutPage() {
  const [submitting, setSubmitting] = useState(false);

  // CheckoutFormValues - для типизации
  // checkoutFormSchema - для рантайм проверки
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
  });

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

  // ddrevetnak@gmail.com

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      // console.log(data);

      setSubmitting(true);

      // ссылка для перенаправления на оплату
      const url = await createOrder(data);

      toast.success('Заказ успешно оформлен! 📝 Переход на оплату... ', {
        icon: '✅',
      });

      if (url) {
        location.href = url;
      }

    } catch (error) {
      console.log(error);
      setSubmitting(false);
      toast.error('Не удалось создать заказ', {
        icon: '❌',
      });
    }
  }

  return (
    <Container className="mt-10">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/*LEFT*/}
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                items={items}
                loading={loading}
              />

              <CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none' : ''} />

              <CheckoutAddressForm className={loading ? 'opacity-40 pointer-events-none' : ''} />

            </div>

            {/*RIGHT*/}
            <div className="w-[450px]">
              <CheckoutSidebar
                totalAmount={totalAmount}
                loading={loading || submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>

    </Container>
  );
}