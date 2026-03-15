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
import {ProductWithRelations} from "@/@types/prisma";
import {ProductForm} from "@/shared/components/shared"; //чтобы скрыть DialogTitle

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({product, className}) => {
  const router = useRouter();

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
        <ProductForm product={product} onSubmit={() => router.back()}/>
      </DialogContent>
    </Dialog>
  );
};