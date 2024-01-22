/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderInput, OrderState, PaymentState, OrderMode, OrderSource, ProductModel } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AdminOrderCreate
// ====================================================

export interface AdminOrderCreate_adminOrderCreate_contact {
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

export interface AdminOrderCreate_adminOrderCreate_lines_menuChoices {
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

export interface AdminOrderCreate_adminOrderCreate_lines_addOnChoices {
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

export interface AdminOrderCreate_adminOrderCreate_lines {
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
  menuChoices: (AdminOrderCreate_adminOrderCreate_lines_menuChoices | null)[] | null;
  addOnChoices: (AdminOrderCreate_adminOrderCreate_lines_addOnChoices | null)[] | null;
}

export interface AdminOrderCreate_adminOrderCreate {
  __typename: "Order";
  id: string;
  orderNumber: string | null;
  storeId: string;
  contact: AdminOrderCreate_adminOrderCreate_contact;
  guestsNumber: number | null;
  issuedAt: number;
  expectedAt: number;
  fulfillmentState: OrderState;
  financialState: PaymentState;
  mode: OrderMode;
  source: OrderSource;
  comment: string | null;
  lines: (AdminOrderCreate_adminOrderCreate_lines | null)[];
  discount: number;
  tips: number | null;
  total: number;
  totalTaxInclusive: number;
  totalDiscount: number;
  totalShipping: number;
  totalVat: number;
}

export interface AdminOrderCreate {
  adminOrderCreate: AdminOrderCreate_adminOrderCreate;
}

export interface AdminOrderCreateVariables {
  storeId: string;
  orderInput: OrderInput;
}
