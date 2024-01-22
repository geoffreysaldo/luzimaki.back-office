/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductModel } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: OrderLineFragment
// ====================================================

export interface OrderLineFragment_menuChoices {
  __typename: "Choice";
  id: string;
  stepId: string;
  step: number;
  category: string;
  optionId: string;
  productId: string;
  productTitle: string;
  productImage: string | null;
  extraCharge: number;
  quantity: number;
}

export interface OrderLineFragment_addOnChoices {
  __typename: "Choice";
  id: string;
  stepId: string;
  step: number;
  category: string;
  optionId: string;
  productId: string;
  productTitle: string;
  productImage: string | null;
  extraCharge: number;
  quantity: number;
}

export interface OrderLineFragment {
  __typename: "OrderLine";
  id: string;
  productId: string;
  productModel: ProductModel;
  productTitle: string;
  productPrice: number;
  productImage: string | null;
  productVatRate: number;
  quantity: number;
  total: number;
  totalTaxInclusive: number;
  menuChoices: (OrderLineFragment_menuChoices | null)[] | null;
  addOnChoices: (OrderLineFragment_addOnChoices | null)[] | null;
}
