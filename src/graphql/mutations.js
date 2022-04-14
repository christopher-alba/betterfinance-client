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

export const UPDATEINCOME = gql`
  mutation UpdateIncome($incomeObj: updateIncomeArgs!, $incomeID: String!) {
    updateIncome(incomeObj: $incomeObj, incomeID: $incomeID) {
      _id
    }
  }
`;

export const DELETEINCOME = gql`
  mutation DeleteIncome($incomeID: String!) {
    deleteIncome(incomeID: $incomeID)
  }
`;

export const CREATEEXPENSE = gql`
  mutation CreateExpense($expense: createExpenseArgs!) {
    createExpense(expense: $expense) {
      _id
    }
  }
`;

export const UPDATEEXPENSE = gql`
  mutation UpdateExpense($expenseObj: updateExpenseArgs!, $expenseID: String!) {
    updateExpense(expenseObj: $expenseObj, expenseID: $expenseID) {
      _id
    }
  }
`;

export const DELETEEXPENSE = gql`
  mutation DeleteExpense($expenseID: String!) {
    deleteExpense(expenseID: $expenseID)
  }
`;

export const CREATEGOAL = gql`
  mutation CreateGoal($goal: createGoalArgs!) {
    createGoal(goal: $goal) {
      _id
    }
  }
`;

export const UPDATEGOAL = gql`
  mutation UpdateGoal($goalObj: updateGoalArgs!, $goalID: String!) {
    updateGoal(goalObj: $goalObj, goalID: $goalID) {
      _id
    }
  }
`;

export const DELETEGOAL = gql`
  mutation DeleteGoal($goalID: String!) {
    deleteGoal(goalID: $goalID)
  }
`;
