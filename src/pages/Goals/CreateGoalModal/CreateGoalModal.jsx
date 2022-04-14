import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import {
  Button,
  Form,
  Icon,
  Input,
  Label,
  Message,
  Modal,
  Select,
} from "semantic-ui-react";
import { CREATEGOAL } from "../../../graphql/mutations";
import { GOALS } from "../../../graphql/queries";
import { MainDiv } from "./styled";

const frequencyOptions = [
  { key: "Daily", value: "Daily", text: "Daily" },
  { key: "Weekly", value: "Weekly", text: "Weekly" },
  { key: "Monthly", value: "Monthly", text: "Monthly" },
  { key: "Yearly", value: "Yearly", text: "Yearly" },
];

const CreateGoalModal = ({ profileID }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(undefined);
  const [nameMaxLengthReached, setNameMaxLengthReached] = useState(false);
  const [targetAmount, setTargetAmount] = useState(undefined);
  const [currentAmount, setCurrentAmount] = useState(undefined);
  const [contributionAmount, setContributionAmount] = useState(undefined);
  const [contributionFrequency, setContributionFrequency] = useState(undefined);
  const [targetCompletionDate, setTargetCompletionDate] = useState(undefined);

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

  const [createGoal, { loading }] = useMutation(CREATEGOAL);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setDisplayErrorMessage(false);
    setName(undefined);
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
      <Button
        floated="right"
        icon
        labelPosition="left"
        color="green"
        size="small"
        onClick={handleOpen}
      >
        <Icon name="plus" /> Add Goal
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Modal.Header>Add an Expense</Modal.Header>
        <Modal.Content>
          <MainDiv>
            <Form>
              <Form.Field>
                <Input
                  placeholder="name"
                  maxLength="30"
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
              createGoal({
                variables: {
                  goal: {
                    name,
                    targetAmount: parseFloat(targetAmount),
                    currentAmount: parseFloat(currentAmount),
                    contributionAmount: parseFloat(contributionAmount),
                    contributionFrequency,
                    completionDate: targetCompletionDate,
                    profileID,
                  },
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
                  if (!currentAmount) {
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
            Add Expense
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default CreateGoalModal;
