import { useMutation } from "@apollo/client";
import React from "react";
import { Checkbox, Table } from "semantic-ui-react";
import { UPDATEEXPENSE } from "../../../graphql/mutations";
import { EXPENSES } from "../../../graphql/queries";
import { formatMoneyString } from "../../../helpers";

const ExpenseTableRow = ({
  userExpense,
  selectedExpense,
  setSelectedExpense,
}) => {
  const [updateExpense, { loading: updatingExpense }] =
    useMutation(UPDATEEXPENSE);
  return (
    <Table.Row
      active={userExpense._id === selectedExpense}
      onClick={() => setSelectedExpense(userExpense)}
    >
      <Table.Cell collapsing>
        <Checkbox
          toggle
          disabled={updatingExpense}
          checked={userExpense.active}
          onClick={(evt, data) => {
            updateExpense({
              variables: {
                expenseObj: {
                  active: data.checked,
                },
                expenseID: userExpense._id,
              },
              refetchQueries: [EXPENSES],
            });
          }}
        />
      </Table.Cell>
      <Table.Cell>{userExpense.name}</Table.Cell>
      <Table.Cell>
        {formatMoneyString(userExpense.amount.toFixed(2))}
      </Table.Cell>
      <Table.Cell>{userExpense.frequency}</Table.Cell>
    </Table.Row>
  );
};

export default ExpenseTableRow;
