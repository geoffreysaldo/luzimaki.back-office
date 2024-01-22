import { gql } from "@apollo/client";

export const ZoneFragment = gql`
  fragment ZoneFragment on Zone {
    id
    city
    zipCode
  }
`;
