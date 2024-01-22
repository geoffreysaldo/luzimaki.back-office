import { gql } from "@apollo/client";
import { ZoneFragment } from "./zone.fragment";

export const DeliveryZoneFragment = gql`
  fragment DeliveryZoneFragment on DeliveryZone {
    id
    storeId
    minimumLunch
    minimumDinner
    deliveryCost
    rank
    zones {
      ...ZoneFragment
    }
  }
  ${ZoneFragment}
`;
