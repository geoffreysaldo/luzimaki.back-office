/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderNotificationStatus } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateOrderNotification
// ====================================================

export interface UpdateOrderNotification_updateOrderNotification {
  __typename: "OrderNotification";
  id: string;
  orderId: string;
  storeId: string;
  issuedAt: any;
  notificationStatus: OrderNotificationStatus;
}

export interface UpdateOrderNotification {
  updateOrderNotification: UpdateOrderNotification_updateOrderNotification;
}

export interface UpdateOrderNotificationVariables {
  orderNotificationId: string;
  notificationStatus: OrderNotificationStatus;
}
