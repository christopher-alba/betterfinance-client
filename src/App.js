import logo from "./logo.svg";
import "./App.css";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      token
    }
  }
`;

const AUTHENTICATE = gql`
  query Authenticate {
    me {
      username
      token
    }
  }
`;

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(undefined);
  const [login, { data, loading }] = useMutation(LOGIN);
  const { data: AuthData, loading: AuthLoading } = useQuery(AUTHENTICATE);

  if (loading || AuthLoading) {
    return "loading...";
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
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
      <button
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
              setLoginError(err.toString());
            });
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          localStorage.removeItem("authorization");
          window.location.reload();
        }}
      >
        Logout
      </button>
      <p>Token: {data && JSON.stringify(data)}</p>
      <p>Login Error: {loginError}</p>
      <p>Logged In: {AuthData && JSON.stringify(AuthData)} </p>
    </div>
  );
}

export default App;
