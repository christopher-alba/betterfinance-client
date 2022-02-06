import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import { ThemeContext } from "styled-components";
import Loading from "../../components/Loading";
import { Container } from "../../components/Container";
import { Title } from "../../components/Title";
import { INCOMES } from "../../graphql/queries";
import { MainDiv } from "./styled";
import { Button, Checkbox, Icon, Table } from "semantic-ui-react";
import { DELETEINCOME, UPDATEINCOME } from "../../graphql/mutations";
import CreateIncomeModal from "./CreateIncomeModal";
import IncomeTableRow from "./IncomeTableRow";

const Incomes = () => {
  const themeContext = useContext(ThemeContext);
  const [selectedIncome, setSelectedIncome] = useState(undefined);
  const profileID = localStorage.getItem("profileID");
  const { loading, data } = useQuery(INCOMES, {
    variables: {
      profileID,
    },
  });
  const [deleteIncome, { loading: deletingIncome }] = useMutation(DELETEINCOME);
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
                  selectedIncome={selectedIncome}
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
                    <Button icon size="small" color="blue" labelPosition="left">
                      <Icon name="upload" /> Update Income
                    </Button>
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
                            incomeID: selectedIncome,
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
      </Container>
    </MainDiv>
  );
};

export default Incomes;
