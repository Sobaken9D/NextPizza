import {configureStore} from "@reduxjs/toolkit";
import categoryReducer from './features/categorySlice';
import cartReducer from './features/cartSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      category: categoryReducer
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>;

export type AppState = ReturnType<AppStore['getState']>;
// type RootState = {
//   todos: string[];
//   users: UsersState;
// }

export type AppDispatch = AppStore['dispatch'];
// (action: { type: string; payload?: any }) => void
