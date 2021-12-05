import React from "react";
import { Button, Icon } from "semantic-ui-react";
import Login from "../Modals/Login/Login";
import { useQuery } from "@apollo/client";
import { AUTHENTICATE } from "../../graphql/queries";
import {
  NavbarBrandFinance,
  NavbarBrandBetter,
  NavbarWrapper,
  NavbarBrandLogo,
  NavbarBrandWrapper,
  NavbarLeft,
  NavbarRight,
} from "./styled";
import { Container } from "../Container";
import Register from "../Modals/Register/Register";

const Navbar = ({ themes, setTheme, currentTheme }) => {
  const { data, loading } = useQuery(AUTHENTICATE);
  return (
    <NavbarWrapper>
      <Container flex justifyContent="space-between" alignItems="center">
        <NavbarLeft>
          <NavbarBrandWrapper>
            <NavbarBrandLogo />
            <NavbarBrandBetter>BETTER</NavbarBrandBetter>
            <NavbarBrandFinance>FINANCE</NavbarBrandFinance>
          </NavbarBrandWrapper>
        </NavbarLeft>
        <NavbarRight>
          <Button
            icon
            labelPosition="left"
            onClick={() => {
              currentTheme.name === "light"
                ? setTheme(themes.dark)
                : setTheme(themes.light);
            }}
          >
            {currentTheme.name === "light" ? (
              <Icon name="moon" />
            ) : (
              <Icon name="sun" />
            )}
            {currentTheme.name === "light" ? "Dark" : "Light"}
          </Button>
          {!loading ? <Register /> : ""}
          {data ? (
            <Button
              onClick={() => {
                window.localStorage.removeItem("authorization");
                window.location.reload();
              }}
            >
              Logout
            </Button>
          ) : !loading ? (
            <Login />
          ) : (
            "Authenticating..."
          )}
        </NavbarRight>
      </Container>
    </NavbarWrapper>
  );
};

export default Navbar;
