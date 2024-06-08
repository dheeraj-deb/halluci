import { gql } from "@apollo/client";

export const ADD_TO_CART = gql`
  mutation addToCart(
    $userId: String!
    $productId: String!
    $products: [ProductInput!]!
  ) {
    addToCart(userId: $userId, productId: $productId, products: $products) {
      status
      message
    }
  }
`;
