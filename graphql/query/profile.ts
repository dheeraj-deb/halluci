import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
query getProfile{
  getProfile {
    data {
      id
      name
      shopname
      phone
    }
    status
  }
}

`;