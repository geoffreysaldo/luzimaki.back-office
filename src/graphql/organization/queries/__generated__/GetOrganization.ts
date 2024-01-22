/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOrganization
// ====================================================

export interface GetOrganization_getOrganization_stores_deliveryZones_zones {
  __typename: "Zone";
  id: string;
  city: string;
  zipCode: string;
}

export interface GetOrganization_getOrganization_stores_deliveryZones {
  __typename: "DeliveryZone";
  id: string;
  storeId: string;
  minimumLunch: number | null;
  minimumDinner: number | null;
  deliveryCost: number;
  rank: number;
  zones: (GetOrganization_getOrganization_stores_deliveryZones_zones | null)[];
}

export interface GetOrganization_getOrganization_stores {
  __typename: "Store";
  id: string;
  name: string;
  slug: string;
  organizationId: string;
  createdAt: any;
  deliveryZones: GetOrganization_getOrganization_stores_deliveryZones[];
}

export interface GetOrganization_getOrganization {
  __typename: "Organization";
  id: string;
  name: string;
  slug: string;
  createdAt: any;
  closed: boolean;
  closedInformations: string | null;
  stores: GetOrganization_getOrganization_stores[];
}

export interface GetOrganization {
  getOrganization: GetOrganization_getOrganization;
}

export interface GetOrganizationVariables {
  organizationId: string;
}
