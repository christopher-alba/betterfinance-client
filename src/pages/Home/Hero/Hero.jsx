import React, { useContext } from "react";
import { Container } from "../../../components/Container";
import {
  HeroDiv,
  BetterFinanceHeader,
  BetterMoneyHeader,
  BetterFutureHeader,
  BetterLifeHeader,
  Logo,
  HeroText,
} from "./styled";
import { ThemeContext } from "styled-components";

const Hero = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <HeroDiv>
      <Container
        flex
        column
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <Logo />
        <BetterLifeHeader>Better Life</BetterLifeHeader>
        <BetterFutureHeader>Better Future</BetterFutureHeader>
        <BetterMoneyHeader>Better Money</BetterMoneyHeader>
        <BetterFinanceHeader>
          Better{" "}
          <span style={{ color: themeContext.colors.brightGreen }}>
            Finance
          </span>
        </BetterFinanceHeader>
        <hr style={{ border: "1px solid white", width: "50%", margin: 30 }} />
        <HeroText>
          Helping you manage your finances is our top priority
        </HeroText>
      </Container>
    </HeroDiv>
  );
};

export default Hero;
