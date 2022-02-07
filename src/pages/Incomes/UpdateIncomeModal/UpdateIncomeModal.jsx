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
import { UPDATEINCOME } from "../../../graphql/mutations";
import { INCOMES } from "../../../graphql/queries";
import { MainDiv } from "./styled";

const frequencyOptions = [
  { key: "Daily", value: "Daily", text: "Daily" },
  { key: "Weekly", value: "Weekly", text: "Weekly" },
  { key: "Monthly", value: "Monthly", text: "Monthly" },
  { key: "Yearly", value: "Yearly", text: "Yearly" },
];

const UpdateIncomeModal = ({ income }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(income.name);
  const [nameMaxLengthReached, setNameMaxLengthReached] = useState(false);
  const [amount, setAmount] = useState(income.amount);
  const [frequency, setFrequency] = useState(income.frequency);
  const [nameError, setNameError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [frequencyError, setFrequencyError] = useState(false);
  const [amountInvalid, setAmountInvalid] = useState(false);
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

  const [updateIncome, { loading }] = useMutation(UPDATEINCOME);

  const handleOpen = () => {
    setName(income.name);
    setAmount(income.amount);
    setFrequency(income.frequency);
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
        <Icon name="upload" /> Update Income
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Modal.Header>Update an Income</Modal.Header>
        <Modal.Content>
          <MainDiv>
            <Form>
              <Form.Field>
                <Input
                  placeholder="name"
                  maxLength="30"
                  defaultValue={income.name}
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
                  defaultValue={income.amount}
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
                  defaultValue={income.frequency}
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
                  There was an error updating an income. We apologize for any
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
              updateIncome({
                variables: {
                  incomeObj: {
                    name,
                    amount: parseFloat(amount),
                    frequency,
                  },
                  incomeID: income._id,
                },
                refetchQueries: [INCOMES],
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
            Update Income
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default UpdateIncomeModal;
