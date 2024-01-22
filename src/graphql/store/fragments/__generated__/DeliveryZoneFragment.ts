/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DeliveryZoneFragment
// ====================================================

export interface DeliveryZoneFragment_zones {
  __typename: "Zone";
  id: string;
  city: string;
  zipCode: string;
}

export interface DeliveryZoneFragment {
  __typename: "DeliveryZone";
  id: string;
  storeId: string;
  minimumLunch: number | null;
  minimumDinner: number | null;
  deliveryCost: number;
  rank: number;
  zones: (DeliveryZoneFragment_zones | null)[];
}
