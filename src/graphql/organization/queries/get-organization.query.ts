import { gql } from "@apollo/client";
import { OrganizationFragment } from "../fragments/organization.fragment";

export const GET_ORGANIZATION = gql`
  query GetOrganization($organizationId: String!) {
    getOrganization(organizationId: $organizationId) {
      ...OrganizationFragment
    }
  }
  ${OrganizationFragment}
`;
