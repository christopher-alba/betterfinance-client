import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      token
    }
  }
`;

export const REGISTER = gql`
  mutation Register($username: String!, $password: String!, $email: String!) {
    register(username: $username, password: $password, email: $email) {
      username
      token
    }
  }
`;

export const CREATEINCOME = gql`
  mutation CreateIncome($income: createIncomeArgs!) {
    createIncome(income: $income) {
      _id
    }
  }
`;

export const DELETEINCOME = gql`
  mutation DeleteIncome($incomeID: String!) {
    deleteIncome(incomeID: $incomeID)
  }
`;
