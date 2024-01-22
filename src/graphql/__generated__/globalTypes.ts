/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum OrderMode {
  DELIVERY = "DELIVERY",
  ON_PLACE = "ON_PLACE",
  TAKE_AWAY = "TAKE_AWAY",
}

export enum OrderNotificationStatus {
  UNVIEW = "UNVIEW",
  VIEW = "VIEW",
}

export enum OrderSource {
  BACK_OFFICE = "BACK_OFFICE",
  FRONT_OFFICE = "FRONT_OFFICE",
}

export enum OrderState {
  AWAITING_FOR_DELIVERY = "AWAITING_FOR_DELIVERY",
  AWAITING_FOR_TAKE_AWAY = "AWAITING_FOR_TAKE_AWAY",
  COMPLETED = "COMPLETED",
  ERROR = "ERROR",
  IN_DELIVERY = "IN_DELIVERY",
  IN_PROGRESS = "IN_PROGRESS",
  NEW = "NEW",
  UPDATED = "UPDATED",
}

export enum PaymentState {
  PAID = "PAID",
  UNPAID = "UNPAID",
}

export enum ProductModel {
  MENU = "MENU",
  PRODUCT = "PRODUCT",
}

export interface ChoiceInput {
  stepId: string;
  step: number;
  category: string;
  optionId: string;
  productId: string;
  productTitle: string;
  productImage?: string | null;
  isForced: boolean;
  extraCharge: number;
  quantity: number;
}

export interface ContactInput {
  id?: string | null;
  accountId?: string | null;
  lastname: string;
  firstname: string;
  address?: string | null;
  addressComplement?: string | null;
  city?: string | null;
  zipCode?: string | null;
  email?: string | null;
  phone: string;
  comment?: string | null;
}

export interface FacetInput {
  key: string;
  value?: string | null;
  values?: (string | null)[] | null;
}

export interface NumericFilterInput {
  key: string;
  min?: number | null;
  max?: number | null;
}

export interface OrderInput {
  contact: ContactInput;
  expectedAt: number;
  mode: OrderMode;
  source: OrderSource;
  comment?: string | null;
  discount: number;
  discountCode?: string | null;
  lines?: (OrderLineInput | null)[] | null;
  tips?: number | null;
  total: number;
  totalTaxInclusive: number;
  totalDiscount: number;
  totalShipping: number;
  totalVat: number;
}

export interface OrderLineInput {
  productId: string;
  productModel: ProductModel;
  productTitle: string;
  productPrice: number;
  productImage?: string | null;
  productVatRate: number;
  quantity: number;
  total: number;
  totalTaxInclusive: number;
  menuChoices?: (ChoiceInput | null)[] | null;
  addOnChoices?: (ChoiceInput | null)[] | null;
}

export interface SearchInput {
  facets?: (FacetInput | null)[] | null;
  numericFilters?: (NumericFilterInput | null)[] | null;
  from: number;
  to: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
