import { gql } from "@apollo/client";

export const SEND_OTP = gql`
  mutation sendOtp($phone: String!) {
    sendOtp(phone: $phone) {
      status
    }
    
  }
`;


export const VERIFY_OTP = gql`
  mutation verifyOtp($phone: String!,$otp:String!) {
    verifyOtp(phone: $phone,otp:$otp) {
      status
    }
    
  }
`;

