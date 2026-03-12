import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/prisma-client";
import {CreateCartItemValues} from "@/shared/services/dto/cart.dto";
import {findOrCreateCart} from "@/shared/lib/find-or-create-cart";
import {updateCartTotalAmount} from "@/shared/lib/update-cart-total-amount";
import * as crypto from "node:crypto";

// получаем информацию о корзине с сервера
// request - запрос от пользователя к серверу
// response - ответ с сервера

// http://localhost:3000/api/cart - для проверки

// Application -> Cookies -> token = ****** - что-бы задать токен самостоятельно
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    // если нет токена то возвращаем пустую корзину и генерируем токен с сохранением в кукисы
    // если токен есть то находим корзину пользователя по токену

    if (!token) {
      return NextResponse.json({totalAmount: 0, items: []});
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          }
        ],
      },
      include: {
        items: {
          orderBy: { // отсортируем товары в порядке добавления
            createAt: 'desc',
          },
          include: { // еще возвращаем информацию о productItem (product и ingredients)
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.log(error);
  }
}

// http://localhost:3000/api/cart
// + метод POST (в postman)
// +
// {
//   "productItemId": 3,
//   "ingredients": [1,2,3]
// }

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    // .json - асинхронный метод, который читает тело запроса и парсит JSON

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    // every - Проверяет ВСЕ связанные записи ingredients: { every: {...} }
    // in - Проверяет вхождение в список id: { in: [1,2] }
    // connect - Привязывает существующие записи	connect: [{ id: 1 }]

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: {
          every: {
            id: { in: data.ingredients },
          },
        },
      },
    });

    // Если товар был найден, делаем +1
    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);

    const resp = NextResponse.json(updatedUserCart);
    resp.cookies.set('cartToken', token);
    return resp;
  } catch (error) {
    console.log('[CART_POST] Server error', error);
    return NextResponse.json({ message: 'Не удалось создать корзину' }, { status: 500 });
  }
}