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