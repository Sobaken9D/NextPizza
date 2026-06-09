import React from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import {
  fetchCartItems,
  updateItemQuantity,
  removeCartItem,
  addCartItem
} from '@/shared/store/features/cartSlice';
import { CreateCartItemValues } from '../services/dto/cart.dto';

export const useCart = () => {
  const dispatch = useAppDispatch();

  // 1. Достаем все нужные данные из Redux-стейта за один раз
  const { items, totalAmount, loading } = useAppSelector((state) => state.cart);

  // 2. Автоматически запрашиваем корзину при монтировании хука
  React.useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  // 3. Оборачиваем методы в dispatch, чтобы компоненты вызывали их напрямую
  const handleUpdateItemQuantity = (id: number, quantity: number) => {
    dispatch(updateItemQuantity({ id, quantity }));
  };

  const handleRemoveCartItem = (id: number) => {
    dispatch(removeCartItem({ id }));
  };

  const handleAddCartItem = (values: CreateCartItemValues) => {
    dispatch(addCartItem({values})); // Предполагаем, что addCartItem thunk принимает values напрямую
  };

  // Возвращаем точно такой же интерфейс, какой был у Zustand
  return {
    items,
    totalAmount,
    loading,
    updateItemQuantity: handleUpdateItemQuantity,
    removeCartItem: handleRemoveCartItem,
    addCartItem: handleAddCartItem,
  };
};