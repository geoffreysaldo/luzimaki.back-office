/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderNotificationStatus } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetOrderNotifications
// ====================================================

export interface GetOrderNotifications_getOrderNotifications {
  __typename: "OrderNotification";
  id: string;
  orderId: string;
  storeId: string;
  issuedAt: any;
  notificationStatus: OrderNotificationStatus;
}

export interface GetOrderNotifications {
  getOrderNotifications: GetOrderNotifications_getOrderNotifications[];
}

export interface GetOrderNotificationsVariables {
  storeId: string;
}
