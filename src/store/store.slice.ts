import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  if (localStorage.getItem("storeContext")) {
    const storeContext = JSON.parse(
      localStorage.getItem("storeContext") as string
    );

    return storeContext;
  }

  return {};
};

const storeSlice = createSlice({
  name: "storeState",
  initialState: getInitialState(),
  reducers: {
    setStore(state, store) {
      localStorage.setItem(
        "storeContext",
        JSON.stringify({
          id: store.payload.id,
          name: store.payload.name,
          slug: store.payload.slug,
          organizationId: store.payload.organizationId,
          createdAt: store.payload.createdAt,
          deliveryZones: store.payload.deliveryZones,
        })
      );
      state.id = store.payload.id;
      state.name = store.payload.name;
      state.slug = store.payload.slug;
      state.organizationId = store.payload.organizationId;
      state.createdAt = store.payload.createdAt;
      state.deliveryZones = store.payload.deliveryZones;
    },
  },
});

// Action creators are generated for each case reducer function
export const storeActions = storeSlice.actions;

export default storeSlice;
