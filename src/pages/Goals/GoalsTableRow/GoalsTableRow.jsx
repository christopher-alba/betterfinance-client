import React from "react";
import { useMutation } from "@apollo/client";
import { Checkbox, Table } from "semantic-ui-react";
import { formatDateString, formatMoneyString } from "../../../helpers";
import {
  calculateCompletionDate,
  calculateContributionAmount,
} from "../../../helpers/goals";
import { UPDATEGOAL } from "../../../graphql/mutations";
import { GOALS } from "../../../graphql/queries";

const GoalsTableRow = ({ goal, selectedGoal, setSelectedGoal }) => {
  const [updateGoal, { loading: updating }] = useMutation(UPDATEGOAL, GOALS);
  return (
    <Table.Row
      key={goal._id}
      active={goal._id === selectedGoal?._id}
      onClick={() => setSelectedGoal(goal)}
    >
      <Table.Cell collapsing>
        <Checkbox
          toggle
          checked={goal.active}
          disabled={updating}
          onClick={() => {
            updateGoal({
              variables: {
                goalObj: {
                  active: !goal.active,
                },
                goalID: goal._id,
              },
              refetchQueries: [GOALS],
            });
          }}
        />
      </Table.Cell>
      <Table.Cell>{goal.name}</Table.Cell>
      <Table.Cell>{formatMoneyString(goal.targetAmount.toFixed(2))}</Table.Cell>
      <Table.Cell>
        {formatMoneyString(goal.currentAmount.toFixed(2))}
      </Table.Cell>
      <Table.Cell>
        {formatMoneyString(goal.contributionAmount.toFixed(2))}
      </Table.Cell>
      <Table.Cell>{goal.contributionFrequency}</Table.Cell>
      <Table.Cell>{formatDateString(goal.completionDate)}</Table.Cell>
      <Table.Cell>
        {calculateContributionAmount(
          goal.currentAmount,
          goal.targetAmount,
          goal.completionDate
        )}
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
};

export default GoalsTableRow;
