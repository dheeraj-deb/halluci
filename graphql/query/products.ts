import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
        _id
        name
        description
        # category
        # image
        variations{
            # _id
            color
            image
        }
        price
    }
    
  }
`;


export const GET_PRODUCT = gql`
  query getProduct($id:String!) {
    getProduct(id:$id) {
        _id
        name
        description
        # category
        # image
        variations{
            # _id
            color
            image
        }
        price
    }
    
  }
`;