import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "styled-components";
import Loading from "../../components/Loading";
import { Container } from "../../components/Container";
import { Title } from "../../components/Title";
import { INCOMES } from "../../graphql/queries";
import { ChartDiv, MainDiv } from "./styled";
import { Button, Icon, Select, Table } from "semantic-ui-react";
import { DELETEINCOME } from "../../graphql/mutations";
import CreateIncomeModal from "./CreateIncomeModal";
import IncomeTableRow from "./IncomeTableRow";
import UpdateIncomeModal from "./UpdateIncomeModal/UpdateIncomeModal";
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
const Incomes = () => {
  const themeContext = useContext(ThemeContext);
  const [selectedIncome, setSelectedIncome] = useState(undefined);
  const [selectedFrequency, setSelectedFrequency] = useState("Yearly");
  const [chartData, setChartData] = useState(undefined);
  const profileID = localStorage.getItem("profileID");
  const { loading, data } = useQuery(INCOMES, {
    variables: {
      profileID,
    },
  });
  const windowWidth = useWindowWidth();
  const [deleteIncome, { loading: deletingIncome }] = useMutation(DELETEINCOME);
  useEffect(() => {
    setSelectedIncome(
      data?.getAllUserIncomes.find(
        (income) => income._id === selectedIncome?._id
      )
    );
    setChartData(
      standardizeMoney(
        data?.getAllUserIncomes.filter((income) => income.active),
        selectedFrequency
      )
    );
  }, [data, selectedFrequency, selectedIncome]);

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
    return <Loading message="Loading Your Incomes..." />;
  }
  return (
    <MainDiv>
      <Container>
        <Title>Incomes</Title>
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
            {data?.getAllUserIncomes.map((userIncome) => {
              return (
                <IncomeTableRow
                  userIncome={userIncome}
                  selectedIncome={selectedIncome?._id}
                  setSelectedIncome={setSelectedIncome}
                />
              );
            })}
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan="4">
                <CreateIncomeModal profileID={profileID} />
                {selectedIncome && (
                  <>
                    <Button
                      size="small"
                      onClick={() => setSelectedIncome(undefined)}
                    >
                      Deselect Income
                    </Button>
                    <UpdateIncomeModal income={selectedIncome} />
                    <Button
                      icon
                      size="small"
                      color="red"
                      disabled={deletingIncome}
                      loading={deletingIncome}
                      labelPosition="left"
                      onClick={() => {
                        deleteIncome({
                          variables: {
                            incomeID: selectedIncome._id,
                          },
                          refetchQueries: [INCOMES],
                        }).then((res) => {
                          setSelectedIncome(undefined);
                        });
                      }}
                    >
                      <Icon name="close" />
                      Remove Income
                    </Button>
                  </>
                )}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <ChartDiv>
          <h1 style={{ color: "black" }}>
            Your Incomes Visualised (All converted to {selectedFrequency}{" "}
            income)
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

export default Incomes;
