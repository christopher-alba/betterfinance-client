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
import { UPDATEEXPENSE } from "../../../graphql/mutations";
import { EXPENSES } from "../../../graphql/queries";
import { MainDiv } from "./styled";

const frequencyOptions = [
  { key: "Daily", value: "Daily", text: "Daily" },
  { key: "Weekly", value: "Weekly", text: "Weekly" },
  { key: "Monthly", value: "Monthly", text: "Monthly" },
  { key: "Yearly", value: "Yearly", text: "Yearly" },
];

const UpdateExpenseModal = ({ expense }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(expense.name);
  const [nameMaxLengthReached, setNameMaxLengthReached] = useState(false);
  const [amount, setAmount] = useState(expense.amount);
  const [frequency, setFrequency] = useState(expense.frequency);
  const [nameError, setNameError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [frequencyError, setFrequencyError] = useState(false);
  const [amountInvalid, setAmountInvalid] = useState(false);
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

  const [updateExpense, { loading }] = useMutation(UPDATEEXPENSE);

  const handleOpen = () => {
    setName(expense.name);
    setAmount(expense.amount);
    setFrequency(expense.frequency);
    setOpen(true);
  };
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
        icon
        labelPosition="left"
        color="blue"
        size="small"
        onClick={handleOpen}
      >
        <Icon name="upload" /> Update Expense
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Modal.Header>Update an Expense</Modal.Header>
        <Modal.Content>
          <MainDiv>
            <Form>
              <Form.Field>
                <Input
                  placeholder="name"
                  maxLength="30"
                  defaultValue={expense.name}
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
                  defaultValue={expense.amount}
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
                  defaultValue={expense.frequency}
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
                  There was an error updating an expense. We apologize for any
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
              let hasErrors = false;
              if (!name) {
                hasErrors = true;
                setNameError(true);
              }
              if (!amount) {
                hasErrors = true;
                setAmountError(true);
              }
              if (!frequency) {
                hasErrors = true;
                setFrequencyError(true);
              }
              if (hasErrors) {
                return;
              }
              updateExpense({
                variables: {
                  expenseObj: {
                    name,
                    amount: parseFloat(amount),
                    frequency,
                  },
                  expenseID: expense._id,
                },
                refetchQueries: [EXPENSES],
              })
                .then((res) => {
                  handleClose();
                })
                .catch((err) => {
                  setDisplayErrorMessage(true);
                });
            }}
            disabled={loading}
            loading={loading}
          >
            Update Expense
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default UpdateExpenseModal;
