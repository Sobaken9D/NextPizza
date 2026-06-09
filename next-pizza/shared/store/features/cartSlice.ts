import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Api} from "@/shared/services/api-client";
import {getCartDetails} from "@/shared/lib";
import {CreateCartItemValues} from "@/shared/services/dto/cart.dto";

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  disabled?: boolean;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  ingredients: Array<{ name: string; price: number }>;
}

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];
}

const initialState: CartState = {
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,
}

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (_, thunkAPI) => {
    try {
      return await Api.cart.getCart();
    } catch (error) {
      console.error(error);
      // Пробрасываем ошибку наружу, чтобы thunk зашел в .rejected
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const updateItemQuantity = createAsyncThunk(
  'cart/updateItemQuantity',
  async ({id, quantity}: { id: number, quantity: number }, thunkAPI) => {
    try {
      return await Api.cart.updateItemQuantity(id, quantity);
    } catch (error) {
      console.error(error);
      // Пробрасываем ошибку наружу, чтобы thunk зашел в .rejected
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async ({id}: { id: number }, thunkAPI) => {
    try {
      return await Api.cart.removeCartItem(id);
    } catch (error) {
      console.error(error);
      // Пробрасываем ошибку наружу, чтобы thunk зашел в .rejected
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const addCartItem = createAsyncThunk(
  'cart/addCartItem',
  async ({values}: { values: CreateCartItemValues }, thunkAPI) => {
    try {
      return await Api.cart.addCartItem(values);
    } catch (error) {
      console.error(error);
      // Пробрасываем ошибку наружу, чтобы thunk зашел в .rejected
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const cartSlice = createSlice({
  name: "cart", // будет префиксом во всех экшенах
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ПОЛУЧЕНИЕ
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;

        Object.assign(state, getCartDetails(action.payload));
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      // ОБНОВЛЕНИЕ
      .addCase(updateItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        state.loading = false;

        Object.assign(state, getCartDetails(action.payload));
      })
      .addCase(updateItemQuantity.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      // УДАЛЕНИЕ
      .addCase(removeCartItem.pending, (state, action) => {
        state.loading = true;
        state.error = false;

        const item = state.items.find((item) => item.id === action.meta.arg.id);
        if (item) {
          item.disabled = true;
        }
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;

        Object.assign(state, getCartDetails(action.payload));
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = true;

        const item = state.items.find((item) => item.id === action.meta.arg.id);
        if (item) {
          item.disabled = true;
        }
      })

      // ДОБАВЛЕНИЕ
      .addCase(addCartItem.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.loading = false;

        Object.assign(state, getCartDetails(action.payload));
      })
      .addCase(addCartItem.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  }
})

export default cartSlice.reducer;