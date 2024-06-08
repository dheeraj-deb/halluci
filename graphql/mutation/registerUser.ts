import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation registration(
    $name: String!
    $shopname: String!
    $phone: String!
    $address: AddressInput!
  ) {
    registration(
      name: $name
      shopname: $shopname
      phone: $phone
      address: $address
    ) {
      status
      message
    }
  }
`;
