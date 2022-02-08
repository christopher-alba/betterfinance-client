import React, { useEffect, useState } from "react";
import {
  MainDiv,
  NetIncomeDiv,
  NetIncomeHeading,
  NetIncomeRow,
  NetIncomeText,
} from "./styled";
import { Container } from "../../components/Container";
import { Title } from "../../components/Title";
import { EXPENSES, INCOMES } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import Loading from "../../components/Loading";
import { Select } from "semantic-ui-react";
import { formatMoneyString, standardizeMoney } from "../../helpers";

const frequencyOptions = [
  { key: "Daily", value: "Daily", text: "Daily" },
  { key: "Weekly", value: "Weekly", text: "Weekly" },
  { key: "Monthly", value: "Monthly", text: "Monthly" },
  { key: "Yearly", value: "Yearly", text: "Yearly" },
];
const Goals = () => {
  const profileID = localStorage.getItem("profileID");
  const { loading: incomesLoading, data: incomesData } = useQuery(INCOMES, {
    variables: {
      profileID,
    },
  });
  const { loading: expensesLoading, data: expensesData } = useQuery(EXPENSES, {
    variables: {
      profileID,
    },
  });

  const [selectedFrequency] = useState("Yearly");
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalNetIncome, setTotalNetIncome] = useState(0);

  useEffect(() => {
    setTotalIncome(
      standardizeMoney(
        incomesData?.getAllUserIncomes.filter((income) => income.active),
        selectedFrequency
      )?.reduce((partialSum, a) => partialSum + parseFloat(a.amount), 0)
    );
  }, [incomesData, selectedFrequency]);
  useEffect(() => {
    setTotalExpenses(
      standardizeMoney(
        expensesData?.getAllUserExpenses.filter((expense) => expense.active),
        selectedFrequency
      )?.reduce((partialSum, a) => partialSum + parseFloat(a.amount), 0)
    );
  }, [expensesData, selectedFrequency]);
  useEffect(() => {
    setTotalNetIncome(totalIncome - totalExpenses);
  }, [totalIncome, totalExpenses]);

  if (incomesLoading || expensesLoading) {
    return <Loading message="Loading the goals page..." />;
  }

  return (
    <MainDiv>
      <Container>
        <Title>Goals</Title>
        <NetIncomeDiv>
          <NetIncomeRow>
            <NetIncomeHeading>Net Income Details</NetIncomeHeading>
            <Select options={frequencyOptions} placeholder="Frequency" />
          </NetIncomeRow>
          <hr />
          <NetIncomeRow>
            <NetIncomeText>
              <strong>Total Income</strong>
            </NetIncomeText>
            <NetIncomeText>
              {formatMoneyString(totalIncome?.toFixed(2))}
            </NetIncomeText>
          </NetIncomeRow>
          <NetIncomeRow>
            <NetIncomeText>
              <strong>Total Expenses</strong>
            </NetIncomeText>
            <NetIncomeText>
              {formatMoneyString(totalExpenses?.toFixed(2))}
            </NetIncomeText>
          </NetIncomeRow>
          <NetIncomeRow>
            <NetIncomeText>
              <strong>Total Net Income</strong>
            </NetIncomeText>
            <NetIncomeText>
              {formatMoneyString(totalNetIncome?.toFixed(2))}
            </NetIncomeText>
          </NetIncomeRow>
        </NetIncomeDiv>
      </Container>
    </MainDiv>
  );
};

export default Goals;
