import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, Icon, Loader } from "semantic-ui-react";
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
  HomeHeading,
  ToolsTrigger,
  ToggleNav,
} from "./styled";
import { Container } from "../Container";
import Register from "../Modals/Register/Register";
import useWindowWidth from "../../hooks/useWindowWidth";
import { Link } from "react-router-dom";

const Navbar = ({ themes, setTheme, currentTheme }) => {
  const { data, loading } = useQuery(AUTHENTICATE);
  const [menu, setMenu] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  let windowWidth = useWindowWidth();

  const navigate = useNavigate();
  const options = [
    {
      icon: "user",
      text: "Profile",
      onClick: () => {
        navigate("/profile");
      },
    },
    {
      icon: "logout",
      text: "Logout",
      onClick: () => {
        window.localStorage.removeItem("authorization");
        window.location.reload();
      },
    },
  ];
  const toolsOptions = [
    {
      icon: "angle double up",
      text: "Incomes Manager",
      onClick: () => {
        navigate("/incomes");
      },
    },
    {
      icon: "angle double down",
      text: "Expenses Manager",
      onClick: () => {
        navigate("/expenses");
      },
    },
    {
      icon: "dollar",
      text: "Goals Manager",
      onClick: () => {
        navigate("/goals");
      },
    },
  ];
  // new useEffect:
  useEffect(() => {
    // new function:
    const handleScroll = () => {
      if (navVisible) {
        setNavVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navVisible]);

  if (windowWidth > 1050) {
    return (
      <>
        <ToggleNav
          as="h4"
          style={{ position: "fixed", top: 0, opacity: navVisible ? 0 : 1 }}
          onMouseOver={() => {
            setNavVisible(true);
          }}
        >
          <Icon name="chevron down" />
        </ToggleNav>

        <NavbarWrapper
          style={{ opacity: navVisible ? 1 : 0, zIndex: navVisible ? 999 : 0 }}
        >
          <Container flex justifyContent="space-between" alignItems="center">
            <NavbarLeft>
              <NavbarBrandWrapper>
                <NavbarBrandLogo />
                <NavbarBrandBetter>BETTER</NavbarBrandBetter>
                <NavbarBrandFinance>FINANCE</NavbarBrandFinance>
              </NavbarBrandWrapper>
              <Link to="/" style={{ marginRight: 20 }}>
                <HomeHeading>Home</HomeHeading>
              </Link>
              {data && (
                <Dropdown
                  style={{
                    color: "white",
                    alignItems: "center",
                    display: "flex",
                  }}
                  trigger={<ToolsTrigger>Tools</ToolsTrigger>}
                  options={toolsOptions}
                />
              )}
            </NavbarLeft>
            <NavbarRight>
              <Button
                icon
                inverted
                basic
                labelPosition="right"
                onClick={() => {
                  if (currentTheme.name === "light") {
                    setTheme(themes.dark);
                    localStorage.setItem(
                      "theme.colour",
                      JSON.stringify(themes.dark)
                    );
                  } else {
                    setTheme(themes.light);
                    localStorage.setItem(
                      "theme.colour",
                      JSON.stringify(themes.light)
                    );
                  }
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
      </>
    );
  } else {
    return (
      <>
        <ToggleNav
          className="toggle-nav"
          as="h4"
          style={{ position: "fixed", top: 0, opacity: navVisible ? 0 : 1 }}
          onMouseOver={() => {
            setNavVisible(true);
          }}
        >
          <Icon name="chevron down" />
        </ToggleNav>
        <NavbarWrapper
          style={{ opacity: navVisible ? 1 : 0, zIndex: navVisible ? 999 : 0 }}
        >
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
                  if (!menu) {
                    document.getElementsByClassName(
                      "toggle-nav"
                    )[0].style.height = "420px";
                  } else {
                    document.getElementsByClassName(
                      "toggle-nav"
                    )[0].style.height = "100px";
                  }
                }}
              >
                <Icon name="bars" />
              </Button>
            </NavbarRight>
          </Container>
          {menu && (
            <NavbarMenu>
              <Container flex column>
                <Link to="/">
                  <Button
                    icon
                    inverted
                    basic
                    labelPosition="right"
                    style={{ width: "100%", marginTop: 50 }}
                  >
                    <Icon name="home" />
                    Home
                  </Button>
                </Link>
                {data && (
                  <Button.Group
                    inverted
                    basic
                    style={{
                      border: "none",
                      marginTop: 10,
                      marginBottom: 50,
                    }}
                  >
                    <Dropdown
                      className="button icon"
                      floating
                      options={toolsOptions}
                      text="Tools"
                      fluid
                      style={{
                        border: "none",
                      }}
                    />
                  </Button.Group>
                )}

                <Button
                  icon
                  inverted
                  basic
                  labelPosition="right"
                  onClick={() => {
                    if (currentTheme.name === "light") {
                      setTheme(themes.dark);
                      localStorage.setItem(
                        "theme.colour",
                        JSON.stringify(themes.dark)
                      );
                    } else {
                      setTheme(themes.light);
                      localStorage.setItem(
                        "theme.colour",
                        JSON.stringify(themes.light)
                      );
                    }
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
      </>
    );
  }
};

export default Navbar;
