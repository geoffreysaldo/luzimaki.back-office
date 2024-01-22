import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import orderNotificationSlice from "./order-notification.slice";
import shoppingBagSlice, { Discount } from "./shopping-bag";
import { OrderLineInput } from "../__generated__/globalTypes";
import { OrderNotificationFragment } from "../graphql/orders/fragments/__generated__/OrderNotificationFragment";
import {
  StoreFragment,
  StoreFragment_deliveryZones,
} from "../graphql/store/fragments/__generated__/StoreFragment";
import storeSlice from "./store.slice";
import organizationSlice from "./organization.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    orderNotifications: orderNotificationSlice.reducer,
    shoppingBag: shoppingBagSlice.reducer,
    store: storeSlice.reducer,
    organization: organizationSlice.reducer,
  },
});

export interface StoreState {
  auth: {
    organizationId?: string;
    email?: string;
    accessToken?: string;
    firstname?: string;
    lastname?: string;
    storeIds?: string[];
  };
  orderNotifications: {
    notifications: OrderNotificationFragment[];
  };
  shoppingBag: {
    lines: OrderLineInput[];
    discount: Discount;
    tips: number;
  };
  store: {
    id: string;
    name: string;
    slug: string;
    organizationId: string;
    createdAt: any;
    deliveryZones: StoreFragment_deliveryZones[];
  };
  organization: {
    id: string;
    name: string;
    slug: string;
    createdAt: string;
    closed: boolean;
    closedInformations: string;
    stores: StoreFragment[];
  };
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
