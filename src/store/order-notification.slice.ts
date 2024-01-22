import { createSlice } from "@reduxjs/toolkit";
import { OrderNotificationFragment } from "../graphql/orders/fragments/__generated__/OrderNotificationFragment";

const orderNotificationSlice = createSlice({
  name: "authState",
  initialState: { notifications: [] as OrderNotificationFragment[] },
  reducers: {
    setOrderNotifications(state, orderNotifications) {
      state.notifications = orderNotifications.payload || [];
    },
    addOrderNotification(state, orderNotifications) {
      state.notifications = [
        ...state.notifications,
        orderNotifications.payload,
      ];
    },
    resetOrderNotifications(state) {
      state.notifications = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const OrderNotificationActions = orderNotificationSlice.actions;

export default orderNotificationSlice;
