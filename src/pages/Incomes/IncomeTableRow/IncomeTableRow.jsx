import { useMutation } from "@apollo/client";
import React from "react";
import { Checkbox, Table } from "semantic-ui-react";
import { UPDATEINCOME } from "../../../graphql/mutations";
import { INCOMES } from "../../../graphql/queries";
import { formatMoneyString } from "../../../helpers";

const IncomeTableRow = ({ userIncome, selectedIncome, setSelectedIncome }) => {
  const [updateIncome, { loading: updatingIncome }] = useMutation(UPDATEINCOME);
  return (
    <Table.Row
      active={userIncome._id === selectedIncome}
      onClick={() => setSelectedIncome(userIncome)}
    >
      <Table.Cell collapsing>
        <Checkbox
          toggle
          disabled={updatingIncome}
          checked={userIncome.active}
          onClick={(evt, data) => {
            updateIncome({
              variables: {
                incomeObj: {
                  active: data.checked,
                },
                incomeID: userIncome._id,
              },
              refetchQueries: [INCOMES],
            });
          }}
        />
      </Table.Cell>
      <Table.Cell>{userIncome.name}</Table.Cell>
      <Table.Cell>{formatMoneyString(userIncome.amount.toFixed(2))}</Table.Cell>
      <Table.Cell>{userIncome.frequency}</Table.Cell>
    </Table.Row>
  );
};

export default IncomeTableRow;
