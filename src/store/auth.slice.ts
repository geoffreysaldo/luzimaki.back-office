import { createSlice } from "@reduxjs/toolkit";
import * as jwt from "jsonwebtoken";

export interface AuthRestorerResponse {
  organizationId?: string;
  email?: string;
  accessToken?: string;
  firstname?: string;
  lastname?: string;
  storeIds?: string[];
}

const getInitialState = () => {
  if (localStorage.getItem("authContext")) {
    const authContext = JSON.parse(
      localStorage.getItem("authContext") as string
    );
    if (authContext.accessToken && authContext.accessToken !== "undefined") {
      const { eat } = jwt.decode(authContext.accessToken) as any;
      if (Date.now() > eat * 1000) {
        localStorage.removeItem("accessToken");
        return {};
      } else {
        return authContext;
      }
    }
  }

  return {};
};

const authSlice = createSlice({
  name: "authState",
  initialState: getInitialState() as AuthRestorerResponse,
  reducers: {
    login(state, authRestorerResponse) {
      localStorage.setItem(
        "authContext",
        JSON.stringify({
          organizationId: authRestorerResponse.payload.organizationId,
          email: authRestorerResponse.payload.email,
          accessToken: authRestorerResponse.payload.accessToken,
          firstname: authRestorerResponse.payload.firstname,
          lastname: authRestorerResponse.payload.lastname,
          storeIds: authRestorerResponse.payload.storeIds,
        })
      );
      state.organizationId = authRestorerResponse.payload.organizationId;
      state.email = authRestorerResponse.payload.email;
      state.accessToken = authRestorerResponse.payload.accessToken;
      state.firstname = authRestorerResponse.payload.firstname;
      state.lastname = authRestorerResponse.payload.lastname;
      state.storeIds = authRestorerResponse.payload.storeIds;
    },
    logout(state) {
      localStorage.removeItem("authContext");
      state.organizationId = undefined;
      state.email = undefined;
      state.accessToken = undefined;
      state.firstname = undefined;
      state.lastname = undefined;
      state.storeIds = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const AuthActions = authSlice.actions;

export default authSlice;
