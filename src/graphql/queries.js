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

export const EXPENSES = gql`
  query GetAllUserExpenses($profileID: ID!) {
    getAllUserExpenses(profileID: $profileID) {
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

export const GOALS = gql`
  query GetUserGoals($profileID: ID!) {
    getAllUserGoals(profileID: $profileID) {
      name
      targetAmount
      currentAmount
      completionDate
      contributionAmount
      contributionFrequency
      active
      profileID
      _id
    }
  }
`;
