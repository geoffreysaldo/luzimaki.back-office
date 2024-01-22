import { gql } from "@apollo/client";
import { StoreFragment } from "../../store/fragments/store.fragment";

export const OrganizationFragment = gql`
  fragment OrganizationFragment on Organization {
    id
    name
    slug
    createdAt
    closed
    closedInformations
    stores {
      ...StoreFragment
    }
  }
  ${StoreFragment}
`;
