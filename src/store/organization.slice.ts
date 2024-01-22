import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  if (localStorage.getItem("organizationContext")) {
    const organizationContext = JSON.parse(
      localStorage.getItem("organizationContext") as string
    );

    return organizationContext;
  }

  return {};
};

const organizationSlice = createSlice({
  name: "organizationState",
  initialState: getInitialState(),
  reducers: {
    setOrganization(state, organization) {
      localStorage.setItem(
        "organizationContext",
        JSON.stringify({
          id: organization.payload.id,
          name: organization.payload.name,
          slug: organization.payload.slug,
          createdAt: organization.payload.createdAt,
          closed: organization.payload.closed,
          closedInformations: organization.payload.closedInformations,
          stores: organization.payload.stores,
        })
      );
      state.id = organization.payload.id;
      state.name = organization.payload.name;
      state.slug = organization.payload.slug;
      state.createdAt = organization.payload.createdAt;
      state.closed = organization.payload.closed;
      state.closedInformations = organization.payload.closedInformations;
      state.stores = organization.payload.stores;
    },
  },
});

// Action creators are generated for each case reducer function
export const organizationActions = organizationSlice.actions;

export default organizationSlice;
