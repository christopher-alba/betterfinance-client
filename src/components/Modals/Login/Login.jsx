import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../../graphql/mutations";

import { Button, Icon, Input, Message, Modal } from "semantic-ui-react";

import { ModalDiv, LoginButton } from "./styled";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(undefined);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [login, { loading }] = useMutation(LOGIN);
  const navigate = useNavigate();
  return (
    <>
      <LoginButton
        icon
        inverted
        basic
        onClick={handleOpen}
        labelPosition="right"
      >
        Login
        <Icon name="sign in" />
      </LoginButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Modal.Header>Login</Modal.Header>
        <Modal.Content>
          <ModalDiv>
            <Input
              type="text"
              placeholder="username"
              onChange={(evt) => {
                setUsername(evt.target.value);
              }}
            />
            <br />
            <Input
              type="password"
              placeholder="password"
              onChange={(evt) => {
                setPassword(evt.target.value);
              }}
            />

            {loginError && <Message color="red">
              <Message.Header>Login Error</Message.Header>
              <p>{loginError}</p>
            </Message>}
            {loading && <Message color="green">
              <Message.Header>Credentials Found</Message.Header>
              <p>Logging In ...</p>
            </Message>}
          </ModalDiv>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => {
              login({
                variables: {
                  username,
                  password,
                },
              })
                .then((res) => {
                  localStorage.setItem("authorization", res.data.login.token);
                  navigate("/");
                  window.location.reload();
                })
                .catch((err) => {
                  setLoginError(err.message.toString());
                });
            }}
            disabled={loading}
          >
            Login
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default Login;
