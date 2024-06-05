import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation registration(
    $name: String!
    $shopname: String!
    $phonenumber: String!
    $address: AddressInput!
    $password: String!
  ) {
    registration(
      name: $name
      shopname: $shopname
      phonenumber: $phonenumber
      address: $address
      password: $password
    ) {
      status
      message
    }
  }
`;
