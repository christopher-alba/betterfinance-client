import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "styled-components";
import Loading from "../../components/Loading";
import { Container } from "../../components/Container";
import { Title } from "../../components/Title";
import { EXPENSES } from "../../graphql/queries";
import { ChartDiv, MainDiv } from "./styled";
import { Button, Icon, Select, Table } from "semantic-ui-react";
import { DELETEEXPENSE } from "../../graphql/mutations";
import CreateExpenseModal from "./CreateExpenseModal";
import ExpenseTableRow from "./ExpenseTableRow";
import UpdateExpenseModal from "./UpdateExpenseModal";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useWindowWidth from "../../hooks/useWindowWidth";
import { standardizeMoney } from "../../helpers";
const frequencyOptions = [
  { key: "Daily", value: "Daily", text: "Daily" },
  { key: "Weekly", value: "Weekly", text: "Weekly" },
  { key: "Monthly", value: "Monthly", text: "Monthly" },
  { key: "Yearly", value: "Yearly", text: "Yearly" },
];
const Expenses = () => {
  const themeContext = useContext(ThemeContext);
  const [selectedExpense, setSelectedExpense] = useState(undefined);
  const [selectedFrequency, setSelectedFrequency] = useState("Yearly");
  const [chartData, setChartData] = useState(undefined);
  const profileID = localStorage.getItem("profileID");
  const { loading, data } = useQuery(EXPENSES, {
    variables: {
      profileID,
    },
  });
  const windowWidth = useWindowWidth();
  const [deleteExpense, { loading: deletingExpense }] =
    useMutation(DELETEEXPENSE);
  useEffect(() => {
    setSelectedExpense(
      data?.getAllUserExpenses.find(
        (expense) => expense._id === selectedExpense?._id
      )
    );
    setChartData(
      standardizeMoney(
        data?.getAllUserExpenses.filter((expense) => expense.active),
        selectedFrequency
      )
    );
  }, [data, selectedFrequency, selectedExpense]);

  const findLargestAmount = (chartData) => {
    let largestNumber = 0;
    for (let i = 0; i < chartData?.length; i++) {
      if (largestNumber < parseFloat(chartData[i].amount)) {
        largestNumber = chartData[i].amount;
      }
    }
    return Math.floor(largestNumber * 1.3);
  };

  if (loading) {
    return <Loading message="Loading Your Expenses..." />;
  }
  return (
    <MainDiv>
      <Container>
        <Title>Expenses</Title>
        <Table
          style={{ marginTop: "50px" }}
          compact
          celled
          selectable
          inverted={themeContext.name === "dark" ? true : false}
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Active</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Frequency</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data?.getAllUserExpenses.map((userExpense) => {
              return (
                <ExpenseTableRow
                  userExpense={userExpense}
                  selectedExpense={selectedExpense?._id}
                  setSelectedExpense={setSelectedExpense}
                />
              );
            })}
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan="4">
                <CreateExpenseModal profileID={profileID} />
                {selectedExpense && (
                  <>
                    <Button
                      size="small"
                      onClick={() => setSelectedExpense(undefined)}
                    >
                      Deselect Expense
                    </Button>
                    <UpdateExpenseModal expense={selectedExpense} />
                    <Button
                      icon
                      size="small"
                      color="red"
                      disabled={deletingExpense}
                      loading={deletingExpense}
                      labelPosition="left"
                      onClick={() => {
                        deleteExpense({
                          variables: {
                            expenseID: selectedExpense._id,
                          },
                          refetchQueries: [EXPENSES],
                        }).then((res) => {
                          setSelectedExpense(undefined);
                        });
                      }}
                    >
                      <Icon name="close" />
                      Remove Expense
                    </Button>
                  </>
                )}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <ChartDiv>
          <h1 style={{ color: "black" }}>
            Your Expenses Visualised (All converted to {selectedFrequency}{" "}
            expense)
          </h1>
          <Select
            options={frequencyOptions}
            defaultValue={selectedFrequency}
            placeholder="Frequency"
            onChange={(evt, data) => {
              setSelectedFrequency(data.value);
            }}
          />
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{
                top: 10,
                right: 0,
                bottom: 10,
                left: windowWidth < 500 ? 50 : 100,
              }}
              barSize={50}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <YAxis dataKey="name" type="category" />
              <XAxis type="number" domain={[0, findLargestAmount(chartData)]} />
              <Tooltip contentStyle={{ color: "black" }} />
              <Legend />
              <Bar dataKey="amount" fill="#02b191" scale />
            </BarChart>
          </ResponsiveContainer>
        </ChartDiv>
      </Container>
    </MainDiv>
  );
};

export default Expenses;
