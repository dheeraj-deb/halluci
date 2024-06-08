import { gql } from "@apollo/client";

export const SEND_OTP = gql`
  mutation sendOtp($phone: String!) {
    sendOtp(phone: $phone) {
      status
    }
    
  }
`;


export const VERIFY_OTP_WHILE_REGISTERING = gql`
  mutation verifyOtpWhileRegistering($phone: String!,$otp:String!) {
    verifyOtpWhileRegistering(phone: $phone,otp:$otp) {
      status
    }
    
  }
`;

export const VERIFY_OTP_WHILE_LOGIN = gql`
  mutation verifyOtpWhileLogin($phone: String!,$otp:String!) {
    verifyOtpWhileLogin(phone: $phone,otp:$otp) {
      status
    }
    
  }
`;

