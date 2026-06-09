import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CategoryState {
  activeId: number;
}

const initialState: CategoryState = {
  activeId: 1,
}

export const categorySlice = createSlice({
  name: "category", // будет префиксом во всех экшенах
  initialState: initialState,
  reducers: {
    setActiveId: (state, action: PayloadAction<number>) => {
      state.activeId = action.payload;
    }
  }
})

export const {setActiveId} = categorySlice.actions;
export default categorySlice.reducer;