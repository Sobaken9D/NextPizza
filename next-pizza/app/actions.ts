'use server';

import {CheckoutFormValues} from "@/shared/constants";
import {prisma} from "@/prisma/prisma-client";
import {OrderStatus, Prisma} from "@prisma/client";
import {cookies, headers} from "next/headers";
import {PayOrderTemplate, VerificationUserTemplate} from "@/shared/components";
import {createPayment, sendEmail} from "@/shared/lib";
import {hashPassword} from "better-auth/crypto";
import {
  TFormRegisterValues
} from "@/shared/components/shared/modals/forms/schemas";
import {auth} from "@/shared/lib/auth/auth";

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = await cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Cart token not found');
    }

    /* Находим корзину по токену */
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    /* Если корзина не найдена возращаем ошибку */
    if (!userCart) {
      throw new Error('Cart not found');
    }

    /* Если корзина пустая возращаем ошибку */
    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty');
    }

    /* Создаем заказ */
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    /* Очищаем корзину */
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    const paymentData = await createPayment({
      amount: order.totalAmount,
      orderId: order.id,
      description: 'Оплата заказа #' + order.id,
    });

    console.log(paymentData);

    if (!paymentData) {
      throw new Error('Payment data not found');
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });

    const paymentUrl = paymentData.confirmation.confirmation_url;

    // console.log(paymentUrl);

    await sendEmail(
      data.email,
      'Next Pizza / Оплатите заказ #' + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl,
      }),
    );

    return paymentUrl;
  } catch (err) {
    console.log('[CreateOrder] Server error', err);
  }
}

// Prisma.UserCreateInput - призма сама генерирует тип на основании схемы User
// Переменная body должна содержать именно те поля, которые необходимы для создания нового пользователя в базе данных
export async function registerUser(body: Omit<TFormRegisterValues, 'confirmPassword'>) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      }
    });

    if (user) {
      if (!user.emailVerified) {
        throw new Error('Почта не подтверждена');
      }

      throw new Error('Пользователь уже существует');
    }

    const userId = crypto.randomUUID();
    // const hashedPassword = hashSync(body.password, 10);
    const hashedPassword = await hashPassword(body.password);

    const createdUser = await prisma.user.create({
      data: {
        id: userId,
        fullName: body.fullName,
        email: body.email,
        emailVerified: false,
        accounts: {
          create: {
            id: crypto.randomUUID(),
            providerId: 'credential',
            accountId: body.email,
            password: hashedPassword
          }
        }
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.verification.create({
      data: {
        id: crypto.randomUUID(),
        identifier: createdUser.email,
        value: code,
        expiresAt: expiresAt,
      },
    });

    await sendEmail(
      createdUser.email,
      'Next Pizza / 📝 Подтверждение регистрации',
      VerificationUserTemplate({
        code,
      }),
    );
  } catch (error) {
    console.log('Error [CREATE_USER]', error);
    throw error;
  }
}

export async function updateUserInfo(body: {
  fullName: string;
  email: string;
  password?: string;
  currentPassword?: string;
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new Error('Пользователь не авторизован');
    }

    const userId = session.user.id;

    // 1. Обновляем базовую информацию
    await prisma.user.update({
      where: {id: userId},
      data: {
        fullName: body.fullName,
        email: body.email,
      },
    });

    // 2. Если передан новый и старый пароль, меняем через Better-Auth
    if (body.password && body.currentPassword) {
      await auth.api.changePassword({
        headers: await headers(),
        body: {
          currentPassword: body.currentPassword,
          newPassword: body.password,
        },
      });
    }
  } catch (err) {
    console.log('Error [UPDATE_USER]', err);
    throw err;
  }
}