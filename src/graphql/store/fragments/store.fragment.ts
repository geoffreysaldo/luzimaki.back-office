import { gql } from "@apollo/client";
import { DeliveryZoneFragment } from "./delivery-zone.fragment";

export const StoreFragment = gql`
  fragment StoreFragment on Store {
    id
    name
    slug
    organizationId
    createdAt
    deliveryZones {
      ...DeliveryZoneFragment
    }
  }
  ${DeliveryZoneFragment}
`;
