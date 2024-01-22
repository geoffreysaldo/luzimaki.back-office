import { gql } from "@apollo/client";

export const ORDER_PAID = gql`
  subscription OrderPaid($organizationId: String!) {
    orderPaid(organizationId: $organizationId)
  }
`;
