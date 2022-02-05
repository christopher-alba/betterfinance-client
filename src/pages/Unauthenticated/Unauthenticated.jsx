import React from "react";
import Login from "../../components/Modals/Login/Login";
import Register from "../../components/Modals/Register/Register";
import { MainDiv } from "./styled";

const Unauthenticated = () => {
  const page = localStorage.getItem("page");
  return (
    <MainDiv>
      <h1>
        You cannot access the {page} page because you are unauthenticated.
        Please login or register.
      </h1>
      <div>
        <Login />
        <Register />
      </div>
    </MainDiv>
  );
};

export default Unauthenticated;
