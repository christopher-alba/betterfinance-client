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
import { CREATEEXPENSE } from "../../../graphql/mutations";
import { EXPENSES } from "../../../graphql/queries";
import { MainDiv } from "./styled";

const frequencyOptions = [
  { key: "Daily", value: "Daily", text: "Daily" },
  { key: "Weekly", value: "Weekly", text: "Weekly" },
  { key: "Monthly", value: "Monthly", text: "Monthly" },
  { key: "Yearly", value: "Yearly", text: "Yearly" },
];

const CreateExpenseModal = ({ profileID }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(undefined);
  const [nameMaxLengthReached, setNameMaxLengthReached] = useState(false);
  const [amount, setAmount] = useState(undefined);
  const [frequency, setFrequency] = useState(undefined);
  const [nameError, setNameError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [frequencyError, setFrequencyError] = useState(false);
  const [amountInvalid, setAmountInvalid] = useState(false);
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

  const [createExpense, { loading }] = useMutation(CREATEEXPENSE);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setDisplayErrorMessage(false);
    setName(undefined);
    setNameMaxLengthReached(false);
    setAmount(undefined);
    setFrequency(undefined);
    setNameError(false);
    setAmountError(false);
    setFrequencyError(false);
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
        <Icon name="plus" /> Add Expense
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
                  placeholder="amount ($)"
                  type="number"
                  min="0"
                  onChange={(evt, data) => {
                    console.log(data.value);
                    setAmount(data.value);
                    setAmountError(false);
                    if (
                      data.value.includes("-") ||
                      data.value.includes("e") ||
                      data.value.includes("+")
                    ) {
                      setAmountInvalid(true);
                    } else {
                      setAmountInvalid(false);
                    }
                  }}
                />
                {amountError && (
                  <Label basic color="red" pointing>
                    Please enter a valid value
                  </Label>
                )}
                {amountInvalid && (
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
                    setFrequency(data.value);
                    setFrequencyError(false);
                  }}
                />
                {frequencyError && (
                  <Label basic color="red" pointing>
                    Please enter a valid value
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
              createExpense({
                variables: {
                  expense: {
                    name,
                    amount: parseFloat(amount),
                    frequency,
                    profileID,
                  },
                },
                refetchQueries: [EXPENSES],
              })
                .then((res) => {
                  handleClose();
                })
                .catch((err) => {
                  if (!name) {
                    setNameError(true);
                  }
                  if (!amount) {
                    setAmountError(true);
                  }
                  if (!frequency) {
                    setFrequencyError(true);
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

export default CreateExpenseModal;
