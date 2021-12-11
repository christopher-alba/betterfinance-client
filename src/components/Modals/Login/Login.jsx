import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../../graphql/mutations";

import { Button, Modal } from "semantic-ui-react";

import { ModalDiv } from "./styled";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(undefined);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [login, { loading }] = useMutation(LOGIN);

  return (
    <>
      <Button inverted basic onClick={handleOpen}>
        Login
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
                  window.location.reload();
                })
                .catch((err) => {
                  setLoginError(err.message.toString());
                });
            }}
          >
            Login
          </Button>
          {loginError && <p>Login Error: {loginError}</p>}
          {loading && <p>Logging In ...</p>}
        </ModalDiv>
      </Modal>
    </>
  );
};

export default Login;
