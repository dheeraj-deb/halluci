import { gql } from "@apollo/client";

export const GET_CART = gql`
query getCart($userId: String!) {
  getCart(userId: $userId) {
    grandTotal
    products {
      product {
        name
        description
        category
        price
        image
        variations {
          image
          color
          _id
        }
        total
      }
      variantDetails {
        variantId
        quantity
        image
        color
      }
    }
  }
}
`;
