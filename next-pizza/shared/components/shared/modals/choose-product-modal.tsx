'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/shared/components/ui/dialog";
import {cn} from "@/shared/lib/utils";
import {useRouter} from "next/navigation";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {
  ChooseProductForm
} from "@/shared/components/shared/choose-product-form";
import {ProductWithRelations} from "@/@types/prisma";
import {ChoosePizzaForm} from "@/shared/components/shared/choose-pizza-form";
import {useCartStore} from "@/shared/store";
import toast from "react-hot-toast"; //чтобы скрыть DialogTitle

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({product, className}) => {
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);
  const addCartItem = useCartStore(state => state.addCartItem);
  const loading = useCartStore(state => state.loading);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.success(product.name + ' добавлен в корзину');
      router.back();
    } catch (err) {
      toast.error('Не удалось добавить товар в корзину');
      console.log(err);
    }
  };

  // здесь используется Intercepting Routes
  // это функция App Router, позволяющая загрузить маршрут внутри текущего макета (layout) без полной перезагрузки страницы

  return (
    <Dialog
      open={Boolean(product)}
      onOpenChange={() => router.back()}
    >

      {/*выдает ошибку без DialogTitle*/}
      <VisuallyHidden>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
      </VisuallyHidden>

      <DialogContent
        // onOpenAutoFocus предотвращает скролл при открытии/закрытии модалки
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          document.documentElement.style.scrollBehavior = 'auto';
          window.scrollTo({
            top: window.scrollY,
            behavior: 'auto'
          });
        }}
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className,
        )}
      >
        {
          isPizzaForm ? (
            <ChoosePizzaForm
              imageUrl={product.imageUrl}
              name={product.name}
              ingredients={product.ingredients}
              items={product.items}
              onSubmit={onSubmit}
              loading={loading}
            />
          ) : (
            <ChooseProductForm
              imageUrl={product.imageUrl}
              name={product.name}
              onSubmit={onSubmit}
              price={firstItem.price}
              loading={loading}
            />
          )
        }
      </DialogContent>
    </Dialog>
  );
};