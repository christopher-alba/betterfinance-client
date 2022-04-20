import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Label,
  Message,
  Modal,
  Select,
} from "semantic-ui-react";
import { UPDATEGOAL } from "../../../graphql/mutations";
import { GOALS } from "../../../graphql/queries";
import { MainDiv } from "./styled";

const frequencyOptions = [
  { key: "Daily", value: "Daily", text: "Daily" },
  { key: "Weekly", value: "Weekly", text: "Weekly" },
  { key: "Monthly", value: "Monthly", text: "Monthly" },
  { key: "Yearly", value: "Yearly", text: "Yearly" },
];

const UpdateGoalModal = ({ goalObj }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(goalObj.name);
  const [nameMaxLengthReached, setNameMaxLengthReached] = useState(false);
  const [targetAmount, setTargetAmount] = useState(goalObj.targetAmount);
  const [currentAmount, setCurrentAmount] = useState(goalObj.currentAmount);
  const [contributionAmount, setContributionAmount] = useState(
    goalObj.contributionAmount
  );
  const [contributionFrequency, setContributionFrequency] = useState(
    goalObj.contributionFrequency
  );
  const [targetCompletionDate, setTargetCompletionDate] = useState(
    goalObj.completionDate
  );

  const [nameError, setNameError] = useState(false);
  const [targetAmountError, setTargetAmountError] = useState(false);
  const [currentAmountError, setCurrentAmountError] = useState(false);
  const [contributionAmountError, setContributionAmountError] = useState(false);
  const [contributionFrequencyError, setContributionFrequencyError] =
    useState(false);
  const [targetCompletionDateError, setTargetCompletionDateError] =
    useState(false);
  const [targetAmountInvalid, setTargetAmountInvalid] = useState(false);
  const [currentAmountInvalid, setCurrentAmountInvalid] = useState(false);
  const [contributionAmountInvalid, setContributionAmountInvalid] =
    useState(false);
  const [targetCompletionDateInvalid, setTargetCompletionDateInvalid] =
    useState(false);

  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

  const [updateGoal, { loading }] = useMutation(UPDATEGOAL);

  const handleOpen = () => {
    console.log(goalObj);
    setName(goalObj.name);
    setTargetAmount(goalObj.targetAmount);
    setCurrentAmount(goalObj.currentAmount);
    setContributionAmount(goalObj.contributionAmount);
    setContributionFrequency(goalObj.contributionFrequency);
    setTargetCompletionDate(goalObj.completionDate);
    setOpen(true);
  };
  const handleClose = () => {
    setDisplayErrorMessage(false);
    setNameMaxLengthReached(false);
    setNameError(false);
    setTargetAmountError(false);
    setCurrentAmountError(false);
    setContributionAmountError(false);
    setContributionFrequencyError(false);
    setTargetCompletionDateError(false);
    setTargetAmountInvalid(false);
    setCurrentAmountInvalid(false);
    setContributionAmountInvalid(false);
    setTargetCompletionDateInvalid(false);
    setOpen(false);
  };

  return (
    <>
      <Button color="blue" size="small" onClick={handleOpen}>
        Update Goal
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Modal.Header>Update a Goal</Modal.Header>
        <Modal.Content>
          <MainDiv>
            <Form>
              <Form.Field>
                <Input
                  placeholder="name"
                  maxLength="30"
                  defaultValue={goalObj.name}
                  onChange={(evt, data) => {
                    setName(data.value);
                    setNameError(false);
                    if (data.value.length >= 30) {
                      setNameMaxLengthReached(true);
                    } else {
                      setNameMaxLengthReached(false);
                    }
                  }}
                />
                {nameMaxLengthReached && (
                  <Label basic pointing>
                    You have reached the maximum length of 30 characters.
                  </Label>
                )}
                {nameError && (
                  <Label basic color="red" pointing>
                    Please enter a valid value
                  </Label>
                )}
              </Form.Field>
              <Form.Field>
                <Input
                  placeholder="target amount ($)"
                  type="number"
                  min="0"
                  defaultValue={goalObj.targetAmount}
                  onChange={(evt, data) => {
                    setTargetAmount(data.value);
                    setTargetAmountError(false);
                    if (
                      data.value.includes("-") ||
                      data.value.includes("e") ||
                      data.value.includes("+")
                    ) {
                      setTargetAmountInvalid(true);
                    } else {
                      setTargetAmountInvalid(false);
                    }
                  }}
                />
                {targetAmountError && (
                  <Label basic color="red" pointing>
                    Please enter a valid value
                  </Label>
                )}
                {targetAmountInvalid && (
                  <Label basic color="red" pointing>
                    Please enter a valid value. Your input cannot contain "+"
                    "-" or "e" characters.
                  </Label>
                )}
              </Form.Field>
              <Form.Field>
                <Input
                  placeholder="current amount ($)"
                  defaultValue={goalObj.currentAmount}
                  type="number"
                  min="0"
                  onChange={(evt, data) => {
                    setCurrentAmount(data.value);
                    setCurrentAmountError(false);
                    if (
                      data.value.includes("-") ||
                      data.value.includes("e") ||
                      data.value.includes("+")
                    ) {
                      setCurrentAmountInvalid(true);
                    } else {
                      setCurrentAmountInvalid(false);
                    }
                  }}
                />
                {currentAmountError && (
                  <Label basic color="red" pointing>
                    Please enter a valid value
                  </Label>
                )}
                {currentAmountInvalid && (
                  <Label basic color="red" pointing>
                    Please enter a valid value. Your input cannot contain "+"
                    "-" or "e" characters.
                  </Label>
                )}
              </Form.Field>
              <Form.Field>
                <Input
                  placeholder="contribution amount ($)"
                  type="number"
                  defaultValue={goalObj.contributionAmount}
                  min="0"
                  onChange={(evt, data) => {
                    setContributionAmount(data.value);
                    setContributionAmountError(false);
                    if (
                      data.value.includes("-") ||
                      data.value.includes("e") ||
                      data.value.includes("+")
                    ) {
                      setContributionAmountInvalid(true);
                    } else {
                      setContributionAmountInvalid(false);
                    }
                  }}
                />
                {contributionAmountError && (
                  <Label basic color="red" pointing>
                    Please enter a valid value
                  </Label>
                )}
                {contributionAmountInvalid && (
                  <Label basic color="red" pointing>
                    Please enter a valid value. Your input cannot contain "+"
                    "-" or "e" characters.
                  </Label>
                )}
              </Form.Field>
              <Form.Field>
                <Select
                  placeholder="frequency"
                  defaultValue={goalObj.contributionFrequency}
                  options={frequencyOptions}
                  onChange={(evt, data) => {
                    setContributionFrequency(data.value);
                    setContributionFrequencyError(false);
                  }}
                />
                {contributionFrequencyError && (
                  <Label basic color="red" pointing>
                    Please enter a valid value
                  </Label>
                )}
              </Form.Field>
              <Form.Field>
                <Input
                  type="date"
                  defaultValue={
                    new Date(parseInt(goalObj.completionDate))
                      .toISOString()
                      .split("T")[0]
                  }
                  min={
                    new Date(Date.now() + 1000 * 60 * 60 * 24 * 2)
                      .toISOString()
                      .split("T")[0]
                  }
                  onChange={(evt, data) => {
                    setTargetCompletionDateError(false);
                    setTargetCompletionDateInvalid(false);
                    setTargetCompletionDate(data.value);
                  }}
                />
                {targetCompletionDateError && (
                  <Label basic color="red" pointing>
                    Please enter a valid date
                  </Label>
                )}
                {targetCompletionDateInvalid && (
                  <Label basic color="red" pointing>
                    Please enter a valid date that is at least 2 days in the
                    future.
                  </Label>
                )}
              </Form.Field>
            </Form>

            {displayErrorMessage && (
              <Message color="red">
                <Message.Header>Error</Message.Header>
                <p>
                  There was an error adding an expense. We apologize for any
                  inconvenience.
                </p>
              </Message>
            )}
          </MainDiv>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              setDisplayErrorMessage(false);
              updateGoal({
                variables: {
                  goalObj: {
                    name,
                    targetAmount: parseFloat(targetAmount),
                    currentAmount: parseFloat(currentAmount),
                    contributionAmount: parseFloat(contributionAmount),
                    contributionFrequency,
                    completionDate: targetCompletionDate,
                  },
                  goalID: goalObj._id,
                },
                refetchQueries: [GOALS],
              })
                .then((res) => {
                  handleClose();
                })
                .catch((err) => {
                  if (!name) {
                    setNameError(true);
                  }
                  if (!targetAmount) {
                    setTargetAmountError(true);
                  }
                  if (currentAmount === undefined || currentAmount === null) {
                    setCurrentAmountError(true);
                  }
                  if (!contributionAmount) {
                    setContributionAmountError(true);
                  }
                  if (!targetCompletionDate) {
                    setTargetCompletionDateError(true);
                  }
                  if (
                    new Date(targetCompletionDate) <
                    new Date(Date.now() + 1000 * 60 * 60 * 24 * 2)
                  ) {
                    setTargetCompletionDateInvalid(true);
                  }
                  if (!contributionFrequency) {
                    setContributionFrequencyError(true);
                  }
                  setDisplayErrorMessage(true);
                });
            }}
            disabled={loading}
            loading={loading}
          >
            Update Goal
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default UpdateGoalModal;
