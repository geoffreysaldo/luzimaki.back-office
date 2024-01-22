import { createSlice } from "@reduxjs/toolkit";
import { OrderLineInput } from "../__generated__/globalTypes";

export interface Discount {
  identifier: string | null;
  value: number;
}

const shoppingBagSlice = createSlice({
  name: "authState",
  initialState: {
    lines: [] as OrderLineInput[],
    discount: { identifier: null, value: 0 } as Discount,
    tips: 0,
  },
  reducers: {
    addProduct(state, action) {
      const idx = state.lines.findIndex(
        (oL) => oL.productId === action.payload.id
      );
      if (idx >= 0) {
        state.lines = state.lines.map((oL, i) =>
          i === idx
            ? {
                ...oL,
                quantity: oL.quantity + 1,
                total:
                  oL.total +
                  action.payload.price / (1 + action.payload.vatRate),
                totalTaxInclusive: oL.totalTaxInclusive + action.payload.price,
              }
            : { ...oL }
        );
      } else {
        state.lines = [
          ...state.lines,
          {
            productId: action.payload.id,
            productModel: action.payload.model,
            productTitle: action.payload.title,
            productPrice: action.payload.price,
            productImage: action.payload.image,
            productVatRate: action.payload.vatRate,
            quantity: 1,
            total: action.payload.price / (1 + action.payload.vatRate),
            totalTaxInclusive: action.payload.price,
            menuChoices: [],
          },
        ];
      }
    },
    addProductById(state, action) {
      const idx = state.lines.findIndex((l) => l.productId === action.payload);
      state.lines = state.lines.map((l, i) =>
        i === idx
          ? {
              ...l,
              quantity: l.quantity + 1,
              total: l.total + l.productPrice / (1 + l.productVatRate),
              totalTaxInclusive: l.totalTaxInclusive + l.productPrice,
            }
          : l
      );
    },
    removeProductByIndex(state, action) {
      if (state.lines?.at(action.payload)?.quantity! === 1) {
        state.lines = state.lines.filter((l, i) => i !== action.payload);
      } else {
        state.lines = state.lines.map((l, i) =>
          i === action.payload
            ? {
                ...l,
                quantity: l.quantity - 1,
                total: l.total - l.productPrice / (1 + l.productVatRate),
                totalTaxInclusive: l.totalTaxInclusive - l.productPrice,
              }
            : l
        );
      }
    },
    addBundle(state, action) {
      state.lines = [
        ...state.lines,
        {
          productId: action.payload.product.id,
          productModel: action.payload.product.model,
          productTitle: action.payload.product.title,
          productPrice: action.payload.product.price,
          productImage: action.payload.product.image,
          productVatRate: action.payload.product.vatRate,
          quantity: 1,
          total:
            action.payload.product.price / (1 + action.payload.product.vatRate),
          totalTaxInclusive: action.payload.product.price,
          menuChoices: action.payload.lines,
        },
      ];
    },
    setDiscount(state, discount) {
      state.discount.value = discount.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const ShoppingBagActions = shoppingBagSlice.actions;

export default shoppingBagSlice;
