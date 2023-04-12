import { createSlice } from "@reduxjs/toolkit";

const productIdSlice = createSlice({
  name: "productId",
  initialState: {
    selectedProductId: null,
  },
  reducers: {
    getProductIDFunction: (state, action) => {
      return {
        ...state,
        selectedProductId: action.payload,
      };
    },
  },
});

export const { getProductIDFunction } = productIdSlice.actions;

export default productIdSlice.reducer;