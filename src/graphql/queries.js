import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
  query Authenticate {
    me {
      username
      token
      _id
    }
  }
`;

export const INCOMES = gql`
  query GetAllUserIncomes($profileID: ID!) {
    getAllUserIncomes(profileID: $profileID) {
      name
      amount
      frequency
      active
      profileID
      _id
    }
  }
`;

export const PROFILEID = gql`
  query GetUserProfileID($userID: ID!) {
    getProfile(userID: $userID) {
      _id
    }
  }
`;
