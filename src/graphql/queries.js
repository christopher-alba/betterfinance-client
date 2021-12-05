import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
  query Authenticate {
    me {
      username
      token
    }
  }
`;