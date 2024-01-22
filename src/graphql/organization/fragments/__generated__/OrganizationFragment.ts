/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: OrganizationFragment
// ====================================================

export interface OrganizationFragment_stores_deliveryZones_zones {
  __typename: "Zone";
  id: string;
  city: string;
  zipCode: string;
}

export interface OrganizationFragment_stores_deliveryZones {
  __typename: "DeliveryZone";
  id: string;
  storeId: string;
  minimumLunch: number | null;
  minimumDinner: number | null;
  deliveryCost: number;
  rank: number;
  zones: (OrganizationFragment_stores_deliveryZones_zones | null)[];
}

export interface OrganizationFragment_stores {
  __typename: "Store";
  id: string;
  name: string;
  slug: string;
  organizationId: string;
  createdAt: any;
  deliveryZones: OrganizationFragment_stores_deliveryZones[];
}

export interface OrganizationFragment {
  __typename: "Organization";
  id: string;
  name: string;
  slug: string;
  createdAt: any;
  closed: boolean;
  closedInformations: string | null;
  stores: OrganizationFragment_stores[];
}
