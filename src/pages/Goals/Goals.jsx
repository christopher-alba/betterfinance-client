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
import { EXPENSES, GOALS, INCOMES } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import Loading from "../../components/Loading";
import { Button, Checkbox, Icon, Table, Select } from "semantic-ui-react";
import {
  formatDateString,
  formatMoneyString,
  standardizeMoney,
} from "../../helpers";
import { calculateCompletionDate } from "../../helpers/goals";

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
  const { loading: goalsLoading, data: goalsData } = useQuery(GOALS, {
    variables: {
      profileID,
    },
  });

  const [selectedFrequency, setSelectedFrequency] = useState("Yearly");
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

  if (incomesLoading || expensesLoading || goalsLoading) {
    return <Loading message="Loading the goals page..." />;
  }

  return (
    <MainDiv>
      <Container>
        <Title>Goals</Title>
        <NetIncomeDiv>
          <NetIncomeRow>
            <NetIncomeHeading>Net Income Details</NetIncomeHeading>
            <Select
              options={frequencyOptions}
              placeholder="Frequency"
              defaultValue="Yearly"
              onChange={(evt, data) => {
                setSelectedFrequency(data.value);
              }}
            />
          </NetIncomeRow>
          <hr />
          <NetIncomeRow>
            <NetIncomeText>
              <strong>Total Income</strong>
            </NetIncomeText>
            <NetIncomeText color="green">
              {formatMoneyString(totalIncome?.toFixed(2))}
            </NetIncomeText>
          </NetIncomeRow>
          <NetIncomeRow>
            <NetIncomeText>
              <strong>Total Expenses</strong>
            </NetIncomeText>
            <NetIncomeText color="red">
              {formatMoneyString(totalExpenses?.toFixed(2))}
            </NetIncomeText>
          </NetIncomeRow>
          <NetIncomeRow>
            <NetIncomeText>
              <strong>Total Net Income</strong>
            </NetIncomeText>
            <NetIncomeText color={totalNetIncome > 0 ? "green" : "red"}>
              {formatMoneyString(totalNetIncome?.toFixed(2))}
            </NetIncomeText>
          </NetIncomeRow>
        </NetIncomeDiv>
        <Table compact celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Active</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Target Amount</Table.HeaderCell>
              <Table.HeaderCell>Current Amount</Table.HeaderCell>
              <Table.HeaderCell>Contribution Amount</Table.HeaderCell>
              <Table.HeaderCell>Contribution Frequency</Table.HeaderCell>
              <Table.HeaderCell>Target Completion Date</Table.HeaderCell>
              <Table.HeaderCell>Estimated Completion Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {goalsData.getAllUserGoals.map((goal) => {
              return (
                <Table.Row key={goal._id}>
                  <Table.Cell collapsing>
                    <Checkbox toggle />
                  </Table.Cell>
                  <Table.Cell>{goal.name}</Table.Cell>
                  <Table.Cell>{goal.targetAmount}</Table.Cell>
                  <Table.Cell>{goal.currentAmount}</Table.Cell>
                  <Table.Cell>{goal.contributionAmount}</Table.Cell>
                  <Table.Cell>{goal.contributionFrequency}</Table.Cell>
                  <Table.Cell>
                    {formatDateString(goal.completionDate)}
                  </Table.Cell>
                  <Table.Cell>
                    {calculateCompletionDate(
                      goal.contributionAmount,
                      goal.contributionFrequency,
                      goal.targetAmount,
                      goal.currentAmount
                    )}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan="8">
                <Button
                  floated="right"
                  icon
                  labelPosition="left"
                  primary
                  size="small"
                >
                  <Icon name="user" /> Add User
                </Button>
                <Button size="small">Approve</Button>
                <Button disabled size="small">
                  Approve All
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Container>
    </MainDiv>
  );
};

export default Goals;
