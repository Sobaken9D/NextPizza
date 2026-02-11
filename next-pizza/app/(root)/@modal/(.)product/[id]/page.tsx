// (.)product - отлавливает запрос на /product и вместо переходна на страницу вызывает модалку
// page.tsx - slot для parallel рендера

import {prisma} from "@/prisma/prisma-client";
import {notFound} from "next/navigation";
import {ChooseProductModal, Container, Title} from "@/shared/components/shared";

export default async function ProductModalPage({params}: {
  params: Promise<{ id: string }>
}) {

  const {id} = await params;

  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <ChooseProductModal product={product}></ChooseProductModal>
  );
}