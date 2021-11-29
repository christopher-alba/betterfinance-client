import React from "react";
import { Button } from "semantic-ui-react";
import Login from "../Modals/Login/Login";

const Navbar = ({ themes, setTheme, currentTheme }) => {
  return (
    <div>
      <h1>BETTER FINANCE</h1>
      <Login />
      <Button
        onClick={() => {
          currentTheme.name === "light"
            ? setTheme(themes.dark)
            : setTheme(themes.light);
        }}
      >
        {currentTheme.name === "light" ? "Dark" : "Light"}
      </Button>
    </div>
  );
};

export default Navbar;
