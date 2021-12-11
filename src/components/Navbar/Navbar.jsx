import React from "react";
import { Button, Dropdown, Icon, Loader, Segment } from "semantic-ui-react";
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
  NavbarAuth,
  AuthButtons,
} from "./styled";
import { Container } from "../Container";
import Register from "../Modals/Register/Register";

const options = [
  { icon: "user", text: "Profile" },
  { icon: "settings", text: "Settings" },
  {
    icon: "logout",
    text: "Logout",
    onClick: () => {
      window.localStorage.removeItem("authorization");
      window.location.reload();
    },
  },
];

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
            inverted
            basic
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
          {!loading ? (
            <AuthButtons>
              <Register />
              {data ? (
                <>
                  <Button.Group inverted basic style={{ border: "none" }}>
                    <Button inverted basic>
                      Logged in as {data.me.username}
                    </Button>
                    <Dropdown
                      className="button icon"
                      floating
                      options={options}
                      trigger={<></>}
                    />
                  </Button.Group>
                </>
              ) : (
                <Login />
              )}
            </AuthButtons>
          ) : (
            <NavbarAuth>
              <Segment basic style={{ width: "10%", marginBottom: 0 }}>
                <Loader inverted active={!loading} size="tiny"></Loader>
              </Segment>
              <div>Waiting for Server</div>
            </NavbarAuth>
          )}
        </NavbarRight>
      </Container>
    </NavbarWrapper>
  );
};

export default Navbar;
