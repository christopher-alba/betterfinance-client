import React, { useState } from "react";
import { Button, Dropdown, Icon, Loader} from "semantic-ui-react";
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
  WaitingDiv,
  AuthButtons,
  NavbarMenu,
  WaitingDivText,
  LoadingWrapper,
} from "./styled";
import { Container } from "../Container";
import Register from "../Modals/Register/Register";
import useWindowWidth from "../../hooks/useWindowWidth";

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
  const [menu, setMenu] = useState(false);
  let windowWidth = useWindowWidth();

  if (windowWidth > 1000) {
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
              labelPosition="right"
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
                    <Button.Group
                      inverted
                      basic
                      style={{ border: "none", width: 200 }}
                    >
                      <Dropdown
                        className="button icon"
                        floating
                        options={options}
                        text={`Logged in as ${data.me.username}`}
                        fluid
                      />
                    </Button.Group>
                  </>
                ) : (
                  <Login />
                )}
              </AuthButtons>
            ) : (
              <WaitingDiv>
                <WaitingDivText>Waiting for Server</WaitingDivText>
                <LoadingWrapper>
                  <Loader inverted active={!loading} size="tiny"></Loader>
                </LoadingWrapper>
              </WaitingDiv>
            )}
          </NavbarRight>
        </Container>
      </NavbarWrapper>
    );
  } else {
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
              style={{ marginRight: 0 }}
              onClick={() => {
                setMenu(!menu);
              }}
            >
              <Icon name="bars" />
            </Button>
          </NavbarRight>
        </Container>
        {menu && (
          <NavbarMenu>
            <Container flex column>
              <Button
                icon
                inverted
                basic
                labelPosition="right"
                onClick={() => {
                  currentTheme.name === "light"
                    ? setTheme(themes.dark)
                    : setTheme(themes.light);
                }}
                style={{ marginRight: 0, marginTop: 10 }}
              >
                {currentTheme.name === "light" ? (
                  <Icon name="moon" />
                ) : (
                  <Icon name="sun" />
                )}
                {currentTheme.name === "light" ? "Dark" : "Light"}
              </Button>
              {!loading ? (
                <>
                  <Register />
                  {data ? (
                    <>
                      <Button.Group
                        inverted
                        basic
                        style={{
                          border: "none",
                          marginTop: 10,
                        }}
                      >
                        <Dropdown
                          className="button icon"
                          floating
                          options={options}
                          text={`Logged in as ${data.me.username}`}
                          fluid
                        />
                      </Button.Group>
                    </>
                  ) : (
                    <Login />
                  )}
                </>
              ) : (
                <WaitingDiv style={{ marginTop: 10 }}>
                  <WaitingDivText>Waiting for Server</WaitingDivText>
                  <LoadingWrapper>
                    <Loader inverted active={!loading} size="tiny"></Loader>
                  </LoadingWrapper>
                </WaitingDiv>
              )}
            </Container>
          </NavbarMenu>
        )}
      </NavbarWrapper>
    );
  }
};

export default Navbar;
