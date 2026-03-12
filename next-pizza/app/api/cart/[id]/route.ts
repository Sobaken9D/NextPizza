// {params}: {params: {id: string} - деструктуризация
// 500 - запрос корректный, но сервер не смог его обработать
// PATCH — это HTTP метод, который используется для частичного обновления ресурса на сервере.

// data берется из api/cart/3

// через POSTMAN - PATCH + http://localhost:3000/api/cart/1 + raw: {"quantity": 5} (+ задать в постмане куки с cardToken)
// cartToken=111111;

// изменяем корзину на сервере через PATCH запрос при помощи куки корзины.

import {prisma} from '@/prisma/prisma-client';
import {updateCartTotalAmount} from '@/shared/lib/update-cart-total-amount';
import {NextRequest, NextResponse} from 'next/server';

export async function PATCH(req: NextRequest, {params}: {
  params: Promise<{ id: string }>
}) {
  try {
    const {id} = await params;
    const numericId = Number(id);
    const data = (await req.json()) as { quantity: number };
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({error: 'Cart token not found'});
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: numericId,
      },
    });

    if (!cartItem) {
      return NextResponse.json({error: 'Cart item not found'});
    }

    await prisma.cartItem.update({
      where: {
        id: numericId,
      },
      data: {
        quantity: data.quantity,
      },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[CART_PATCH] Server error', error);
    return NextResponse.json({message: 'Не удалось обновить корзину'}, {status: 500});
  }
}

export async function DELETE(req: NextRequest, {params}: {
  params: { id: string }
}) {
  try {
    const {id} = await params;
    const numericId = Number(id);
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({error: 'Cart token not found'});
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: numericId,
      },
    });

    if (!cartItem) {
      return NextResponse.json({error: 'Cart item not found'});
    }

    await prisma.cartItem.delete({
      where: {
        id: numericId,
      },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[CART_DELETE] Server error', error);
    return NextResponse.json({message: 'Не удалось удалить корзину'}, {status: 500});
  }
}