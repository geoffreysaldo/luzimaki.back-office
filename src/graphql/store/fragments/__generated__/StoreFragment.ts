/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: StoreFragment
// ====================================================

export interface StoreFragment_deliveryZones_zones {
  __typename: "Zone";
  id: string;
  city: string;
  zipCode: string;
}

export interface StoreFragment_deliveryZones {
  __typename: "DeliveryZone";
  id: string;
  storeId: string;
  minimumLunch: number | null;
  minimumDinner: number | null;
  deliveryCost: number;
  rank: number;
  zones: (StoreFragment_deliveryZones_zones | null)[];
}

export interface StoreFragment {
  __typename: "Store";
  id: string;
  name: string;
  slug: string;
  organizationId: string;
  createdAt: any;
  deliveryZones: StoreFragment_deliveryZones[];
}
