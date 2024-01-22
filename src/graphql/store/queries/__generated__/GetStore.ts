/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetStore
// ====================================================

export interface GetStore_getStore_deliveryZones_zones {
  __typename: "Zone";
  id: string;
  city: string;
  zipCode: string;
}

export interface GetStore_getStore_deliveryZones {
  __typename: "DeliveryZone";
  id: string;
  storeId: string;
  minimumLunch: number | null;
  minimumDinner: number | null;
  deliveryCost: number;
  rank: number;
  zones: (GetStore_getStore_deliveryZones_zones | null)[];
}

export interface GetStore_getStore {
  __typename: "Store";
  id: string;
  name: string;
  slug: string;
  organizationId: string;
  createdAt: any;
  deliveryZones: GetStore_getStore_deliveryZones[];
}

export interface GetStore {
  getStore: GetStore_getStore;
}

export interface GetStoreVariables {
  id: string;
}
