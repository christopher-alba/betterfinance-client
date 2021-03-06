import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Icon, Modal } from "semantic-ui-react";
import { REGISTER } from "../../../graphql/mutations";
import useWindowWidth from "../../../hooks/useWindowWidth";
import { ModalDiv } from "./styled";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [registerError, setRegisterError] = useState(undefined);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [register, { loading }] = useMutation(REGISTER);
  let windowWidth = useWindowWidth();
  return (
    <>
      <Button
        inverted
        basic
        icon
        labelPosition="right"
        onClick={handleOpen}
        style={{ marginRight: windowWidth <= 1050 ? 0 : "3.5px" , marginTop: windowWidth <= 1050 ? 10 : 0 }}
      >
        <Icon name="signup" />
        Register
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalDiv>
          <input
            type="text"
            placeholder="username"
            onChange={(evt) => {
              setUsername(evt.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(evt) => {
              setPassword(evt.target.value);
            }}
          />
          <input
            type="email"
            placeholder="email"
            onChange={(evt) => {
              setEmail(evt.target.value);
            }}
          />
          <Button
            onClick={() => {
              register({
                variables: {
                  username,
                  password,
                  email,
                },
              })
                .then((res) => {
                  localStorage.setItem(
                    "authorization",
                    res.data.register.token
                  );
                  window.location.reload();
                })
                .catch((err) => {
                  setRegisterError(err.message.toString());
                });
            }}
          >
            Login
          </Button>
          {registerError && <p>register Error: {registerError}</p>}
          {loading && <p>Logging In ...</p>}
        </ModalDiv>
      </Modal>
    </>
  );
};

export default Register;
