/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderState, PaymentState, OrderMode, OrderSource, ProductModel } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: SearchOrdersResponseFragment
// ====================================================

export interface SearchOrdersResponseFragment_orders_contact {
  __typename: "Contact";
  id: string;
  accountId: string | null;
  lastname: string;
  firstname: string;
  address: string | null;
  addressComplement: string | null;
  city: string | null;
  zipCode: string | null;
  email: string | null;
  phone: string;
  comment: string | null;
}

export interface SearchOrdersResponseFragment_orders_lines_menuChoices {
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

export interface SearchOrdersResponseFragment_orders_lines_addOnChoices {
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

export interface SearchOrdersResponseFragment_orders_lines {
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
  menuChoices: (SearchOrdersResponseFragment_orders_lines_menuChoices | null)[] | null;
  addOnChoices: (SearchOrdersResponseFragment_orders_lines_addOnChoices | null)[] | null;
}

export interface SearchOrdersResponseFragment_orders {
  __typename: "Order";
  id: string;
  orderNumber: string | null;
  storeId: string;
  contact: SearchOrdersResponseFragment_orders_contact;
  guestsNumber: number | null;
  issuedAt: number;
  expectedAt: number;
  fulfillmentState: OrderState;
  financialState: PaymentState;
  mode: OrderMode;
  source: OrderSource;
  comment: string | null;
  lines: (SearchOrdersResponseFragment_orders_lines | null)[];
  discount: number;
  tips: number | null;
  total: number;
  totalTaxInclusive: number;
  totalDiscount: number;
  totalShipping: number;
  totalVat: number;
}

export interface SearchOrdersResponseFragment {
  __typename: "SearchOrdersResponse";
  orders: (SearchOrdersResponseFragment_orders | null)[];
  totalCount: number;
}
