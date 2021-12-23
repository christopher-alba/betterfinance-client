import React from "react";
import { Container } from "../../components/Container";
import {
  HeroDiv,
  BetterFinanceHeader,
  BetterMoneyHeader,
  BetterFutureHeader,
  BetterLifeHeader,
  Logo,
} from "./styled";

const Home = () => {
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
        <BetterFinanceHeader>Better Finance</BetterFinanceHeader>
      </Container>
    </HeroDiv>
  );
};

export default Home;
