import { createSlice } from "@reduxjs/toolkit";
import { OrderNotificationFragment } from "../graphql/orders/fragments/__generated__/OrderNotificationFragment";
import { ContactInput } from "../__generated__/globalTypes";

const initialContact: ContactInput = {
  id: null,
  accountId: null,
  lastname: "",
  firstname: "",
  address: null,
  addressComplement: null,
  city: null,
  zipCode: null,
  email: null,
  phone: "",
  comment: null,
};

const orderNotificationSlice = createSlice({
  name: "customerState",
  initialState: { contact: initialContact },
  reducers: {
    setContact(state, contact) {
      state.contact = contact.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const OrderNotificationActions = orderNotificationSlice.actions;

export default orderNotificationSlice;
