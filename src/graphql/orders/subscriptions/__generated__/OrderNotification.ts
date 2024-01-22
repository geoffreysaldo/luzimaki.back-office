/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderNotificationStatus } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL subscription operation: OrderNotification
// ====================================================

export interface OrderNotification_orderNotification {
  __typename: "OrderNotification";
  id: string;
  orderId: string;
  storeId: string;
  issuedAt: any;
  notificationStatus: OrderNotificationStatus;
}

export interface OrderNotification {
  orderNotification: OrderNotification_orderNotification;
}

export interface OrderNotificationVariables {
  storeId: string;
}
