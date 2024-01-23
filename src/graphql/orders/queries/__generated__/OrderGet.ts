/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderState, PaymentState, OrderMode, OrderSource, ProductModel } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: OrderGet
// ====================================================

export interface OrderGet_orderGet_contact {
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

export interface OrderGet_orderGet_lines_menuChoices {
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

export interface OrderGet_orderGet_lines_addOnChoices {
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

export interface OrderGet_orderGet_lines {
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
  menuChoices: (OrderGet_orderGet_lines_menuChoices | null)[] | null;
  addOnChoices: (OrderGet_orderGet_lines_addOnChoices | null)[] | null;
}

export interface OrderGet_orderGet {
  __typename: "Order";
  id: string;
  orderNumber: string | null;
  storeId: string;
  contact: OrderGet_orderGet_contact;
  guestsNumber: number | null;
  issuedAt: number;
  expectedAt: number;
  fulfillmentState: OrderState;
  financialState: PaymentState;
  mode: OrderMode;
  source: OrderSource;
  comment: string | null;
  lines: (OrderGet_orderGet_lines | null)[];
  discount: number;
  tips: number | null;
  total: number;
  totalTaxInclusive: number;
  totalDiscount: number;
  totalShipping: number;
  totalVat: number;
}

export interface OrderGet {
  orderGet: OrderGet_orderGet;
}

export interface OrderGetVariables {
  storeId: string;
  id: string;
}
