// DTO (Data Transfer Object) - определяет тип данных для передачи информации между клиентом и сервером

import {Cart, CartItem, Ingredient, Product, ProductItem} from '@prisma/client';

export type CartItemDTO = CartItem & {
  productItem: ProductItem & {
    product: Product;
  };
  ingredients: Ingredient[];
};

export interface CartDTO extends Cart {
  items: CartItemDTO[];
}

export interface CreateCartItemValues {
  productItemId: number;
  ingredients?: number[];
}


// // 1. Получение корзины
// async getCart(): Promise<CartDTO> {
//   try {
//     const { data } = await axiosInstance.get<CartDTO>(this.url);
//     return data;
//   } catch (error) {
//     this.handleError(error, 'GET_CART');
//   }
// }
//
// // 2. Обновление количества (PATCH)
// async updateItemQuantity(itemId: number, quantity: number): Promise<CartDTO> {
//   try {
//     const { data } = await axiosInstance.patch<CartDTO>(`${this.url}/${itemId}`, { quantity });
//     return data;
//   } catch (error) {
//     this.handleError(error, 'UPDATE_ITEM');
//   }
// }
//
// // 3. Удаление (DELETE)
// async removeCartItem(id: number): Promise<CartDTO> {
//   try {
//     const { data } = await axiosInstance.delete<CartDTO>(`${this.url}/${id}`);
//     return data;
//   } catch (error) {
//     this.handleError(error, 'REMOVE_ITEM');
//   }
// }
//
// // 4. Добавление (POST)3
// async addCartItem(values: CreateCartItemValues): Promise<CartDTO> {
//   try {
//     const { data } = await axiosInstance.post<CartDTO>(this.url, values);
//     return data;
//   } catch (error) {
//     this.handleError(error, 'ADD_ITEM');
//   }
// }
// }