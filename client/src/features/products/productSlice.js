import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    value: [],
    filter: {
      inStock: null,
      byBrand: null,
      byCategory: null,
      byTitle: null,
      priceRange: [0, 99999],
    },
  },
  reducers: {
    fillWithAllProducts: (state, action) => {
      return {
        ...state,
        value: action.payload,
      };
    },

    applyFilters: (state, action) => {
      return {
        ...state,
        filter: {
          byCategory:
            action.payload.byCategory || action.payload.byCategory === null
              ? action.payload.byCategory
              : state.filter.byCategory,
          byBrand:
            action.payload.byBrand || action.payload.byBrand === null
              ? action.payload.byBrand
              : state.filter.byBrand,
          byTitle:
            action.payload.byTitle || action.payload.byTitle === null
              ? action.payload.byTitle
              : state.filter.byTitle,
          inStock: action.payload.inStock
            ? action.payload.inStock
            : state.filter.inStock,
          priceRange: action.payload.priceRange
            ? action.payload.priceRange
            : state.filter.priceRange,
        },
      };
    },

    clearFilters: (state) => {
      return {
        ...state,
        filter: {
          inStock: null,
          byBrand: null,
          byCategory: null,
          byTitle: null,
          priceRange: [0, 99999],
        },
      };
    },
  },
});

export const { fillWithAllProducts, applyFilters, clearFilters } =
  productSlice.actions;

export default productSlice.reducer;
