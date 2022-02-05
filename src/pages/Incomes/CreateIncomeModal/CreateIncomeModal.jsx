import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Icon, Input, Modal, Select } from "semantic-ui-react";
import { CREATEINCOME } from "../../../graphql/mutations";
import { INCOMES } from "../../../graphql/queries";
import { MainDiv } from "./styled";

const frequencyOptions = [
  { key: "Daily", value: "Daily", text: "Daily" },
  { key: "Weekly", value: "Weekly", text: "Weekly" },
  { key: "Monthly", value: "Monthly", text: "Monthly" },
  { key: "Yearly", value: "Yearly", text: "Yearly" },
];

const CreateIncomeModal = ({ profileID }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(undefined);
  const [amount, setAmount] = useState(undefined);
  const [frequency, setFrequency] = useState(undefined);

  const [createIncome, { loading }] = useMutation(CREATEINCOME);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setName(undefined);
    setAmount(undefined);
    setFrequency(undefined);
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
        <Icon name="plus" /> Add Income
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Modal.Header>Add an Income</Modal.Header>
        <Modal.Content>
          <MainDiv>
            <Input
              placeholder="name"
              onChange={(evt, data) => {
                setName(data.value);
              }}
            />
            <Input
              placeholder="amount"
              type="number"
              onChange={(evt, data) => {
                setAmount(data.value);
              }}
            />
            <Select
              placeholder="frequency"
              options={frequencyOptions}
              onChange={(evt, data) => {
                setFrequency(data.value);
              }}
            />
          </MainDiv>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              createIncome({
                variables: {
                  income: {
                    name,
                    amount: parseFloat(amount),
                    frequency,
                    profileID,
                  },
                },
                refetchQueries: [INCOMES],
              })
                .then((res) => {
                  handleClose();
                })
                .catch((err) => {
                  console.log(err.message);
                });
            }}
            disabled={loading}
            loading={loading}
          >
            Add Income
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default CreateIncomeModal;
